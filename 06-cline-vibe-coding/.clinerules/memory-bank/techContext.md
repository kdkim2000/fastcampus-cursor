# Tech Context

## Technologies Used

### Core Framework & Runtime
- **Next.js 15.5.3** - React framework with App Router
- **React 19.1.0** - UI library with modern features
- **TypeScript 5** - Type-safe JavaScript with latest features
- **Node.js** - JavaScript runtime environment

### Development Tools
- **Turbopack** - Fast bundler for development and build
- **ESLint 9** - Code linting and quality enforcement
- **PostCSS** - CSS processing and transformation

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **PostCSS** - CSS processing pipeline

### Type Definitions
- **@types/react** - TypeScript definitions for React
- **@types/react-dom** - TypeScript definitions for React DOM
- **@types/node** - TypeScript definitions for Node.js

## Development Setup

### Project Structure
```
/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── layout.tsx    # Root layout component
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   └── components/       # Reusable components
├── public/               # Static assets
└── .clinerules/         # Project rules and memory bank
```

### Development Commands
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production bundle with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint code quality checks

## Technical Constraints

### Build & Bundle
- Turbopack for fast development builds
- Optimized production bundles
- TypeScript compilation with strict type checking
- CSS processing with Tailwind CSS

### Performance Considerations
- Server-side rendering by default with App Router
- Client-side interactivity with 'use client' directive
- Code splitting and lazy loading where appropriate
- Bundle size optimization

### Development Environment
- TypeScript strict mode enabled
- ESLint configuration for code quality
- Hot module replacement during development
- PostCSS for CSS processing pipeline

## Tool Usage Patterns

### Code Organization
- TypeScript for type safety and better DX (Developer Experience)
- Component-based architecture with React
- App Router for file-based routing
- Reusable components in dedicated directories

### Development Workflow
- Fast development with Turbopack
- Type checking with TypeScript
- Code quality enforcement with ESLint
- Styling with utility-first Tailwind CSS

### Build Process
- Turbopack for optimized builds
- Static generation and server-side rendering
- CSS optimization and processing
- Bundle optimization for production
