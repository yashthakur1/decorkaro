import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Sparkles, Key } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { fal } from '@fal-ai/client';

import { useEffect } from 'react';

const AIAnalysisSection: React.FC = () => {
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [mobile, setMobile] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [otpWidgetVisible, setOtpWidgetVisible] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  // Handle MSG91 OTP widget initialization and verification
  useEffect(() => {
    if (showOtpModal) {
      // Inject MSG91 OTP widget script
      if (!document.getElementById('msg91-otp-script')) {
        const script = document.createElement('script');
        script.id = 'msg91-otp-script';
        script.type = 'text/javascript';
        script.src = 'https://verify.msg91.com/otp-provider.js';
        script.onload = () => {
          // @ts-ignore
          if (typeof initSendOTP === 'function') {
            // MSG91 configuration
            const configuration = {
              widgetId: '356565686c45383437363831',
              tokenAuth: '447814TAOUnO6bAbmf68187369P1',
              identifier: '', // Set dynamically from form if needed
              exposeMethods: true,
              success: (data: any) => { console.log('success response', data); },
              failure: (error: any) => { console.log('failure reason', error); },
              VAR1: ''
            };
            // @ts-ignore
            initSendOTP(configuration);
          }
        };
        document.body.appendChild(script);
      } else {
        // If script already loaded, re-initialize widget
        // @ts-ignore
        if (typeof initSendOTP === 'function') {
          const configuration = {
            widgetId: '356565686c45383437363831',
            tokenAuth: '447814TAOUnO6bAbmf68187369P1',
            identifier: '',
            exposeMethods: true,
            success: (data: any) => { console.log('success response', data); },
            failure: (error: any) => { console.log('failure reason', error); },
            VAR1: ''
          };
          // @ts-ignore
          initSendOTP(configuration);
        }
      }
    }
  }, [showOtpModal, otpWidgetVisible, mobile]);

  // Attach MSG91 OTP widget after clicking Continue
  const handleOtpSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile || !firstName || !lastName || !email || !acceptedTerms) {
      alert('Please fill all fields and accept the terms.');
      return;
    }
    setOtpWidgetVisible(true);
    // Inject OTP widget with identifier as mobile
    setTimeout(() => {
      if (window && (window as any).initSendOTP) {
        const configuration = {
          widgetId: '356565686c45383437363831',
          tokenAuth: '447814TAOUnO6bAbmf68187369P1',
          identifier: mobile,
          exposeMethods: true,
          success: (data: any) => {
            setOtpVerified(true);
            console.log('OTP verified, token:', data);
            // You can now send the full form data + token to your backend
          },
          failure: (error: any) => {
            setOtpVerified(false);
            alert('OTP verification failed. Please try again.');
            console.log('OTP failure:', error);
          },
          VAR1: ''
        };
        (window as any).initSendOTP(configuration);
      }
    }, 300);
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ text: string; image: string | null }>({ text: '', image: null });
  const { isAuthenticated } = useAuthStore();
  const [remainingAnalyses, setRemainingAnalyses] = useState(2);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>('Transform this room into a modern, elegant interior design with improved lighting and furniture layout.');

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
    if (!selectedFile || !isAuthenticated) return;
    if (remainingAnalyses <= 0) return;
    setShowApiKeyInput(true);
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !isAuthenticated || !apiKey) return;
    if (remainingAnalyses <= 0) return;

    setIsLoading(true);
    setError(null);

    try {
      // Configure fal client with the user-provided API key
      fal.config({ credentials: apiKey });

      // Create a base64 encoded string from the preview
      const base64Image = preview?.split(',')[1];
      if (!base64Image) {
        throw new Error('Invalid image data');
      }

      // Call the Fal.ai flux API with the provided parameters
      const result = await fal.subscribe("fal-ai/flux-pro/v1/canny", {
        input: {
          prompt: prompt,
          control_image_url: preview as string
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
      const imageUrl = typeof result.data.images?.[0] === 'string' 
        ? result.data.images[0] 
        : result.data.images?.[0]?.url || null;

      setResult({
        text: "Here's an AI-generated redesign of your room based on your specifications. The transformation incorporates your design preferences while maintaining the room's proportions and key architectural elements.",
        image: imageUrl
      });
      setRemainingAnalyses(prev => prev - 1);
      setShowApiKeyInput(false);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setError('Failed to analyze image. Please try again.');
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
              <h2 className="font-title text-2xl md:text-3xl font-bold text-slate-900 mb-2">AI-Powered Design for Your Room</h2>
              <p className="text-slate-700 font-secondary mb-3">
                Upload a photo and let our AI suggest personalized design improvements. <span className="font-semibold text-yellow-600">Get 2 free analyses when you sign up!</span>
              </p>
              {!isAuthenticated && (
                <button
                  type="button"
                  onClick={() => setShowOtpModal(true)}
                  className="inline-block bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold px-6 py-2 rounded-md transition-colors duration-300 mt-2 shadow"
                >
                  Renovate with AI
                </button>
              )}

              {/* OTP Modal Overlay */}
              {showOtpModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative animate-fade-in">
                    <button
                      className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 text-2xl font-bold"
                      onClick={() => setShowOtpModal(false)}
                      aria-label="Close"
                    >
                      &times;
                    </button>
                    <h3 className="font-title text-xl font-bold text-slate-900 mb-2 text-center">Sign Up & Verify Your Mobile</h3>
                    <p className="text-slate-600 text-center mb-4">Get started with AI-powered design recommendations. Please verify your mobile number to continue.</p>
                    <form className="space-y-3" onSubmit={handleOtpSignupSubmit}>
                      <input type="tel" name="mobile" placeholder="Mobile Number" value={mobile} onChange={e => setMobile(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" required maxLength={15} />
                      <div className="flex gap-3">
                        <input type="text" name="firstName" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
                        <input type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
                      </div>
                      <input type="email" name="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
                      <div className="flex items-center gap-2 mt-2">
                        <input type="checkbox" id="terms" checked={acceptedTerms} onChange={e => setAcceptedTerms(e.target.checked)} required className="accent-yellow-500" />
                        <label htmlFor="terms" className="text-xs text-slate-600">I accept the <a href="/terms" className="underline text-yellow-600" target="_blank" rel="noopener noreferrer">Terms & Conditions</a></label>
                        <span className="text-green-500 ml-1">&#10003;</span>
                      </div>
                      {!otpWidgetVisible && (
                        <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold px-6 py-2 rounded-md transition-colors duration-300 mt-2">Continue</button>
                      )}
                    </form>
                    {/* OTP Widget shown after Continue */}
                    {otpWidgetVisible && (
                      <div id="otp-widget-container" className="mt-4 mb-2" />
                    )}
                    {otpVerified && (
                      <div className="text-green-600 text-center font-semibold mt-2">Mobile number verified! You may now proceed.</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {isAuthenticated ? (
            <div className="bg-slate-50 rounded-xl p-8 shadow-sm">
              <div className="text-center mb-8">
                <p className="text-slate-700">
                  Remaining free analyses: <span className="font-semibold">{remainingAnalyses}</span>
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div 
                    className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-yellow-500 transition-colors"
                    onClick={() => document.getElementById('room-photo')?.click()}
                  >
                    {preview ? (
                      <img 
                        src={preview} 
                        alt="Room preview" 
                        className="w-full h-64 object-cover rounded-lg"
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
                </div>
                
                <div>
                  {result ? (
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <h4 className="font-serif text-xl font-bold text-slate-900 mb-6">
                        AI Analysis Results
                      </h4>
                      {result.image && (
                        <img 
                          src={result.image} 
                          alt="AI-generated design" 
                          className="w-full h-64 object-cover rounded-lg mb-6"
                        />
                      )}
                      <p className="text-slate-700 whitespace-pre-line">{result.text}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      {error && (
                        <p className="text-red-500 mb-4">{error}</p>
                      )}
                      
                      {showApiKeyInput ? (
                        <div className="w-full mb-4">
                          <div className="flex flex-col gap-3">
                            <div className="relative">
                              <Key className="absolute top-3 left-3 text-slate-400" size={16} />
                              <input 
                                type="password"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                placeholder="Enter your Fal.ai API key"
                                className="w-full py-2 pl-10 pr-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Design Prompt:</label>
                              <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="w-full py-2 px-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 min-h-[80px]"
                              />
                            </div>
                          
                            <button
                              onClick={handleAnalyze}
                              disabled={!apiKey || isLoading}
                              className={`px-8 py-3 rounded-md font-semibold transition-colors ${
                                !apiKey || isLoading
                                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                  : 'bg-yellow-500 hover:bg-yellow-600 text-slate-900'
                              }`}
                            >
                              {isLoading ? 'Processing...' : 'Generate Design'}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={handleShowApiKeyInput}
                          disabled={!selectedFile || isLoading || remainingAnalyses === 0}
                          className={`px-8 py-3 rounded-md font-semibold transition-colors ${
                            !selectedFile || remainingAnalyses === 0
                              ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                              : 'bg-yellow-500 hover:bg-yellow-600 text-slate-900'
                          }`}
                        >
                          {isLoading ? 'Processing...' : 'Visualize with AI'}
                        </button>
                      )}
                      
                      {remainingAnalyses === 0 && (
                        <p className="text-slate-500 mt-4 text-sm">
                          You've used all your free analyses
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default AIAnalysisSection;