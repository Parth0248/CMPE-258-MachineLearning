import { useDroppable } from '@dnd-kit/core';
import { GlassCard } from './GlassCard';
import { Trash2 } from 'lucide-react';

interface ColumnProps {
    id: string;
    title: string;
    tasks: any[];
    onDelete: (id: string) => void;
}

export const TaskColumn = ({ id, title, tasks, onDelete }: ColumnProps) => {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div ref={setNodeRef} className="flex-1 min-w-[300px] flex flex-col gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <h2 className="text-xl font-bold text-white mb-2 uppercase tracking-wide opacity-80">{title}</h2>
            <div className="flex flex-col gap-3 min-h-[200px]">
                {tasks.map((task) => (
                    <GlassCard key={task.id} id={task.id} className="cursor-grab active:cursor-grabbing relative group pr-8">
                        <h3 className="font-semibold text-white">{task.title}</h3>
                        <p className="text-sm text-white/70 mt-1">{task.description}</p>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(task.id);
                            }}
                            onPointerDown={(e) => e.stopPropagation()}
                            className="absolute top-2 right-2 p-1.5 rounded-full text-white/40 hover:text-red-400 hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all"
                        >
                            <Trash2 size={16} />
                        </button>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
};
