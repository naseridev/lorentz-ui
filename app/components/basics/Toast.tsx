import { useState, useEffect, useRef } from 'react';

interface ToastProps {
  content: string;
  className?: string;
  duration?: number;
}

export default function Toast({ content, className, duration = 3000 }: ToastProps) {
  const [visible, setVisible] = useState(false);
  const [toastKey, setToastKey] = useState(0); // Key for forcing re-render
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setToastKey(prevKey => prevKey + 1); // Update key to force re-render

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [content, duration]);

  return (
    <div
      key={toastKey} // Use key to force re-render when content changes
      ref={toastRef}
      className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 p-4 bg-black bg-opacity-70 backdrop-blur-md text-white rounded-xl shadow-lg transition-all duration-700 ease-in-out ${
        visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 z-1000'
      } ${className}`}
    >
      <div className="flex items-center">
        <div className="flex-1">{content}</div>
      </div>
    </div>
  );
}
