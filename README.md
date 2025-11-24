# Decorkaro - AI-Powered Interior Design Platform

## Overview
Decorkaro is an interior design platform featuring AI-powered room analysis using Google's Gemini AI technology.

## Features
- **AI Room Analysis**: Upload photos of your room and receive detailed design recommendations
- **Powered by Google Gemini**: Uses Gemini 1.5 Pro for advanced image understanding and design suggestions
- **User-friendly Interface**: Simple upload and analysis workflow
- **Secure API Key Management**: Users provide their own Google Gemini API keys for analysis

## AI Integration - Google Gemini

### Setup
1. Get your Google Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Install dependencies:
   ```bash
   npm install
   ```

### How It Works
The AI-powered room analysis feature uses Google's Gemini 1.5 Pro model with vision capabilities to:
1. Analyze room images uploaded by users
2. Provide detailed design recommendations including:
   - Current room assessment (style, layout, strengths, weaknesses)
   - Specific design improvements for walls, flooring, furniture, and lighting
   - Color palette recommendations
   - Furniture and decor suggestions
   - Budget-friendly alternatives

### API Key Configuration
- API keys are provided by users at runtime through the web interface
- No server-side API key storage required
- Keys are used directly in the client for Gemini API calls

### Technical Details
- **Package**: `@google/generative-ai` (v0.21.0)
- **Model**: `gemini-1.5-pro`
- **Implementation**: `/src/components/sections/AIAnalysisSection.tsx`
- **Image Processing**: Converts uploaded images to base64 for Gemini API
- **Response**: Returns detailed text-based design recommendations

### Usage Flow
1. User uploads a room photo
2. User clicks "Analyse Image"
3. User enters their Google Gemini API key
4. Image is analyzed by Gemini AI
5. Detailed design recommendations are displayed

## Development

### Installation
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Dependencies
- React 18.3.1
- TypeScript 5.5.3
- Vite 5.4.2
- Google Generative AI 0.21.0
- Framer Motion (animations)
- Tailwind CSS (styling)
- Supabase (backend)

## Migration from Fal.ai
This project was previously using Fal.ai's flux-pro/kontext model for image generation. It has been upgraded to use Google's Gemini AI for image analysis and design recommendations.

### Key Changes
- **Previous**: Fal.ai flux-pro/kontext (image-to-image generation)
- **Current**: Google Gemini 1.5 Pro (image analysis and text recommendations)
- **Benefit**: More detailed, context-aware design recommendations powered by Google's advanced AI

## License
Private

## Contributing
For issues and feature requests, please use the GitHub issue tracker.
