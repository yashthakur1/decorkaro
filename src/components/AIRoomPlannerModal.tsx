import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Sparkles, Key, Image as ImageIcon, Send } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface AIRoomPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Type definitions for conversation history
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

const AIRoomPlannerModal: React.FC<AIRoomPlannerModalProps> = ({ isOpen, onClose }) => {
  // State for file handling
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [originalImageData, setOriginalImageData] = useState<string | null>(null);

  // State for API and loading
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ text: string; image: string | null }>({ text: '', image: null });
  const [error, setError] = useState<string | null>(null);

  // State for API key
  const [apiKey, setApiKey] = useState<string>('');

  // State for model selection
  const [selectedModel, setSelectedModel] = useState<string>('gemini-2.5-flash-image');

  // State for image type selection
  const [imageType, setImageType] = useState<'floor-plan' | 'room-photo'>('floor-plan');

  // State for conversation history (for multi-turn editing with thought signatures)
  const [conversationHistory, setConversationHistory] = useState<ConversationTurn[]>([]);
  const [isAnalyzed, setIsAnalyzed] = useState<boolean>(false);
  const [currentEditPrompt, setCurrentEditPrompt] = useState<string>('');

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      setResult({ text: '', image: null });
      setError(null);
      setConversationHistory([]);
      setIsAnalyzed(false);
      setCurrentEditPrompt('');
    }
  };

  const handleAnalyze = async () => {
    if (!originalImageData || !apiKey) return;

    setIsLoading(true);
    setError(null);

    try {
      // Initialize Google GenAI with v1alpha API for thought signatures and media_resolution
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        apiVersion: selectedModel.includes('gemini-3') ? "v1alpha" : undefined
      });

      // Create prompt based on selected image type
      const floorPlanPrompt = `You are a premium interior designer. Analyze this floor plan (architectural 2D drawing) and create a stunning visualization:

TASK:
- Transform it into a realistic 3D rendered visualization of the furnished space
- Show how the space would look with premium furniture and decor
- Use a bird's eye or isometric view that shows the layout clearly
- Add sophisticated furniture arrangements that fit the floor plan perfectly
- Include modern, minimal, and premium design elements

DESIGN REQUIREMENTS:
- Minimal yet luxurious aesthetic
- Modern and sophisticated
- High-end materials and finishes (marble, hardwood, premium tiles)
- Cohesive color scheme with neutrals or warm tones
- Attention to spatial balance and flow
- Elegant lighting fixtures and ambient lighting
- Tasteful decor elements (artwork, plants, sculptural pieces)
- Premium quality throughout

Create a photorealistic 3D visualization that showcases the floor plan's full potential with premium furnishings.`;

      const roomPhotoPrompt = `You are a premium interior designer. Analyze this empty room/house photo and create a stunning visualization:

TASK:
- Furnish and decorate the space with premium interior design
- Maintain the exact room structure, walls, windows, and architectural features
- Add sophisticated furniture with sleek, contemporary pieces
- Transform the empty space into a fully furnished premium interior

DESIGN REQUIREMENTS:
- Minimal yet luxurious aesthetic
- Modern and sophisticated
- Use elegant color palettes with neutrals or warm tones
- Include premium flooring (hardwood, marble, or high-end tiles)
- Add ambient lighting with elegant fixtures
- Include tasteful decor elements (artwork, plants, sculptural pieces)
- High-end materials and finishes
- Cohesive color scheme
- Attention to spatial balance and flow
- Premium quality throughout

Create a photorealistic visualization that showcases the space's full potential with premium furnishings and decor.`;

      const imageGenerationPrompt = imageType === 'floor-plan' ? floorPlanPrompt : roomPhotoPrompt;

      // Build user content parts - CRITICAL: Proper structure for thought signatures
      const userParts: ContentPart[] = [
        { text: imageGenerationPrompt },
        {
          inlineData: {
            data: originalImageData,
            mimeType: selectedFile.type || 'image/jpeg'
          }
        }
      ];

      // Build API request with proper content structure
      const apiContents: any[] = [{
        role: 'user',
        parts: selectedModel.includes('gemini-3')
          ? userParts.map(part => {
              if (part.inlineData) {
                return {
                  inlineData: part.inlineData,
                  mediaResolution: { level: "media_resolution_high" }
                };
              }
              return part;
            })
          : userParts
      }];

      // Use selected Gemini model for image generation
      const response = await ai.models.generateContent({
        model: selectedModel,
        contents: apiContents,
        config: selectedModel.includes('gemini-3')
          ? {} // Gemini 3 doesn't use responseModalities
          : { responseModalities: ['TEXT', 'IMAGE'] }
      });

      let generatedImageBase64 = '';
      let analysisText = '';

      // Log full response structure for debugging
      console.log('Full Gemini API Response:', JSON.stringify(response, null, 2));
      console.log('Response candidates:', response.candidates);

      // Extract both text and image from response (for display only)
      for (const candidate of response.candidates || []) {
        console.log('Processing candidate:', candidate);
        for (const part of candidate.content?.parts || []) {
          console.log('Processing part:', part);
          if (part.text) {
            analysisText += part.text;
          } else if (part.inlineData) {
            generatedImageBase64 = part.inlineData.data;
            console.log('Found inline image data, length:', generatedImageBase64.length);
          }
        }
      }

      console.log('Gemini Generated Image:', generatedImageBase64 ? `Success (${generatedImageBase64.length} bytes)` : 'No image returned');
      console.log('Gemini Analysis:', analysisText);

      // Validate that an actual new image was generated
      if (!generatedImageBase64) {
        throw new Error('No image was generated by the AI. The Gemini API returned only text or an empty response. This could mean the model doesn\'t support image generation, or the API configuration needs adjustment.');
      }

      // Convert base64 to data URL for display
      const generatedImageUrl = `data:image/png;base64,${generatedImageBase64}`;

      setResult({
        text: analysisText || 'Your premium space visualization has been generated successfully!',
        image: generatedImageUrl
      });

      // CRITICAL: Store complete conversation history with thought signatures intact
      // This is the KEY FIX - don't manually extract signatures, store the complete response
      const userTurn: ConversationTurn = {
        role: 'user',
        parts: userParts
      };

      const modelTurn: ConversationTurn = {
        role: 'model',
        parts: response.candidates?.[0]?.content?.parts || []
      };

      setConversationHistory([userTurn, modelTurn]);
      setIsAnalyzed(true);
      console.log('Conversation history stored with', modelTurn.parts.length, 'model parts');
    } catch (error) {
      console.error('Error generating design:', error);
      console.error('Error details:', error instanceof Error ? error.stack : error);
      let errorMessage = 'Failed to generate design. Please try again.';

      if (error instanceof Error) {
        // Check for rate limit errors
        if (error.message.includes('429') || error.message.includes('quota') || error.message.includes('RESOURCE_EXHAUSTED')) {
          errorMessage = 'Rate limit exceeded. Please wait a moment and try again, or check your API quota at https://ai.dev/usage';
        }
        // Check for no image generated error
        else if (error.message.includes('No image was generated')) {
          errorMessage = '⚠️ Image Generation Failed: The Gemini API did not return a generated image. This usually means:\n\n' +
            '• The "gemini-2.5-flash-image" model may not support image generation yet\n' +
            '• Your API key may not have access to image generation features\n' +
            '• The model returned only text analysis instead of a visual\n\n' +
            'Try checking the browser console (F12) for detailed API response logs, or contact support if this persists.';
        }
        // Check for API key errors
        else if (error.message.includes('API_KEY') || error.message.includes('invalid') || error.message.includes('unauthorized')) {
          errorMessage = '🔑 Invalid API Key: Please check that your Google Gemini API key is correct and has the necessary permissions. Get your key at https://aistudio.google.com/app/apikey';
        }
        // Generic error with actual message
        else {
          errorMessage = `❌ Error: ${error.message}`;
        }
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle editing requests with thought signatures - THE KEY FIX
  const handleEdit = async () => {
    if (!currentEditPrompt.trim() || !apiKey || conversationHistory.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      // Initialize Google GenAI with v1alpha API for thought signatures
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        apiVersion: selectedModel.includes('gemini-3') ? "v1alpha" : undefined
      });

      // CRITICAL FIX: Send complete conversation history + new user message
      // The thought signatures are already in the model's parts from previous responses
      // We DON'T manually extract and re-send them - the API handles this automatically
      const contents: any[] = conversationHistory.map(turn => ({
        role: turn.role,
        parts: selectedModel.includes('gemini-3')
          ? turn.parts.map((part: ContentPart) => {
              // For Gemini 3, add mediaResolution to images
              if (part.inlineData) {
                return {
                  ...part,
                  mediaResolution: { level: "media_resolution_high" }
                };
              }
              // All other parts (text, thoughtSignature) pass through unchanged
              return part;
            })
          : turn.parts
      }));

      // Add new user message (no thought signature needed - it's automatically handled)
      contents.push({
        role: 'user',
        parts: [{ text: currentEditPrompt }]
      });

      console.log('Editing with', contents.length, 'turns in conversation history');

      const response = await ai.models.generateContent({
        model: selectedModel,
        contents: contents,
        config: selectedModel.includes('gemini-3')
          ? {} // Gemini 3 doesn't use responseModalities
          : { responseModalities: ['TEXT', 'IMAGE'] }
      });

      console.log('Edit Response:', JSON.stringify(response, null, 2));

      // Extract new content for display
      let generatedImageBase64 = '';
      let responseText = '';

      for (const candidate of response.candidates || []) {
        for (const part of candidate.content?.parts || []) {
          if (part.text) {
            responseText += part.text;
          } else if (part.inlineData) {
            generatedImageBase64 = part.inlineData.data;
          }
        }
      }

      if (generatedImageBase64) {
        const imageUrl = `data:image/png;base64,${generatedImageBase64}`;
        setResult({
          text: responseText || 'Your edited visualization has been generated!',
          image: imageUrl
        });
      }

      // Update conversation history with new turns (including all thought signatures)
      const userTurn: ConversationTurn = {
        role: 'user',
        parts: [{ text: currentEditPrompt }]
      };

      const modelTurn: ConversationTurn = {
        role: 'model',
        parts: response.candidates?.[0]?.content?.parts || []
      };

      setConversationHistory([...conversationHistory, userTurn, modelTurn]);
      setCurrentEditPrompt('');
      console.log('Edit complete. Conversation now has', conversationHistory.length + 2, 'turns');
    } catch (error) {
      console.error('Error editing image:', error);
      let errorMessage = 'Failed to edit image. Please try again.';

      if (error instanceof Error) {
        if (error.message.includes('429') || error.message.includes('quota') || error.message.includes('RESOURCE_EXHAUSTED')) {
          errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
        } else if (error.message.includes('thought_signature')) {
          errorMessage = `❌ Thought Signature Error: ${error.message}\n\nThis usually means there's an issue with the conversation history. Try resetting and starting fresh.`;
        } else {
          errorMessage = `❌ Error: ${error.message}`;
        }
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult({ text: '', image: null });
    setError(null);
    setSelectedFile(null);
    setPreview(null);
    setOriginalImageData(null);
    setApiKey('');
    setConversationHistory([]);
    setIsAnalyzed(false);
    setCurrentEditPrompt('');
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-yellow-50 to-slate-50">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center bg-yellow-100 rounded-full w-10 h-10">
                  <Sparkles className="text-yellow-500" size={24} />
                </div>
                <div>
                  <h2 className="font-title text-xl md:text-2xl font-bold text-slate-900">
                    AI Room Planner
                  </h2>
                  <p className="text-sm text-slate-600">
                    Visualize your space with premium AI-powered design
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X size={24} className="text-slate-600" />
              </button>
            </div>

            {/* Main Content - Split Layout */}
            <div className="flex flex-1 overflow-hidden">
              {/* Left Navigation/Controls Panel */}
              <div className="w-full md:w-96 border-r border-slate-200 bg-slate-50 p-6 overflow-y-auto">
                <div className="space-y-6">
                  {/* Upload Section */}
                  <div>
                    <h3 className="font-title text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Upload size={20} />
                      Upload Image
                    </h3>

                    {/* Image Type Selection */}
                    <div className="mb-4 bg-white rounded-lg p-4 border border-slate-200">
                      <label className="text-sm font-medium text-slate-700 mb-3 block">
                        Select Image Type:
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center cursor-pointer group">
                          <input
                            type="radio"
                            name="image-type"
                            value="floor-plan"
                            checked={imageType === 'floor-plan'}
                            onChange={(e) => setImageType(e.target.value as 'floor-plan')}
                            className="w-4 h-4 text-yellow-500 focus:ring-yellow-500"
                          />
                          <span className="ml-3 text-sm text-slate-700 group-hover:text-slate-900">
                            Floor Plan (2D architectural drawing)
                          </span>
                        </label>
                        <label className="flex items-center cursor-pointer group">
                          <input
                            type="radio"
                            name="image-type"
                            value="room-photo"
                            checked={imageType === 'room-photo'}
                            onChange={(e) => setImageType(e.target.value as 'room-photo')}
                            className="w-4 h-4 text-yellow-500 focus:ring-yellow-500"
                          />
                          <span className="ml-3 text-sm text-slate-700 group-hover:text-slate-900">
                            Room Photo (empty room/house)
                          </span>
                        </label>
                      </div>
                    </div>

                    <div
                      className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-yellow-500 transition-colors cursor-pointer bg-white"
                      onClick={() => document.getElementById('modal-room-photo')?.click()}
                    >
                      {preview ? (
                        <div className="space-y-2">
                          <img
                            src={preview}
                            alt="Room preview"
                            className="w-full h-32 object-cover rounded-lg mx-auto"
                          />
                          <p className="text-xs text-slate-600">Click to change image</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="text-slate-400 mb-2" size={32} />
                          <p className="text-slate-700 text-sm font-medium">
                            {imageType === 'floor-plan' ? 'Upload floor plan image' : 'Upload room photo'}
                          </p>
                          <p className="text-slate-500 text-xs mt-1">JPG, PNG up to 5MB</p>
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

                  {/* API Key Section */}
                  <div>
                    <h3 className="font-title text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Key size={20} />
                      API Configuration
                    </h3>
                    <div className="space-y-3">
                      <div className="relative">
                        <input
                          type="password"
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          placeholder="Enter Google Gemini API key"
                          className="w-full py-2.5 px-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white text-sm"
                        />
                      </div>
                      <p className="text-xs text-slate-600">
                        Get your API key from{' '}
                        <a
                          href="https://aistudio.google.com/app/apikey"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-yellow-600 underline hover:text-yellow-700"
                        >
                          Google AI Studio
                        </a>
                      </p>
                      <div className="bg-white rounded-lg p-3 border border-slate-200">
                        <label htmlFor="model-select" className="text-xs font-medium text-slate-700 mb-2 block">
                          AI Model:
                        </label>
                        <select
                          id="model-select"
                          value={selectedModel}
                          onChange={(e) => setSelectedModel(e.target.value)}
                          className="w-full py-2 px-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white text-sm font-semibold text-slate-900"
                        >
                          <option value="gemini-2.5-flash-image">Nano Banana Flash 🍌</option>
                          <option value="gemini-3-pro-image">Nano Banana Pro 🍌⚡</option>
                          <option value="gemini-3-pro-image-preview">Gemini 3 Pro Image Preview ✨</option>
                        </select>
                        <p className="text-xs text-slate-500 mt-2">
                          {selectedModel === 'gemini-2.5-flash-image'
                            ? 'Fast image generation with premium quality'
                            : selectedModel === 'gemini-3-pro-image'
                            ? 'Enhanced quality with advanced AI capabilities'
                            : 'Latest preview model with advanced image generation'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Error Display */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-700 text-sm whitespace-pre-line">{error}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4">
                    {!isAnalyzed ? (
                      <button
                        onClick={handleAnalyze}
                        disabled={!selectedFile || !apiKey || isLoading}
                        className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                          !selectedFile || !apiKey || isLoading
                            ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                            : 'bg-yellow-500 hover:bg-yellow-600 text-slate-900'
                        }`}
                      >
                        <Sparkles size={20} />
                        {isLoading ? 'Generating...' : 'Generate Visualization'}
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <div className="bg-white rounded-lg p-4 border border-slate-200">
                          <label className="text-sm font-medium text-slate-700 mb-2 block">
                            Edit Prompt:
                          </label>
                          <textarea
                            value={currentEditPrompt}
                            onChange={(e) => setCurrentEditPrompt(e.target.value)}
                            placeholder="E.g., 'Make the room brighter', 'Add more plants', 'Change to modern style'..."
                            className="w-full py-2 px-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none text-sm"
                            rows={3}
                            disabled={isLoading}
                          />
                        </div>
                        <button
                          onClick={handleEdit}
                          disabled={!currentEditPrompt.trim() || isLoading}
                          className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                            !currentEditPrompt.trim() || isLoading
                              ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                              : 'bg-yellow-500 hover:bg-yellow-600 text-slate-900'
                          }`}
                        >
                          <Send size={20} />
                          {isLoading ? 'Editing...' : 'Apply Edit'}
                        </button>
                      </div>
                    )}

                    {(preview || result.image) && (
                      <button
                        onClick={handleReset}
                        className="w-full py-2.5 px-6 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium"
                      >
                        Reset & Start Over
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Visual Preview Panel */}
              <div className="flex-1 bg-white p-6 overflow-y-auto">
                <div className="h-full flex flex-col">
                  <h3 className="font-title text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <ImageIcon size={20} />
                    Visual Preview
                  </h3>

                  {!preview && !result.image ? (
                    <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl">
                      <div className="text-center text-slate-400">
                        <ImageIcon size={64} className="mx-auto mb-3 opacity-50" />
                        <p className="text-lg font-medium">No images yet</p>
                        <p className="text-sm mt-1">Upload an image to get started</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 space-y-6">
                      {/* Loading State */}
                      {isLoading && (
                        <div className="bg-yellow-50 rounded-xl p-8 border border-yellow-200">
                          <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-500 border-t-transparent"></div>
                            <p className="text-slate-700 font-medium">Generating your premium visualization...</p>
                            <p className="text-sm text-slate-600">This may take a few moments</p>
                          </div>
                        </div>
                      )}

                      {/* AI Generated Image */}
                      {result.image && (
                        <div className="bg-gradient-to-br from-yellow-50 to-slate-50 rounded-xl p-4 border-2 border-yellow-300">
                          <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                            <Sparkles size={16} className="text-yellow-500" />
                            AI-Generated Design
                          </h4>
                          <img
                            src={result.image}
                            alt="AI redesigned room"
                            className="w-full h-auto object-contain rounded-lg max-h-[40vh] mb-4"
                          />
                          {result.text && (
                            <div className="bg-white rounded-lg p-4 mt-4">
                              <p className="text-xs font-semibold text-slate-700 mb-2">Design Notes:</p>
                              <p className="text-sm text-slate-600 whitespace-pre-line">{result.text}</p>
                            </div>
                          )}
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
