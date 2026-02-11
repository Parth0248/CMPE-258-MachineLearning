import { useState } from 'react';
import { GlassCard } from './components/GlassCard';
import { TaskColumn } from './components/TaskColumn';
import { FloatingInput } from './components/FloatingInput';
import { useTaskStore } from './store';
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor, type DragEndEvent, type DragStartEvent } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { Plus, Settings, Sun } from 'lucide-react';
import { createPortal } from 'react-dom';

function App() {
  const { tasks, addTask, moveTask, updateTaskStatus } = useTaskStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showInput, setShowInput] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8,
    },
  }));

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const activeTask = tasks.find(t => t.id === active.id);
    const overTask = tasks.find(t => t.id === over.id);
    const overContainerId = over.id as string;

    if (!activeTask) return;

    // Determine new status
    let newStatus = activeTask.status;
    if (overContainerId === 'todo' || overContainerId === 'in-progress' || overContainerId === 'done') {
      newStatus = overContainerId;
    } else if (overTask) {
      newStatus = overTask.status;
    }

    if (newStatus !== activeTask.status) {
      updateTaskStatus(activeTask.id, newStatus);
    }

    if (active.id !== over.id) {
      moveTask(active.id as string, over.id as string);
    }
  };

  const columns = ['todo', 'in-progress', 'done'] as const;

  return (
    <div className="min-h-screen p-8 text-white font-sans selection:bg-pink-500/30">
      <header className="flex justify-between items-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
          ZEN TASKS
        </h1>
        <div className="flex gap-4">
          <button className="glass-btn p-3 rounded-full hover:rotate-90 transition-transform">
            <Settings size={20} />
          </button>
          <button className="glass-btn p-3 rounded-full hover:scale-110 transition-transform">
            <Sun size={20} />
          </button>
        </div>
      </header>

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {columns.map((col) => (
            <SortableContext key={col} items={tasks.filter(t => t.status === col).map(t => t.id)}>
              <TaskColumn
                id={col}
                title={col.replace('-', ' ')}
                tasks={tasks.filter(t => t.status === col)}
              />
            </SortableContext>
          ))}
        </div>

        {createPortal(
          <DragOverlay>
            {activeId ? (
              <GlassCard className="cursor-grabbing rotate-3 scale-105 shadow-2xl bg-white/40">
                <h3 className="font-bold">{tasks.find(t => t.id === activeId)?.title}</h3>
              </GlassCard>
            ) : null}
          </DragOverlay>,
          document.body
        )}
      </DndContext>

      <button
        onClick={() => setShowInput(true)}
        className="fixed bottom-8 right-8 p-4 glass-btn rounded-full bg-indigo-500/80 hover:bg-indigo-400 border-indigo-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
      >
        <Plus size={32} />
      </button>

      {showInput && (
        <FloatingInput
          onAdd={(t, d) => { addTask({ title: t, description: d, status: 'todo' }); setShowInput(false); }}
          onCancel={() => setShowInput(false)}
        />
      )}
    </div>
  );
}

export default App;
