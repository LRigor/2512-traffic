"use client";

import { useToast } from "@/contexts/ToastContext";
import { ToastType } from "@/contexts/ToastContext";

const toastStyles: Record<ToastType, string> = {
  success: "bg-green-600 border-green-700",
  failed: "bg-red-600 border-red-700",
  info: "bg-blue-600 border-blue-700",
  warning: "bg-yellow-600 border-yellow-700",
};

const toastIcons: Record<ToastType, string> = {
  success: "✓",
  failed: "✕",
  info: "ℹ",
  warning: "⚠",
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-md shadow-lg text-white font-medium min-w-[300px] max-w-md border-l-4 cursor-pointer hover:opacity-90 transition-opacity animate-in slide-in-from-top-5 fade-in ${toastStyles[toast.type]}`}
          onClick={() => removeToast(toast.id)}
          role="alert"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">{toastIcons[toast.type]}</span>
            <span>{toast.message}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
