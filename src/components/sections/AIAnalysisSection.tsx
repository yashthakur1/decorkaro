import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Sparkles, Key } from 'lucide-react';
import { fal } from '@fal-ai/client';

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
      // Configure fal client with the user-provided API key
      fal.config({ credentials: apiKey });

      if (!selectedFile) {
        throw new Error('No image file selected');
      }

      // Upload the file to fal storage
      const imageUrl = await fal.storage.upload(selectedFile);

      // Call the Fal.ai flux kontext API
      const result = await fal.subscribe("fal-ai/flux-pro/kontext", {
        input: {
          prompt: "Rethink this exact room structure with a better interior, minimal yet premium",
          image_url: imageUrl,
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            update.logs.map((log) => log.message).forEach(console.log);
          }
        },
      });

      console.log(result.data);
      console.log(result.requestId);

      // Extract the image URL from the result data
      const generatedImageUrl = typeof result.data.images?.[0] === 'string' 
        ? result.data.images[0] 
        : result.data.images?.[0]?.url || null;

      setResult({
        text: "Here's an AI-generated redesign of your room with a minimal yet premium interior. The transformation maintains the exact room structure while elevating the design with carefully selected elements and improved aesthetics.",
        image: generatedImageUrl
      });
      setShowApiKeyInput(false);
    } catch (error) {
      console.error('Error analyzing image:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to analyze image. Please try again.';
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
                AI-Powered Design for Your Room
              </h2>
              <p className="text-slate-700 font-secondary mb-3">
                Upload a photo and let our AI suggest personalized design improvements.
              </p>
              <div className="mt-6">
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
                      <p className="text-slate-700">Click to upload room photo</p>
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
                
                {/* Analyse Image Button */}
                {preview && !showApiKeyInput && !result.image && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={handleShowApiKeyInput}
                      className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
                    >
                      <Sparkles size={20} />
                      Analyse Image
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
                  AI Design Analysis
                </h3>
                <p className="text-slate-700">
                  Enter your Fal.ai API key to generate AI design suggestions
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
                    AI Analysis Results
                  </h4>
                  <img 
                    src={result.image} 
                    alt="AI-generated design" 
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                  <p className="text-slate-700 whitespace-pre-line">{result.text}</p>
                  
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
                      Analyse Another Image
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-600">{error}</p>
                    </div>
                  )}
                  
                  <div className="relative">
                    <Key className="absolute top-3 left-3 text-slate-400" size={16} />
                    <input 
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter your Fal.ai API key"
                      className="w-full py-3 pl-10 pr-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <p className="text-xs text-slate-500 mt-2">
                      Get your API key from <a href="https://fal.ai/dashboard" target="_blank" rel="noopener noreferrer" className="text-yellow-600 underline hover:text-yellow-700">fal.ai/dashboard</a>
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Design Prompt:</label>
                    <div className="w-full py-3 px-3 border border-slate-200 rounded-lg bg-slate-100 text-slate-600">
                      {prompt}
                    </div>
                    <p className="text-xs text-slate-500 mt-2">This prompt is optimized for best results</p>
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
                      {isLoading ? 'Processing...' : 'Generate Design'}
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