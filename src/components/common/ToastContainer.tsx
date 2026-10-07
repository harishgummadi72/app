import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-16 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none font-sans">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#111111] text-[#F8F6F0] px-4 py-3 rounded-xl shadow-2xl border border-zinc-800 flex items-center gap-3 transition-all transform animate-in slide-in-from-right duration-300"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />}
          {toast.type === 'info' && <Info className="w-4 h-4 text-sky-400 shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}

          <p className="text-xs leading-snug flex-1">{toast.message}</p>
        </div>
      ))}
    </div>
  );
};
