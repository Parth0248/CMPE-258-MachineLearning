import { useState } from 'react';

import { X, Check } from 'lucide-react';

interface FloatingInputProps {
    onAdd: (title: string, desc: string) => void;
    onCancel: () => void;
}

export const FloatingInput = ({ onAdd, onCancel }: FloatingInputProps) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    return (
        <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
            <div className="glass-panel p-6 w-[350px] shadow-2xl border-white/40">
                <h3 className="text-lg font-bold text-white mb-4">New Zen Task</h3>
                <input
                    autoFocus
                    className="glass-input mb-3"
                    placeholder="Title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    className="glass-input mb-4"
                    placeholder="Description..."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                    <button onClick={onCancel} className="glass-btn hover:bg-red-500/20 text-red-100">
                        <X size={18} />
                    </button>
                    <button onClick={() => title && onAdd(title, desc)} className="glass-btn bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-100 font-bold flex items-center gap-2">
                        <Check size={18} /> Create
                    </button>
                </div>
            </div>
        </div>
    );
};
