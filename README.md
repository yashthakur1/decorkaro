# Decorkaro - AI-Powered Interior Design Platform

## Overview
Decorkaro is an interior design platform featuring AI-powered room redesign using Google's Gemini AI image generation technology (Nano Banana 🍌).

## Features
- **AI Room Redesign**: Upload photos of your room and get AI-generated redesigns
- **Powered by Gemini 2.5 Flash Image**: Uses Google's "Nano Banana" image generation for fast, high-quality results
- **Image-to-Image Transformation**: Maintains room structure while upgrading design elements
- **User-friendly Interface**: Simple upload and generation workflow
- **Secure API Key Management**: Users provide their own Google Gemini API keys

## AI Integration - Gemini Image Generation (Nano Banana)

### Setup
1. Get your Google Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Install dependencies:
   ```bash
   npm install
   ```

### How It Works
The AI-powered room redesign feature uses Google's **Gemini 2.5 Flash Image** model (aka Nano Banana 🍌) to:
1. Analyze uploaded room images
2. Generate a redesigned version of the room with premium aesthetics
3. Maintain the room's structure while upgrading:
   - Wall colors and textures
   - Flooring materials
   - Furniture style and placement
   - Lighting fixtures
   - Decor elements and accessories

### API Key Configuration
- API keys are provided by users at runtime through the web interface
- No server-side API key storage required
- Keys are used directly in the client for Gemini API calls

### Technical Details
- **Package**: `@google/genai` (v1.30.0)
- **Model**: `gemini-2.5-flash-image`
- **Implementation**: `/src/components/sections/AIAnalysisSection.tsx`
- **Image Processing**: Converts uploaded images to base64 for Gemini API
- **Response**: Returns generated room redesign image + optional text description
- **Response Modalities**: TEXT and IMAGE

### Usage Flow
1. User uploads a room photo
2. User clicks "Generate Redesign"
3. User enters their Google Gemini API key
4. Image is processed by Gemini 2.5 Flash Image (Nano Banana)
5. AI-generated room redesign is displayed

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

## Migration History
This project has evolved through several AI integrations:

### Key Changes
1. **Initial**: Fal.ai flux-pro/kontext (image-to-image generation)
2. **v2**: Google Gemini 1.5 Pro (text-based analysis and recommendations)
3. **Current**: Google Gemini 2.5 Flash Image - Nano Banana 🍌 (AI image generation)

### Benefits
- **Fast Generation**: Flash model provides quick image generation
- **Better Quotas**: Improved rate limits compared to Pro models
- **Image Output**: Returns actual redesigned room images, not just text
- **Cost Effective**: Optimized pricing for image generation tasks

## License
Private

## Contributing
For issues and feature requests, please use the GitHub issue tracker.
