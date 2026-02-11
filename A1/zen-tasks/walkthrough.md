# ZenTasks Application Walkthrough

## Overview
ZenTasks is a modern, minimalist task management application designed to boost productivity with a calm, glassmorphic interface.

## User Flow

### 1. Dashboard
- **Kanban Board**: The main view presents tasks in three columns: "Todo", "In Progress", and "Done".
- **Drag and Drop**: Users can intuitively move tasks between columns to update their status.
- **Micro-interactions**: Smooth animations provide feedback during interactions.

### 2. Task Management
- **Create Task**: A floating action button allows quick creation of new tasks.
- **Edit/Delete**: Tasks can be edited or removed directly from the card interface.

### 3. Glassmorphic Design
- The UI features translucent backgrounds, blurred overlays, and subtle gradients to create a premium, depth-rich aesthetic.

## Architecture

### Frontend
- **React**: Component-based UI library.
- **TypeScript**: Ensures type safety and better developer experience.
- **Vite**: Fast build tool and dev server.
- **Tailwind CSS v4**: Utility-first styling for rapid UI development.
- **Framer Motion**: Powerful animation library for drag-and-drop and layout transitions.

### Backend (Optional)
- **FastAPI (Python)**: High-performance backend API.
- **Firebase**: hosting and optional real-time database capabilities.

## Code Highlights
- `web/src/components/TaskCard.tsx`: Reusable component for individual tasks with glassmorphic styling.
- `web/src/App.tsx`: Main application router and layout.
