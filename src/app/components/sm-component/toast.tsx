import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  visible: boolean;
}

export function Toast({ message, visible }: ToastProps) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 
                    text-white/90 px-5 py-4 rounded-xl shadow-lg animate-slide-up backdrop-blur-sm">
      <CheckCircle className="w-5 h-5" />
      <span className="font-medium">{message}</span>
    </div>
  );
}