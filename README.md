# Gymanote: Type-Safe Fitness Tracker

A frontend application designed to manage, track, and structure physical exercise routines. Built with a focus on type safety, scalable component architecture, and predictable state management.

## 🛠 Tech Stack
- **Core:** React, TypeScript
- **State Management:** Redux, Context API, React Query
- **Styling:** Tailwind, CSS, Styled Components

## 🏗 Architecture & Technical Decisions

- **Strict Type Definitions:** Engineered with comprehensive TypeScript interfaces for workout models, ensuring predictable data flow between the UI and local storage. This eliminates runtime errors related to undefined exercise properties.
- **Component Isolation:** UI components are decoupled from business logic. Custom hooks handle data fetching and state mutations, keeping the React tree clean and strictly focused on rendering.
- ** Optimised Rendering:** Implemented memoisation (`useMemo`, `useCallback`) for heavy list renderings (e.g., massive exercise libraries) to prevent unnecessary re-renders during state updates.

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/Riksev/physical-exercises-manager.git

# Install dependencies
npm install

# Start the local development server
npm run dev
