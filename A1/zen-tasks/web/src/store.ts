import { create } from 'zustand';
import type { Task, TaskStatus } from './types';
import { arrayMove } from '@dnd-kit/sortable';

interface TaskState {
    tasks: Task[];
    addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
    updateTaskStatus: (id: string, status: TaskStatus) => void;
    deleteTask: (id: string) => void;
    moveTask: (activeId: string, overId: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
    tasks: [
        { id: '1', title: 'Design System', description: 'Create glassmorphism token set', status: 'todo', createdAt: Date.now() },
        { id: '2', title: 'API Integration', description: 'Connect Python backend', status: 'in-progress', createdAt: Date.now() },
        { id: '3', title: 'Deploy', description: 'Ship to Firebase', status: 'done', createdAt: Date.now() },
    ],
    addTask: (task) => set((state) => ({
        tasks: [...state.tasks, { ...task, id: crypto.randomUUID(), createdAt: Date.now() }]
    })),
    updateTaskStatus: (id, status) => set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t))
    })),
    deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id)
    })),
    moveTask: (activeId, overId) => set((state) => {
        const oldIndex = state.tasks.findIndex((t) => t.id === activeId);
        const newIndex = state.tasks.findIndex((t) => t.id === overId);
        return { tasks: arrayMove(state.tasks, oldIndex, newIndex) };
    }),
}));
