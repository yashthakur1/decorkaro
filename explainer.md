# DecorKaro - Interior Design Website Documentation

## Project Overview

DecorKaro is a modern, responsive website for an interior design studio based in Mumbai, India. The website is built using modern web technologies and focuses on showcasing interior design services and portfolio projects with an elegant, visually appealing interface. The site features smooth animations, responsive design, and a clean aesthetic that aligns with contemporary design trends.

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom configurations
- **UI Components**: shadcn/ui component library
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Query for data fetching and state management

## Project Structure

```
decor-karo/
├── public/              # Static assets
├── src/                 # Source code
│   ├── components/      # Reusable UI components
│   │   ├── ui/          # Base UI components from shadcn
│   │   └── ...          # Custom components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components
│   ├── App.tsx          # Main App component with routing
│   └── main.tsx         # Application entry point
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tailwind.config.ts   # Tailwind CSS configuration
└── vite.config.ts       # Vite configuration
```

## Key Components

### App (App.tsx)

The main application component that sets up routing, global providers, and the application structure. It utilizes React Router for navigation between different pages and includes providers for React Query, tooltips, and toast notifications.

### Pages

1. **Index (src/pages/Index.tsx)**  
   The homepage featuring sections for hero, about, services, portfolio, video showcase, testimonials, and a booking component.

2. **About (src/pages/About.tsx)**  
   Provides detailed information about the design studio, its history, team, and philosophy.

3. **Contact (src/pages/Contact.tsx)**  
   Contact form and information for potential clients to reach out to the studio.

4. **Projects (src/pages/Projects.tsx)**  
   Portfolio showcasing completed interior design projects with filtering options.

5. **Videos (src/pages/Videos.tsx)**  
   Page featuring video content of interior design projects and process videos.

6. **NotFound (src/pages/NotFound.tsx)**  
   Custom 404 page for handling routes that don't exist.

### Main Components

#### Navbar (src/components/Navbar.tsx)

A responsive navigation bar that changes appearance on scroll and adapts to mobile view with a hamburger menu. Features:
- Fixed positioning with smooth background transition on scroll
- Mobile-responsive with animated dropdown menu
- Active link highlighting
- Easy navigation to all main sections

#### Hero (src/components/Hero.tsx)

The main landing section featuring:
- Animated text and image reveal using Framer Motion
- Call-to-action buttons for contact and portfolio
- Modern, clean typography with a large hero image
- Scroll indicator animation

#### Services (src/components/Services.tsx)

Highlights the main services offered by the design studio:
- Residential Design
- Commercial Spaces
- Hospitality Interiors

Each service is presented with:
- Relevant image
- Brief description
- Link to more detailed information

#### Portfolio (src/components/Portfolio.tsx)

Showcases completed projects with an aesthetically pleasing grid layout and hover effects.

#### Booking (src/components/Booking.tsx)

A section for clients to book consultations or inquire about services.

#### Footer (src/components/Footer.tsx)

Contains contact information, links to social media, and additional navigation options.

## Styling Approach

The project uses a well-organized styling approach built on Tailwind CSS with several custom extensions:

1. **Custom Color Palette**  
   Defined in the root CSS variables and tailwind.config.ts, featuring a nature-inspired palette with green primary tones and neutral secondary colors.

2. **Custom Components**  
   Common UI patterns are defined as reusable Tailwind classes (like .section-padding, .glass-card, etc.)

3. **Custom Animations**  
   Both CSS animations and Framer Motion are used for smooth, sophisticated animations throughout the site:
   - Fade-in/slide-up effects for content as it enters the viewport
   - Smooth transitions for interactive elements
   - Parallax scrolling effects for imagery
   - Text and image reveal animations

4. **Responsive Design**  
   The layout adapts seamlessly to different screen sizes using Tailwind's responsive breakpoints.

## Key Features

1. **Modern Design**  
   - Clean, minimalist aesthetic with ample whitespace
   - Typography using Montserrat as the primary font
   - Sophisticated color scheme with natural tones
   - Subtle animations that enhance user experience without being distracting

2. **Performance Optimizations**  
   - Lazy loading animations with Framer Motion
   - Optimized image loading
   - Smooth scrolling behavior

3. **Interactive Elements**  
   - Hover effects on cards and buttons
   - Smooth page transitions
   - Responsive navbar with scroll effects

4. **Accessibility Considerations**  
   - Semantic HTML structure
   - Proper contrast ratios for text readability
   - Keyboard navigation support

## Getting Started

### Development Setup

```bash
# Install dependencies
npm i

# Start development server
npm run dev
```

### Building for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## Deployment

The site can be deployed through Lovable's interface by clicking on Share -> Publish. For custom domains, the project recommends using Netlify as described in the README.

## Future Enhancements

Potential areas for enhancement could include:

1. Adding a blog section for interior design tips and trends
2. Implementing a dark theme option
3. Adding multi-language support for international clients
4. Integrating a CMS for easy content management
5. Adding more interactive elements like 3D room visualizers

## Conclusion

DecorKaro is a sophisticated, modern website that effectively showcases interior design services with a focus on visual appeal and smooth user experience. The codebase is well-structured, utilizing modern front-end technologies and best practices to create a maintainable and extensible website.