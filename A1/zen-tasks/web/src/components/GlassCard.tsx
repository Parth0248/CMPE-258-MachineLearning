import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    id?: string;
}

export const GlassCard = ({ children, className, onClick, id }: GlassCardProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: id || 'temp',
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <motion.div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={clsx('glass-panel p-4 backdrop-blur-md relative overflow-hidden', className)}
            onClick={onClick}
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
            {children}
        </motion.div>
    );
};
