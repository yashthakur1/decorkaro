import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Sparkles, Image as ImageIcon, Send } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

interface AIRoomPlannerModalProps {
	isOpen: boolean;
	onClose: () => void;
}

interface ContentPart {
	text?: string;
	inlineData?: {
		data: string;
		mimeType: string;
	};
	thoughtSignature?: string;
}

interface ConversationTurn {
	role: "user" | "model";
	parts: ContentPart[];
}

const AIRoomPlannerModal: React.FC<AIRoomPlannerModalProps> = ({ isOpen, onClose }) => {
	// State for file handling
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [originalImageData, setOriginalImageData] = useState<string | null>(null);

	// State for API and loading
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// API key from environment variable
	const apiKey = import.meta.env.VITE_GOOGLE_NANO_BANANA_KEY || "";

	// State for model selection
	const [selectedModel] = useState<string>("gemini-3-pro-image-preview");

	// State for image type selection
	const [imageType, setImageType] = useState<"floor-plan" | "room-photo">("floor-plan");

	// State for conversation and thought signatures
	const [conversationHistory, setConversationHistory] = useState<ConversationTurn[]>([]);
	const [thoughtSignatures, setThoughtSignatures] = useState<ContentPart[]>([]);
	const [currentEditPrompt, setCurrentEditPrompt] = useState<string>("");

	// State to track if initial analysis is done
	const [isAnalyzed, setIsAnalyzed] = useState<boolean>(false);
	const [currentImage, setCurrentImage] = useState<string | null>(null);

	// State for room/style buttons
	const [detectedRooms, setDetectedRooms] = useState<string[]>([]);
	const [availableStyles] = useState<string[]>([
		"Boho Style",
		"Modern Style",
		"Rustic Style",
		"Minimalist Style",
		"Industrial Style",
		"Scandinavian Style",
	]);

	// State for mobile tab view
	const [activeTab, setActiveTab] = useState<"controls" | "preview">("controls");

	// State for progress bar
	const [progress, setProgress] = useState(0);
	const [elapsedTime, setElapsedTime] = useState(0);
	const [loadingMessage, setLoadingMessage] = useState("");
	const progressIntervalRef = useRef<number | null>(null);
	const ESTIMATED_TIME = 40; // 40 seconds estimated time

	// Witty loading messages for floor plan
	const floorPlanMessages = [
		"Analysing your floor plan... 🔍",
		"Measuring every corner with AI precision... 📐",
		"Building walls & placing furniture... 🏠",
		"Adding designer magic to your space... ✨",
		"Final touches from our virtual designer... 🎨",
	];

	// Witty loading messages for room photo
	const roomPhotoMessages = [
		"Scanning your room dimensions... 📷",
		"Consulting our AI interior designer... 🤖",
		"Picking the perfect furniture & decor... 🛋️",
		"Adjusting lighting for that perfect vibe... 💡",
		"Polishing every pixel to perfection... ✨",
	];

	// Witty loading messages for edits
	const editMessages = [
		"Processing your creative vision... 🎯",
		"Reshuffling the furniture... 🔄",
		"Our AI designer is on it... 👨‍🎨",
		"Adding those finishing touches... ✨",
	];

	// Get current loading messages based on context
	const getLoadingMessages = () => {
		if (isAnalyzed) return editMessages;
		return imageType === "floor-plan" ? floorPlanMessages : roomPhotoMessages;
	};

	// Progress bar effect
	useEffect(() => {
		if (isLoading) {
			setProgress(0);
			setElapsedTime(0);
			const messages = getLoadingMessages();
			setLoadingMessage(messages[0]);

			let messageIndex = 0;
			const messageInterval = ESTIMATED_TIME / messages.length;

			progressIntervalRef.current = window.setInterval(() => {
				setElapsedTime((prev) => {
					const newTime = prev + 0.5;
					// Progress increases faster at start, slower near end (easing)
					const newProgress = Math.min(
						95,
						(newTime / ESTIMATED_TIME) * 100 * (1 - Math.exp(-newTime / 20)),
					);
					setProgress(newProgress);

					// Update message based on elapsed time
					const newMessageIndex = Math.min(
						Math.floor(newTime / messageInterval),
						messages.length - 1,
					);
					if (newMessageIndex !== messageIndex) {
						messageIndex = newMessageIndex;
						setLoadingMessage(messages[messageIndex]);
					}

					return newTime;
				});
			}, 500);
		} else {
			// When loading completes, jump to 100%
			if (progressIntervalRef.current) {
				clearInterval(progressIntervalRef.current);
				progressIntervalRef.current = null;
			}
			if (progress > 0) {
				setProgress(100);
				// Reset after a short delay
				setTimeout(() => {
					setProgress(0);
					setElapsedTime(0);
					setLoadingMessage("");
				}, 500);
			}
		}

		return () => {
			if (progressIntervalRef.current) {
				clearInterval(progressIntervalRef.current);
			}
		};
	}, [isLoading, isAnalyzed, imageType]);

	// Handle file selection
	const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result as string);
			};
			reader.readAsDataURL(file);

			// Convert to base64 for API usage
			const base64Reader = new FileReader();
			base64Reader.onloadend = () => {
				if (typeof base64Reader.result === "string") {
					const base64 = base64Reader.result.split(",")[1];
					setOriginalImageData(base64);
				}
			};
			base64Reader.readAsDataURL(file);

			// Reset state when new file is selected
			setConversationHistory([]);
			setThoughtSignatures([]);
			setIsAnalyzed(false);
			setCurrentImage(null);
			setError(null);
			setDetectedRooms([]);
		}
	};

	// Initial analysis of uploaded image
	const handleAnalyze = async () => {
		if (!originalImageData) return;

		setIsLoading(true);
		setError(null);

		if (!apiKey) {
			setError(
				"AI service is temporarily unavailable. Please try again later or contact support.",
			);
			setIsLoading(false);
			return;
		}

		try {
			// Initialize Google GenAI with v1alpha API for media_resolution support
			const ai = new GoogleGenAI({ apiKey: apiKey, apiVersion: "v1alpha" });

			// Create analysis prompt based on image type
			const analysisPrompt =
				imageType === "floor-plan"
					? `Visualise this floor plan into a real photographed version of the isometric view of 3d layout in 3/4 angle. After creating the visualization, list all the rooms you can identify in the floor plan (e.g., Kitchen, Living Room, Bedroom, Bathroom, Balcony, Dining Area, etc.). Format the room list as: "Rooms: Kitchen, Living Room, Bedroom"`
					: `Visualise this room into a premium and aesthetic interiors, photographed with DSLR. Create a stunning, high-quality interior design visualization.`;

			// Build the content array with image and text
			const contents: ConversationTurn[] = [
				{
					role: "user",
					parts: [
						{ text: analysisPrompt },
						{
							inlineData: {
								data: originalImageData,
								mimeType: selectedFile?.type || "image/jpeg",
							},
						},
					],
				},
			];

			// Call Gemini API with media_resolution
			const response = await ai.models.generateContent({
				model: selectedModel,
				contents: contents.map((turn) => ({
					role: turn.role,
					parts: turn.parts.map((part) => {
						if (part.inlineData) {
							return {
								inlineData: part.inlineData,
								mediaResolution: {
									level: "media_resolution_high",
								},
							};
						}
						return part;
					}),
				})),
			});

			console.log("Analysis Response:", JSON.stringify(response, null, 2));

			// Extract response parts and thought signatures
			const newThoughtSignatures: ContentPart[] = [];
			let analysisText = "";

			for (const candidate of response.candidates || []) {
				const parts = candidate.content?.parts || [];

				for (const part of parts) {
					// Capture ALL thought signatures from the response
					if (part.thoughtSignature) {
						newThoughtSignatures.push({
							thoughtSignature: part.thoughtSignature,
						});
					}

					// Process text content
					if (part.text) {
						analysisText += part.text;
					}
					// Process inline image data
					else if (part.inlineData) {
						const imageUrl = `data:image/png;base64,${part.inlineData.data}`;
						setCurrentImage(imageUrl);
					}
				}
			}

			// Extract room names for floor plans
			if (imageType === "floor-plan") {
				const roomsMatch = analysisText.match(/Rooms:\s*(.+?)(?:\n|$)/i);
				if (roomsMatch) {
					const rooms = roomsMatch[1]
						.split(",")
						.map((room) => room.trim())
						.filter(Boolean);
					setDetectedRooms(rooms);
				}
			}

			// Store thought signatures for next turn
			setThoughtSignatures(newThoughtSignatures);

			// Add to conversation history
			const userTurn: ConversationTurn = {
				role: "user",
				parts: [
					{ text: analysisPrompt },
					{
						inlineData: {
							data: originalImageData,
							mimeType: selectedFile?.type || "image/jpeg",
						},
					},
				],
			};

			const modelTurn: ConversationTurn = {
				role: "model",
				parts: response.candidates?.[0]?.content?.parts || [],
			};

			setConversationHistory([userTurn, modelTurn]);
			setIsAnalyzed(true);
			setActiveTab("preview"); // Switch to preview tab on mobile after analysis

			console.log("Analysis complete. Text:", analysisText);
			console.log("Thought signatures captured:", newThoughtSignatures.length);
		} catch (error) {
			console.error("Error analyzing image:", error);
			let errorMessage = "Failed to analyze image. Please try again.";

			if (error instanceof Error) {
				if (
					error.message.includes("429") ||
					error.message.includes("quota") ||
					error.message.includes("RESOURCE_EXHAUSTED")
				) {
					errorMessage = "Rate limit exceeded. Please wait a moment and try again.";
				} else if (
					error.message.includes("API_KEY") ||
					error.message.includes("invalid") ||
					error.message.includes("unauthorized")
				) {
					errorMessage = "🔑 Invalid API Key: Please check your Google Gemini API key.";
				} else {
					errorMessage = `❌ Error: ${error.message}`;
				}
			}

			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	// Handle editing requests with thought signatures
	const handleEdit = async () => {
		await handleEditWithPrompt(currentEditPrompt);
	};

	const handleReset = () => {
		setConversationHistory([]);
		setThoughtSignatures([]);
		setIsAnalyzed(false);
		setCurrentImage(null);
		setError(null);
		setSelectedFile(null);
		setPreview(null);
		setOriginalImageData(null);
		setCurrentEditPrompt("");
		setDetectedRooms([]);
		setActiveTab("controls");
	};

	// Handle room/style button clicks
	const handleQuickPrompt = async (prompt: string) => {
		setCurrentEditPrompt(prompt);
		// Trigger edit with the selected prompt
		await handleEditWithPrompt(prompt);
	};

	// Helper function to handle edit with a specific prompt
	const handleEditWithPrompt = async (prompt: string) => {
		if (!prompt.trim() || thoughtSignatures.length === 0) return;

		setIsLoading(true);
		setError(null);

		if (!apiKey) {
			setError(
				"AI service is temporarily unavailable. Please try again later or contact support.",
			);
			setIsLoading(false);
			return;
		}

		try {
			const ai = new GoogleGenAI({ apiKey: apiKey, apiVersion: "v1alpha" });

			// Build contents with conversation history (TEXT ONLY - no images to avoid thought_signature errors)
			const contents: any[] = conversationHistory.map((turn) => ({
				role: turn.role,
				parts: turn.parts
					.filter((part) => part.text || part.thoughtSignature) // Only include text and thought signatures, not images
					.map((part) => {
						// Preserve both text and thoughtSignature in the same part if they exist together
						const newPart: any = {};
						if (part.text !== undefined) {
							newPart.text = part.text;
						}
						if (part.thoughtSignature !== undefined) {
							newPart.thoughtSignature = part.thoughtSignature;
						}
						return newPart;
					})
					.filter(
						(part) => part.text !== undefined || part.thoughtSignature !== undefined,
					), // Remove parts with undefined values
			}));

			// Add thought signatures before the new user request
			const signaturesAndNewPrompt: any[] = thoughtSignatures.map((sig) => ({
				thoughtSignature: sig.thoughtSignature,
			}));
			signaturesAndNewPrompt.push({ text: prompt });

			contents.push({
				role: "user",
				parts: signaturesAndNewPrompt,
			});

			console.log("Editing with contents:", JSON.stringify(contents, null, 2));

			const response = await ai.models.generateContent({
				model: selectedModel,
				contents: contents,
			});

			console.log("Edit Response:", JSON.stringify(response, null, 2));

			// Extract new thought signatures and content
			const newThoughtSignatures: ContentPart[] = [];
			let responseText = "";

			for (const candidate of response.candidates || []) {
				const parts = candidate.content?.parts || [];

				for (const part of parts) {
					// Capture ALL thought signatures from the response
					if (part.thoughtSignature) {
						newThoughtSignatures.push({
							thoughtSignature: part.thoughtSignature,
						});
					}

					// Process text content
					if (part.text) {
						responseText += part.text;
					}
					// Process inline image data
					else if (part.inlineData) {
						const imageUrl = `data:image/png;base64,${part.inlineData.data}`;
						setCurrentImage(imageUrl);
					}
				}
			}

			// Update thought signatures for next turn
			setThoughtSignatures(newThoughtSignatures);

			// Add to conversation history
			const userTurn: ConversationTurn = {
				role: "user",
				parts: [{ text: prompt }],
			};

			const modelTurn: ConversationTurn = {
				role: "model",
				parts: response.candidates?.[0]?.content?.parts || [],
			};

			setConversationHistory([...conversationHistory, userTurn, modelTurn]);
			setCurrentEditPrompt("");
			setActiveTab("preview"); // Switch to preview tab on mobile after edit

			console.log("Edit complete. New signatures:", newThoughtSignatures.length);
		} catch (error) {
			console.error("Error editing image:", error);
			let errorMessage = "Failed to edit image. Please try again.";

			if (error instanceof Error) {
				if (
					error.message.includes("429") ||
					error.message.includes("quota") ||
					error.message.includes("RESOURCE_EXHAUSTED")
				) {
					errorMessage = "Rate limit exceeded. Please wait a moment and try again.";
				} else {
					errorMessage = `❌ Error: ${error.message}`;
				}
			}

			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	const handleClose = () => {
		handleReset();
		onClose();
	};

	if (!isOpen) return null;

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black bg-opacity-50"
					onClick={handleClose}
				>
					<motion.div
						initial={{ scale: 0.95, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.95, opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="bg-white rounded-xl md:rounded-2xl shadow-2xl w-full max-w-7xl h-[98vh] md:h-[90vh] flex flex-col overflow-hidden"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Header */}
						<div className="flex items-center justify-between px-3 md:px-6 py-3 md:py-4 border-b border-slate-200 bg-gradient-to-r from-yellow-50 to-slate-50">
							<div className="flex items-center gap-2 md:gap-3 min-w-0">
								<div className="flex items-center justify-center bg-yellow-100 rounded-full w-8 h-8 md:w-10 md:h-10 flex-shrink-0">
									<Sparkles className="text-yellow-500 w-4 h-4 md:w-6 md:h-6" />
								</div>
								<div className="min-w-0">
									<h2 className="font-title text-sm md:text-2xl font-bold text-slate-900 truncate">
										AI Room Planner
									</h2>
									<p className="text-xs md:text-sm text-slate-600 hidden sm:block">
										Visualize your space with AI-powered design
									</p>
								</div>
							</div>
							<button
								onClick={handleClose}
								className="p-1.5 md:p-2 hover:bg-slate-100 rounded-full transition-colors flex-shrink-0"
								aria-label="Close modal"
							>
								<X className="text-slate-600 w-5 h-5 md:w-6 md:h-6" />
							</button>
						</div>

						{/* Mobile Tab Switcher */}
						<div className="flex md:hidden border-b border-slate-200">
							<button
								onClick={() => setActiveTab("controls")}
								className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
									activeTab === "controls"
										? "text-yellow-600 border-b-2 border-yellow-500 bg-yellow-50"
										: "text-slate-600"
								}`}
							>
								Controls
							</button>
							<button
								onClick={() => setActiveTab("preview")}
								className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
									activeTab === "preview"
										? "text-yellow-600 border-b-2 border-yellow-500 bg-yellow-50"
										: "text-slate-600"
								}`}
							>
								Preview
							</button>
						</div>

						{/* Main Content - Split Layout */}
						<div className="flex flex-1 overflow-hidden">
							{/* Left Navigation/Controls Panel */}
							<div
								className={`${
									activeTab === "controls" ? "flex" : "hidden"
								} md:flex w-full md:w-96 border-r border-slate-200 bg-slate-50 p-4 md:p-6 overflow-y-auto flex-col`}
							>
								<div className="space-y-4 md:space-y-6">
									{/* Upload Section */}
									{!isAnalyzed && (
										<div>
											<h3 className="font-title text-base md:text-lg font-semibold text-slate-900 mb-2 md:mb-3 flex items-center gap-2">
												<Upload size={18} />
												Upload Image
											</h3>

											{/* Image Type Selection */}
											<div className="mb-3 md:mb-4 bg-white rounded-lg p-3 md:p-4 border border-slate-200">
												<label className="text-xs md:text-sm font-medium text-slate-700 mb-2 md:mb-3 block">
													Select Image Type:
												</label>
												<div className="space-y-2">
													<label className="flex items-center cursor-pointer group">
														<input
															type="radio"
															name="image-type"
															value="floor-plan"
															checked={imageType === "floor-plan"}
															onChange={(e) =>
																setImageType(e.target.value as "floor-plan")
															}
															className="w-4 h-4 text-yellow-500 focus:ring-yellow-500"
														/>
														<span className="ml-2 md:ml-3 text-xs md:text-sm text-slate-700 group-hover:text-slate-900">
															Floor Plan (2D drawing)
														</span>
													</label>
													<label className="flex items-center cursor-pointer group">
														<input
															type="radio"
															name="image-type"
															value="room-photo"
															checked={imageType === "room-photo"}
															onChange={(e) =>
																setImageType(e.target.value as "room-photo")
															}
															className="w-4 h-4 text-yellow-500 focus:ring-yellow-500"
														/>
														<span className="ml-2 md:ml-3 text-xs md:text-sm text-slate-700 group-hover:text-slate-900">
															Room Photo (empty room)
														</span>
													</label>
												</div>
											</div>

											<div
												className="border-2 border-dashed border-slate-300 rounded-lg p-4 md:p-6 text-center hover:border-yellow-500 transition-colors cursor-pointer bg-white"
												onClick={() =>
													document.getElementById("modal-room-photo")?.click()
												}
											>
												{preview ? (
													<div className="space-y-2">
														<img
															src={preview}
															alt="Room preview"
															className="w-full h-24 md:h-32 object-cover rounded-lg mx-auto"
														/>
														<p className="text-xs text-slate-600">
															Click to change image
														</p>
													</div>
												) : (
													<div className="flex flex-col items-center">
														<Upload className="text-slate-400 mb-2" size={28} />
														<p className="text-slate-700 text-xs md:text-sm font-medium">
															{imageType === "floor-plan"
																? "Upload floor plan"
																: "Upload room photo"}
														</p>
														<p className="text-slate-500 text-xs mt-1">
															JPG, PNG up to 5MB
														</p>
													</div>
												)}
											</div>
											<input
												type="file"
												id="modal-room-photo"
												className="hidden"
												accept="image/*"
												onChange={handleFileSelect}
											/>
										</div>
									)}

									{/* Editing Section - shown after analysis */}
									{isAnalyzed && (
										<div>
											<h3 className="font-title text-base md:text-lg font-semibold text-slate-900 mb-2 md:mb-3 flex items-center gap-2">
												<Sparkles size={18} />
												Edit Image
											</h3>

											{/* Quick Action Buttons - Room/Style Selection */}
											{imageType === "floor-plan" && detectedRooms.length > 0 && (
												<div className="mb-3 md:mb-4 bg-white rounded-lg p-3 md:p-4 border border-slate-200">
													<label className="text-xs md:text-sm font-medium text-slate-700 mb-2 md:mb-3 block">
														View Specific Room:
													</label>
													<div className="flex flex-wrap gap-1.5 md:gap-2">
														{detectedRooms.map((room, idx) => (
															<button
																key={idx}
																onClick={() =>
																	handleQuickPrompt(
																		`Show me a detailed view of the ${room}, photographed with DSLR quality`,
																	)
																}
																disabled={isLoading}
																className="px-2.5 md:px-4 py-1.5 md:py-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 text-xs md:text-sm font-medium rounded-lg transition-colors disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed"
															>
																{room}
															</button>
														))}
													</div>
												</div>
											)}

											{imageType === "room-photo" && (
												<div className="mb-3 md:mb-4 bg-white rounded-lg p-3 md:p-4 border border-slate-200">
													<label className="text-xs md:text-sm font-medium text-slate-700 mb-2 md:mb-3 block">
														Apply Interior Style:
													</label>
													<div className="flex flex-wrap gap-1.5 md:gap-2">
														{availableStyles.map((style, idx) => (
															<button
																key={idx}
																onClick={() =>
																	handleQuickPrompt(
																		`Transform this room into ${style.toLowerCase()}, maintaining the room layout and photographed with DSLR quality`,
																	)
																}
																disabled={isLoading}
																className="px-2.5 md:px-4 py-1.5 md:py-2 bg-purple-500 hover:bg-purple-600 text-white text-xs md:text-sm font-medium rounded-lg transition-colors disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed"
															>
																{style.replace(" Style", "")}
															</button>
														))}
													</div>
												</div>
											)}

											<div className="space-y-2 md:space-y-3">
												<textarea
													value={currentEditPrompt}
													onChange={(e) => setCurrentEditPrompt(e.target.value)}
													placeholder="Describe your custom edit..."
													className="w-full py-2 px-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white text-xs md:text-sm resize-none"
													rows={3}
												/>
												<button
													onClick={handleEdit}
													disabled={!currentEditPrompt.trim() || isLoading}
													className={`w-full py-2.5 md:py-3 px-4 md:px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm ${
														!currentEditPrompt.trim() || isLoading
															? "bg-slate-300 text-slate-500 cursor-not-allowed"
															: "bg-green-500 hover:bg-green-600 text-white"
													}`}
												>
													<Send size={16} />
													{isLoading ? "Processing..." : "Apply Edit"}
												</button>
											</div>
										</div>
									)}

									{/* Error Display */}
									{error && (
										<div className="bg-red-50 border border-red-200 rounded-lg p-3 md:p-4">
											<p className="text-red-700 text-xs md:text-sm whitespace-pre-line">
												{error}
											</p>
										</div>
									)}

									{/* Action Buttons */}
									<div className="space-y-2 md:space-y-3 pt-2 md:pt-4">
										{!isAnalyzed ? (
											<button
												onClick={handleAnalyze}
												disabled={!selectedFile || isLoading}
												className={`w-full py-2.5 md:py-3 px-4 md:px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm ${
													!selectedFile || isLoading
														? "bg-slate-300 text-slate-500 cursor-not-allowed"
														: "bg-yellow-500 hover:bg-yellow-600 text-slate-900"
												}`}
											>
												<Sparkles size={18} />
												{isLoading ? "Analyzing..." : "Generate Visualization"}
											</button>
										) : (
											<button
												onClick={handleReset}
												className="w-full py-2 md:py-2.5 px-4 md:px-6 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors text-xs md:text-sm font-medium"
											>
												Upload New Image
											</button>
										)}
									</div>

									{/* Conversation History */}
									{conversationHistory.length > 0 && (
										<div className="bg-white rounded-lg p-3 md:p-4 border border-slate-200">
											<h4 className="text-xs font-semibold text-slate-700 mb-2 md:mb-3">
												History:
											</h4>
											<div className="space-y-1.5 md:space-y-2 max-h-32 md:max-h-48 overflow-y-auto">
												{conversationHistory.map((turn, idx) => (
													<div
														key={idx}
														className={`text-xs ${
															turn.role === "user"
																? "text-slate-900 font-medium"
																: "text-slate-600"
														}`}
													>
														<span className="font-bold">
															{turn.role === "user" ? "👤" : "🤖"}
														</span>{" "}
														{turn.parts
															.map((part) => part.text)
															.filter(Boolean)
															.join(" ")
															.substring(0, 60)}
														{turn.parts
															.map((part) => part.text)
															.filter(Boolean)
															.join(" ").length > 60 && "..."}
													</div>
												))}
											</div>
										</div>
									)}
								</div>
							</div>

							{/* Right Visual Preview Panel */}
							<div
								className={`${
									activeTab === "preview" ? "flex" : "hidden"
								} md:flex flex-1 bg-white p-3 md:p-6 overflow-y-auto flex-col`}
							>
								<div className="h-full flex flex-col">
									<h3 className="font-title text-base md:text-lg font-semibold text-slate-900 mb-3 md:mb-4 flex items-center gap-2">
										<ImageIcon size={18} />
										{isAnalyzed ? "Result" : "Preview"}
									</h3>

									{!preview && !currentImage ? (
										<div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl min-h-[200px]">
											<div className="text-center text-slate-400 p-4">
												<ImageIcon
													size={48}
													className="mx-auto mb-2 md:mb-3 opacity-50"
												/>
												<p className="text-sm md:text-lg font-medium">
													No image uploaded
												</p>
												<p className="text-xs md:text-sm mt-1">
													Upload an image to get started
												</p>
											</div>
										</div>
									) : (
										<div className="flex-1 space-y-4 md:space-y-6">
											{/* Loading State */}
											{isLoading && (
												<div className="flex-1 flex items-center justify-center min-h-[300px] md:min-h-[400px] bg-slate-900 rounded-xl">
													<div className="flex flex-col items-center justify-center space-y-6 w-full px-8">
														{/* Animated Loader */}
														<div className="loader-wrapper">
															<span className="loader-letter">G</span>
															<span className="loader-letter">e</span>
															<span className="loader-letter">n</span>
															<span className="loader-letter">e</span>
															<span className="loader-letter">r</span>
															<span className="loader-letter">a</span>
															<span className="loader-letter">t</span>
															<span className="loader-letter">i</span>
															<span className="loader-letter">n</span>
															<span className="loader-letter">g</span>
															<div className="loader"></div>
														</div>
														<p className="text-slate-400 text-sm md:text-base font-secondary text-center">
															{loadingMessage || "Creating visualization..."}
														</p>

														{/* Progress Bar */}
														<div className="w-full max-w-xs">
															<div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
																<motion.div
																	className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-full"
																	initial={{ width: 0 }}
																	animate={{ width: `${progress}%` }}
																	transition={{ duration: 0.3, ease: "easeOut" }}
																/>
															</div>
															<div className="flex justify-between mt-2 text-xs text-slate-500">
																<span>{Math.round(progress)}%</span>
																<span>
																	~{Math.max(0, ESTIMATED_TIME - Math.round(elapsedTime))}
																	s remaining
																</span>
															</div>
														</div>
													</div>
												</div>
											)}

											{/* Uploaded Image Preview (before analysis) */}
											{preview && !isAnalyzed && !isLoading && (
												<div className="bg-slate-50 rounded-xl p-3 md:p-4 border border-slate-200">
													<h4 className="text-xs md:text-sm font-semibold text-slate-900 mb-2 md:mb-3">
														Uploaded Image:
													</h4>
													<img
														src={preview}
														alt="Uploaded preview"
														className="w-full h-auto object-contain rounded-lg max-h-[40vh] md:max-h-[60vh]"
													/>
												</div>
											)}

											{/* Current/Edited Image */}
											{currentImage && (
												<div className="bg-gradient-to-br from-green-50 to-slate-50 rounded-xl p-3 md:p-4 border-2 border-green-300">
													<h4 className="text-xs md:text-sm font-semibold text-slate-900 mb-2 md:mb-3 flex items-center gap-2">
														<Sparkles size={14} className="text-green-500" />
														{conversationHistory.length > 2
															? "Edited Image"
															: "Analyzed Image"}
													</h4>
													<img
														src={currentImage}
														alt="AI processed image"
														className="w-full h-auto object-contain rounded-lg max-h-[40vh] md:max-h-[60vh]"
													/>
												</div>
											)}

											{/* Analysis/Response Text */}
											{conversationHistory.length > 0 && (
												<div className="bg-white rounded-lg p-3 md:p-4 border border-slate-200">
													<p className="text-xs font-semibold text-slate-700 mb-1.5 md:mb-2">
														AI Response:
													</p>
													<p className="text-xs md:text-sm text-slate-600 whitespace-pre-line">
														{conversationHistory[conversationHistory.length - 1]?.parts
															.map((part) => part.text)
															.filter(Boolean)
															.join(" ")}
													</p>
												</div>
											)}
										</div>
									)}
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default AIRoomPlannerModal;
