import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Sparkles, Key } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const AIAnalysisSection: React.FC = () => {
  // State for file handling
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  
  // State for API and loading
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ text: string; image: string | null }>({ text: '', image: null });
  const [error, setError] = useState<string | null>(null);
  
  // State for API key and prompt
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(false);
  const [prompt] = useState<string>('Rethink this exact room structure with a better interior, minimal yet premium');

  // State for model selection
  const [selectedModel, setSelectedModel] = useState<string>('gemini-2.5-flash-image');

  // State for image type selection
  const [imageType, setImageType] = useState<'floor-plan' | 'room-photo'>('floor-plan');

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
    }
  };

  const handleShowApiKeyInput = () => {
    if (!selectedFile) return;
    setShowApiKeyInput(true);
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !apiKey) return;

    setIsLoading(true);
    setError(null);

    try {
      // Initialize Google GenAI with the user-provided API key
      const ai = new GoogleGenAI({ apiKey: apiKey });

      if (!selectedFile) {
        throw new Error('No image file selected');
      }

      // Convert image to base64
      const imageData = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            // Extract base64 data from data URL
            const base64 = reader.result.split(',')[1];
            resolve(base64);
          } else {
            reject(new Error('Failed to read image file'));
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(selectedFile);
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

      // Use selected Gemini model for image generation
      let response;

      if (selectedModel === 'gemini-3-pro-image-preview') {
        // Use new API structure for gemini-3-pro-image-preview
        response = await ai.models.generateContent({
          model: selectedModel,
          contents: imageGenerationPrompt,
          config: {
            imageConfig: {
              aspectRatio: "16:9",
              imageSize: "4K"
            }
          }
        });
      } else {
        // Use existing API structure for other models (Nano Banana API)
        response = await ai.models.generateContent({
          model: selectedModel,
          contents: [
            { text: imageGenerationPrompt },
            {
              inlineData: {
                data: imageData,
                mimeType: selectedFile.type || 'image/jpeg'
              }
            }
          ],
          config: {
            responseModalities: ['TEXT', 'IMAGE']
          }
        });
      }

      let generatedImageBase64 = '';
      let analysisText = '';

      // Log full response structure for debugging
      console.log('Full Gemini API Response:', JSON.stringify(response, null, 2));
      console.log('Response candidates:', response.candidates);

      // Extract both text and image from response
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
      setShowApiKeyInput(false);
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
                AI-Powered Room & Floor Plan Visualization
              </h2>
              <p className="text-slate-700 font-secondary mb-3">
                Upload a floor plan or empty house photo and let our AI visualize a premium redesign.
              </p>
              <div className="mt-6">
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
                {preview && !showApiKeyInput && !result.image && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={handleShowApiKeyInput}
                      className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
                    >
                      <Sparkles size={20} />
                      Generate Redesign
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* API Key Input and Results Section */}
        {showApiKeyInput && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-slate-50 rounded-xl p-8 shadow-sm">
              <div className="text-center mb-8">
                <h3 className="font-title text-xl font-bold text-slate-900 mb-2">
                  AI Space Visualization Generator
                </h3>
                <p className="text-slate-700">
                  Enter your Google Gemini API key to generate a premium redesign visualization
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
              
              {result.image ? (
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h4 className="font-serif text-xl font-bold text-slate-900 mb-6">
                    Your Redesigned Space
                  </h4>
                  <img
                    src={result.image}
                    alt="Redesigned room"
                    className="w-full h-auto object-cover rounded-lg mb-6"
                  />
                  {result.text && (
                    <div className="text-slate-700 whitespace-pre-line prose prose-slate max-w-none">{result.text}</div>
                  )}

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => {
                        setResult({ text: '', image: null });
                        setShowApiKeyInput(false);
                        setApiKey('');
                        setError(null);
                        setSelectedFile(null);
                        setPreview(null);
                      }}
                      className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md transition-colors"
                    >
                      Visualize Another Space
                    </button>
                  </div>
                </div>
              ) : (
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
                      {isLoading ? 'Generating Visualization...' : 'Generate Visualization'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AIAnalysisSection;