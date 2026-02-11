import { useDroppable } from '@dnd-kit/core';
import { GlassCard } from './GlassCard';

interface ColumnProps {
    id: string;
    title: string;
    tasks: any[];
}

export const TaskColumn = ({ id, title, tasks }: ColumnProps) => {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div ref={setNodeRef} className="flex-1 min-w-[300px] flex flex-col gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <h2 className="text-xl font-bold text-white mb-2 uppercase tracking-wide opacity-80">{title}</h2>
            <div className="flex flex-col gap-3 min-h-[200px]">
                {tasks.map((task) => (
                    <GlassCard key={task.id} id={task.id} className="cursor-grab active:cursor-grabbing">
                        <h3 className="font-semibold text-white">{task.title}</h3>
                        <p className="text-sm text-white/70 mt-1">{task.description}</p>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
};
