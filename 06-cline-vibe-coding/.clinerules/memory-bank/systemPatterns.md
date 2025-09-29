# System Patterns

## Architecture Overview

### Next.js 13+ App Router Architecture
- File-based routing with hierarchy under `src/app/`
- Layout components for shared UI across route segments
- Server Components by default with Client Components opt-in
- Nested layouts for progressive enhancement of UI

### Component Structure
```
src/
├── app/                    # App Router directory
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx          # Home page component
│   ├── globals.css       # Global styles
│   └── [dynamic]/        # Dynamic routes (e.g., [id])
├── components/           # Reusable components
│   ├── ui/              # Basic UI components
│   └── layout/          # Layout-specific components
└── lib/                 # Utility functions and configurations
```

## Key Technical Decisions

### Routing Strategy
- App Router for modern React patterns
- Nested routes for complex feature hierarchies
- Parallel routes for conditional layouts
- Intercepting routes for modal patterns

### Component Patterns
- Server Components for data fetching and initial render
- Client Components for interactivity and state management
- Component composition over inheritance
- props spreading for flexible APIs

### State Management
- React useState/useReducer for local component state
- Context API for shared state across component tree
- Server state with React Server Components
- Optimistic updates for better UX

## Component Relationships

### Layout Hierarchy
```
Root Layout
├── Navigation Layout
├── Page Content Layout
│   ├── Header Section
│   ├── Main Content
│   │   ├── Feature Components
│   │   └── Interactive Elements
│   └── Footer Section
```

### Data Flow Pattern
1. Server Component fetches data
2. Props passed to children
3. Client Components handle user interactions
4. State updates trigger re-renders
5. Optimistic updates provide instant feedback

## Critical Implementation Paths

### Page Loading Sequence
1. App Router processes request
2. Root layout executes server-side logic
3. Page component fetches required data
4. Components render with data
5. Client-side hydration occurs
6. Interactive components mount

### Error Handling Flow
1. Error boundaries catch client-side errors
2. Server errors trigger error pages
3. 404 routes direct to not-found pages
4. Loading states provide user feedback
5. Graceful degradation ensures basic functionality
