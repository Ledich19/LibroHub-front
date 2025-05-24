"use client"

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';

type ToastType = 'error' | 'success' | 'warning' | 'info';
type ToastPosition = 'top' | 'bottom' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

interface ToastOptions {
  message: string;
  type?: ToastType;
  position?: ToastPosition;
  duration?: number;
}

interface ToastContextValue {
  showToast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};

const Toast: React.FC<ToastOptions & { onClose: () => void }> = ({
  message,
  type = 'info',
  position = 'top',
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const positionClass = {
    top: 'toast-top',
    bottom: 'toast-bottom',
    'top-start': 'toast-top-start',
    'top-end': 'toast-top-end',
    'bottom-start': 'toast-bottom-start',
    'bottom-end': 'toast-bottom-end',
  }[position] || 'toast-top';

  const typeClass = {
    error: 'alert-error',
    success: 'alert-success',
    warning: 'alert-warning',
    info: 'alert-info',
  }[type] || 'alert-info';

  return (
    <div className={`toast ${positionClass} `}>
      <div className={`alert ${typeClass}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastOptions | null>(null);

  const showToast = useCallback((options: ToastOptions) => {
    setToast(options);
  }, []);

  const handleClose = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast {...toast} onClose={handleClose} />}
    </ToastContext.Provider>
  );
};

export default ToastProvider;