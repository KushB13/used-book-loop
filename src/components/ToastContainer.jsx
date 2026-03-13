import React from 'react';
import useToastStore from '../hooks/useToast';

const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  const getStyles = (type) => {
    switch (type) {
      case 'success': return 'bg-emerald-50 border-emerald-100 text-emerald-700';
      case 'error': return 'bg-rose-50 border-rose-100 text-rose-700';
      case 'warning': return 'bg-amber-50 border-amber-100 text-amber-700';
      default: return 'bg-indigo-50 border-indigo-100 text-indigo-700';
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end space-y-3 pointer-events-none">
      {toasts.map((toast) => (
        <div 
          key={toast.id}
          className={`pointer-events-auto flex items-center space-x-4 px-6 py-4 rounded-2xl border shadow-xl shadow-slate-200/50 animate-in slide-in-from-right-8 fade-in duration-300 min-w-[320px] ${getStyles(toast.type)}`}
        >
          <span className="text-xl flex-shrink-0">{getIcon(toast.type)}</span>
          <p className="font-bold text-sm tracking-tight flex-1">{toast.message}</p>
          <button 
            onClick={() => removeToast(toast.id)}
            className="opacity-40 hover:opacity-100 transition-opacity p-1"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
