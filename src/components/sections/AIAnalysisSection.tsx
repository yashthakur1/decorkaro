import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Sparkles, Key, Send } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface ContentPart {
  text?: string;
  inlineData?: {
    data: string;
    mimeType: string;
  };
  thoughtSignature?: string;
}

interface ConversationTurn {
  role: 'user' | 'model';
  parts: ContentPart[];
}

const AIAnalysisSection: React.FC = () => {
  // State for file handling
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [originalImageData, setOriginalImageData] = useState<string | null>(null);

  // State for API and loading
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for API key and prompt
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(false);

  // State for model selection
  const [selectedModel, setSelectedModel] = useState<string>('gemini-3-pro-image-preview');

  // State for image type selection
  const [imageType, setImageType] = useState<'floor-plan' | 'room-photo'>('floor-plan');

  // State for conversation and thought signatures
  const [conversationHistory, setConversationHistory] = useState<ConversationTurn[]>([]);
  const [thoughtSignatures, setThoughtSignatures] = useState<ContentPart[]>([]);
  const [currentEditPrompt, setCurrentEditPrompt] = useState<string>('');

  // State to track if initial analysis is done
  const [isAnalyzed, setIsAnalyzed] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  // State for room/style buttons
  const [detectedRooms, setDetectedRooms] = useState<string[]>([]);
  const [availableStyles, setAvailableStyles] = useState<string[]>([
    'Boho Style',
    'Modern Style',
    'Rustic Style',
    'Minimalist Style',
    'Industrial Style',
    'Scandinavian Style'
  ]);

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
        if (typeof base64Reader.result === 'string') {
          const base64 = base64Reader.result.split(',')[1];
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
      setShowApiKeyInput(false);
      setDetectedRooms([]);
    }
  };

  const handleShowApiKeyInput = () => {
    if (!selectedFile) return;
    setShowApiKeyInput(true);
  };

  // Initial analysis of uploaded image
  const handleAnalyze = async () => {
    if (!originalImageData || !apiKey) return;

    setIsLoading(true);
    setError(null);

    try {
      // Initialize Google GenAI with v1alpha API for media_resolution support
      const ai = new GoogleGenAI({ apiKey: apiKey, apiVersion: "v1alpha" });

      // Create analysis prompt based on image type
      const analysisPrompt = imageType === 'floor-plan'
        ? `Visualise this floor plan into a real photographed version of the isometric view of 3d layout. After creating the visualization, list all the rooms you can identify in the floor plan (e.g., Kitchen, Living Room, Bedroom, Bathroom, Balcony, Dining Area, etc.). Format the room list as: "Rooms: Kitchen, Living Room, Bedroom"`
        : `Visualise this room into a premium and aesthetic interiors, photographed with DSLR. Create a stunning, high-quality interior design visualization.`;

      // Build the content array with image and text
      const contents: ConversationTurn[] = [
        {
          role: 'user',
          parts: [
            { text: analysisPrompt },
            {
              inlineData: {
                data: originalImageData,
                mimeType: selectedFile?.type || 'image/jpeg'
              }
            }
          ]
        }
      ];

      // Call Gemini API with media_resolution
      const response = await ai.models.generateContent({
        model: selectedModel,
        contents: contents.map(turn => ({
          role: turn.role,
          parts: turn.parts.map(part => {
            if (part.inlineData) {
              return {
                inlineData: part.inlineData,
                mediaResolution: {
                  level: "media_resolution_high"
                }
              };
            }
            return part;
          })
        }))
      });

      console.log('Analysis Response:', JSON.stringify(response, null, 2));

      // Extract response parts and thought signatures
      const newThoughtSignatures: ContentPart[] = [];
      let analysisText = '';

      for (const candidate of response.candidates || []) {
        const parts = candidate.content?.parts || [];

        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];

          // First part after thoughts gets signature
          if (i === 0 || (parts[i-1] && 'thoughtSignature' in parts[i-1])) {
            if (part.thoughtSignature) {
              newThoughtSignatures.push({ thoughtSignature: part.thoughtSignature });
            }
          }

          if (part.text) {
            analysisText += part.text;
          } else if (part.inlineData) {
            const imageUrl = `data:image/png;base64,${part.inlineData.data}`;
            setCurrentImage(imageUrl);

            // Every inlineData part gets signature
            if (part.thoughtSignature) {
              newThoughtSignatures.push({ thoughtSignature: part.thoughtSignature });
            }
          }
        }
      }

      // Extract room names for floor plans
      if (imageType === 'floor-plan') {
        const roomsMatch = analysisText.match(/Rooms:\s*(.+?)(?:\n|$)/i);
        if (roomsMatch) {
          const rooms = roomsMatch[1].split(',').map(room => room.trim()).filter(Boolean);
          setDetectedRooms(rooms);
        }
      }

      // Store thought signatures for next turn
      setThoughtSignatures(newThoughtSignatures);

      // Add to conversation history
      const userTurn: ConversationTurn = {
        role: 'user',
        parts: [
          { text: analysisPrompt },
          {
            inlineData: {
              data: originalImageData,
              mimeType: selectedFile?.type || 'image/jpeg'
            }
          }
        ]
      };

      const modelTurn: ConversationTurn = {
        role: 'model',
        parts: response.candidates?.[0]?.content?.parts || []
      };

      setConversationHistory([userTurn, modelTurn]);
      setIsAnalyzed(true);

      console.log('Analysis complete. Text:', analysisText);
      console.log('Thought signatures captured:', newThoughtSignatures.length);
    } catch (error) {
      console.error('Error analyzing image:', error);
      let errorMessage = 'Failed to analyze image. Please try again.';

      if (error instanceof Error) {
        if (error.message.includes('429') || error.message.includes('quota') || error.message.includes('RESOURCE_EXHAUSTED')) {
          errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
        } else if (error.message.includes('API_KEY') || error.message.includes('invalid') || error.message.includes('unauthorized')) {
          errorMessage = '🔑 Invalid API Key: Please check your Google Gemini API key.';
        } else {
          errorMessage = `❌ Error: ${error.message}`;
        }
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to handle edit with a specific prompt
  const handleEditWithPrompt = async (prompt: string) => {
    if (!prompt.trim() || !apiKey || thoughtSignatures.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: apiKey, apiVersion: "v1alpha" });

      // Build contents with conversation history (TEXT ONLY - no images to avoid thought_signature errors)
      const contents: any[] = conversationHistory.map(turn => ({
        role: turn.role,
        parts: turn.parts
          .filter(part => part.text || part.thoughtSignature) // Only include text and thought signatures, not images
          .map(part => {
            if (part.thoughtSignature) {
              return { thoughtSignature: part.thoughtSignature };
            }
            return { text: part.text };
          })
          .filter(part => part.text !== undefined || part.thoughtSignature !== undefined) // Remove parts with undefined values
      }));

      // Add thought signatures before the new user request
      const signaturesAndNewPrompt: any[] = thoughtSignatures.map(sig => ({ thoughtSignature: sig.thoughtSignature }));
      signaturesAndNewPrompt.push({ text: prompt });

      contents.push({
        role: 'user',
        parts: signaturesAndNewPrompt
      });

      console.log('Editing with contents:', JSON.stringify(contents, null, 2));

      const response = await ai.models.generateContent({
        model: selectedModel,
        contents: contents
      });

      console.log('Edit Response:', JSON.stringify(response, null, 2));

      // Extract new thought signatures and content
      const newThoughtSignatures: ContentPart[] = [];
      let responseText = '';

      for (const candidate of response.candidates || []) {
        const parts = candidate.content?.parts || [];

        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];

          // Capture thought signatures
          if (i === 0 || (parts[i-1] && 'thoughtSignature' in parts[i-1])) {
            if (part.thoughtSignature) {
              newThoughtSignatures.push({ thoughtSignature: part.thoughtSignature });
            }
          }

          if (part.text) {
            responseText += part.text;
          } else if (part.inlineData) {
            const imageUrl = `data:image/png;base64,${part.inlineData.data}`;
            setCurrentImage(imageUrl);

            if (part.thoughtSignature) {
              newThoughtSignatures.push({ thoughtSignature: part.thoughtSignature });
            }
          }
        }
      }

      // Update thought signatures for next turn
      setThoughtSignatures(newThoughtSignatures);

      // Add to conversation history
      const userTurn: ConversationTurn = {
        role: 'user',
        parts: [{ text: prompt }]
      };

      const modelTurn: ConversationTurn = {
        role: 'model',
        parts: response.candidates?.[0]?.content?.parts || []
      };

      setConversationHistory([...conversationHistory, userTurn, modelTurn]);
      setCurrentEditPrompt('');

      console.log('Edit complete. New signatures:', newThoughtSignatures.length);
    } catch (error) {
      console.error('Error editing image:', error);
      let errorMessage = 'Failed to edit image. Please try again.';

      if (error instanceof Error) {
        if (error.message.includes('429') || error.message.includes('quota') || error.message.includes('RESOURCE_EXHAUSTED')) {
          errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
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

  // Handle room/style button clicks
  const handleQuickPrompt = async (prompt: string) => {
    setCurrentEditPrompt(prompt);
    // Trigger edit with the selected prompt
    await handleEditWithPrompt(prompt);
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
    setCurrentEditPrompt('');
    setShowApiKeyInput(false);
    setApiKey('');
    setDetectedRooms([]);
  };

  return (
    <section id="ai-analysis" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-br from-yellow-50 to-slate-50 border border-yellow-200 rounded-2xl shadow-lg p-6 md:p-8 w-full max-w-3xl">
            <div className="flex-shrink-0 flex items-center justify-center bg-yellow-100 rounded-full w-16 h-16">
              <Sparkles className="text-yellow-500" size={36} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-title text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                AI-Powered Image Analysis & Editing
              </h2>
              <p className="text-slate-700 font-secondary mb-3">
                Upload an image for AI analysis and conversational editing with thought signatures.
              </p>
              <div className="mt-6">
                {!isAnalyzed && (
                  <>
                    {/* Image Type Selection */}
                    <div className="mb-4 bg-white rounded-lg p-4 border border-slate-200">
                      <label className="text-sm font-medium text-slate-700 mb-3 block">
                        Select Image Type:
                      </label>
                      <div className="flex gap-6">
                        <label className="flex items-center cursor-pointer group">
                          <input
                            type="radio"
                            name="ai-section-image-type"
                            value="floor-plan"
                            checked={imageType === 'floor-plan'}
                            onChange={(e) => setImageType(e.target.value as 'floor-plan')}
                            className="w-4 h-4 text-yellow-500 focus:ring-yellow-500"
                          />
                          <span className="ml-2 text-sm text-slate-700 group-hover:text-slate-900">
                            Floor Plan
                          </span>
                        </label>
                        <label className="flex items-center cursor-pointer group">
                          <input
                            type="radio"
                            name="ai-section-image-type"
                            value="room-photo"
                            checked={imageType === 'room-photo'}
                            onChange={(e) => setImageType(e.target.value as 'room-photo')}
                            className="w-4 h-4 text-yellow-500 focus:ring-yellow-500"
                          />
                          <span className="ml-2 text-sm text-slate-700 group-hover:text-slate-900">
                            Room Photo
                          </span>
                        </label>
                      </div>
                    </div>

                    <div
                      className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-yellow-500 transition-colors cursor-pointer"
                      onClick={() => document.getElementById('room-photo')?.click()}
                    >
                      {preview ? (
                        <img
                          src={preview}
                          alt="Room preview"
                          className="w-full h-64 object-cover rounded-lg mx-auto"
                        />
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="text-slate-400 mb-4" size={48} />
                          <p className="text-slate-700">
                            {imageType === 'floor-plan' ? 'Click to upload floor plan' : 'Click to upload room photo'}
                          </p>
                          <p className="text-slate-500 text-sm mt-2">JPG, PNG up to 5MB</p>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      id="room-photo"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileSelect}
                    />

                    {/* Generate Redesign Button */}
                    {preview && !showApiKeyInput && (
                      <div className="mt-6 text-center">
                        <button
                          onClick={handleShowApiKeyInput}
                          className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
                        >
                          <Sparkles size={20} />
                          Analyze Image
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* API Key Input and Results Section */}
        {showApiKeyInput && !isAnalyzed && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-slate-50 rounded-xl p-8 shadow-sm">
              <div className="text-center mb-8">
                <h3 className="font-title text-xl font-bold text-slate-900 mb-2">
                  AI Image Analysis
                </h3>
                <p className="text-slate-700">
                  Enter your Google Gemini API key to analyze your image
                </p>
              </div>

              {/* Selected Image Preview */}
              {preview && (
                <div className="mb-6">
                  <div className="bg-white rounded-lg p-4 shadow-sm border">
                    <p className="text-sm font-medium text-slate-700 mb-3">Selected Image:</p>
                    <img
                      src={preview}
                      alt="Selected room"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700 whitespace-pre-line font-medium">{error}</p>
                  </div>
                )}

                <div className="relative">
                  <Key className="absolute top-3 left-3 text-slate-400" size={16} />
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your Google Gemini API key"
                    className="w-full py-3 pl-10 pr-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Get your API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-yellow-600 underline hover:text-yellow-700">Google AI Studio</a>
                  </p>
                </div>

                <div>
                  <label htmlFor="ai-model-select" className="block text-sm font-medium text-slate-700 mb-2">AI Model:</label>
                  <select
                    id="ai-model-select"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full py-3 px-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white text-sm font-semibold text-slate-900"
                  >
                    <option value="gemini-3-pro-image-preview">Gemini 3 Pro Image Preview ✨</option>
                  </select>
                  <p className="text-xs text-slate-500 mt-2">
                    Supports conversational image editing with thought signatures
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowApiKeyInput(false)}
                    className="flex-1 py-3 px-6 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAnalyze}
                    disabled={!apiKey || isLoading}
                    className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                      !apiKey || isLoading
                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                        : 'bg-yellow-500 hover:bg-yellow-600 text-slate-900'
                    }`}
                  >
                    {isLoading ? 'Analyzing...' : 'Analyze Image'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results and Editing Section */}
        {isAnalyzed && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-50 rounded-xl p-8 shadow-sm">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left: Current Image */}
                <div>
                  <h3 className="font-title text-xl font-bold text-slate-900 mb-4">Current Image</h3>
                  {currentImage ? (
                    <div className="bg-gradient-to-br from-green-50 to-slate-50 rounded-xl p-4 border-2 border-green-300">
                      <img
                        src={currentImage}
                        alt="AI processed image"
                        className="w-full h-auto object-contain rounded-lg"
                      />
                    </div>
                  ) : preview && (
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <img
                        src={preview}
                        alt="Original image"
                        className="w-full h-auto object-contain rounded-lg"
                      />
                    </div>
                  )}

                  {/* AI Response */}
                  {conversationHistory.length > 0 && (
                    <div className="bg-white rounded-lg p-4 border border-slate-200 mt-4">
                      <p className="text-xs font-semibold text-slate-700 mb-2">AI Response:</p>
                      <p className="text-sm text-slate-600 whitespace-pre-line">
                        {conversationHistory[conversationHistory.length - 1]?.parts
                          .map(part => part.text)
                          .filter(Boolean)
                          .join(' ')}
                      </p>
                    </div>
                  )}
                </div>

                {/* Right: Editing Controls */}
                <div>
                  <h3 className="font-title text-xl font-bold text-slate-900 mb-4">Edit Image</h3>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                      <p className="text-red-700 text-sm whitespace-pre-line">{error}</p>
                    </div>
                  )}

                  {/* Quick Action Buttons - Room/Style Selection */}
                  {imageType === 'floor-plan' && detectedRooms.length > 0 && (
                    <div className="mb-4 bg-white rounded-lg p-4 border border-slate-200">
                      <label className="text-sm font-medium text-slate-700 mb-3 block">
                        View Specific Room:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {detectedRooms.map((room, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleQuickPrompt(`Show me a detailed view of the ${room}, photographed with DSLR quality`)}
                            disabled={isLoading}
                            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 text-sm font-medium rounded-lg transition-colors disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed"
                          >
                            View {room}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {imageType === 'room-photo' && (
                    <div className="mb-4 bg-white rounded-lg p-4 border border-slate-200">
                      <label className="text-sm font-medium text-slate-700 mb-3 block">
                        Apply Interior Style:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {availableStyles.map((style, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleQuickPrompt(`Transform this room into ${style.toLowerCase()}, maintaining the room layout and photographed with DSLR quality`)}
                            disabled={isLoading}
                            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium rounded-lg transition-colors disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed"
                          >
                            {style}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <textarea
                      value={currentEditPrompt}
                      onChange={(e) => setCurrentEditPrompt(e.target.value)}
                      placeholder="Or describe your own custom edit (e.g., 'Add modern furniture', 'Change lighting', 'Add plants')"
                      className="w-full py-2.5 px-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white text-sm resize-none"
                      rows={4}
                    />
                    <button
                      onClick={handleEdit}
                      disabled={!currentEditPrompt.trim() || isLoading}
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                        !currentEditPrompt.trim() || isLoading
                          ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                          : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                    >
                      <Send size={20} />
                      {isLoading ? 'Processing...' : 'Apply Edit'}
                    </button>

                    <button
                      onClick={handleReset}
                      className="w-full py-2.5 px-6 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium"
                    >
                      Upload New Image
                    </button>
                  </div>

                  {/* Conversation History */}
                  {conversationHistory.length > 0 && (
                    <div className="bg-white rounded-lg p-4 border border-slate-200 mt-6">
                      <h4 className="text-xs font-semibold text-slate-700 mb-3">Conversation History:</h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {conversationHistory.map((turn, idx) => (
                          <div key={idx} className={`text-xs ${turn.role === 'user' ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>
                            <span className="font-bold">{turn.role === 'user' ? '👤 You:' : '🤖 AI:'}</span>
                            {' '}
                            {turn.parts.map(part => part.text).filter(Boolean).join(' ').substring(0, 100)}
                            {turn.parts.map(part => part.text).filter(Boolean).join(' ').length > 100 && '...'}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AIAnalysisSection;
