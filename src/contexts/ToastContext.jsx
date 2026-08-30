import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            onClick={() => removeToast(toast.id)}
            className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl cursor-pointer
              backdrop-blur-md text-sm font-medium transition-all duration-300 animate-slide-up
              ${toast.type === "success"
                ? "bg-emerald-500/90 text-white"
                : toast.type === "error"
                ? "bg-red-500/90 text-white"
                : "bg-blue-500/90 text-white"
              }`}
          >
            <span>
              {toast.type === "success" ? "✓" : toast.type === "error" ? "✕" : "ℹ"}
            </span>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
