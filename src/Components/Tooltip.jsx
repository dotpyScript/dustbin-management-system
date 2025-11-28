import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

export default function Tooltip({
  children,
  content,
  position = 'right',
  className = '',
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef(null);

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();

      let x = 0;
      let y = 0;

      if (position === 'right') {
        x = rect.right + 16;
        y = rect.top + rect.height / 2;
      } else if (position === 'left') {
        x = rect.left - 16;
        y = rect.top + rect.height / 2;
      } else if (position === 'top') {
        x = rect.left + rect.width / 2;
        y = rect.top - 16;
      } else if (position === 'bottom') {
        x = rect.left + rect.width / 2;
        y = rect.bottom + 16;
      }

      setCoords({ x, y });
    }
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const translateClasses = {
    right: '-translate-y-1/2',
    left: '-translate-y-1/2',
    top: '-translate-x-1/2 -translate-y-full',
    bottom: '-translate-x-1/2',
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className='w-full'
      >
        {children}
      </div>

      {isVisible &&
        createPortal(
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className={`fixed z-[9999] pointer-events-none ${translateClasses[position]}`}
            style={{
              left: `${coords.x}px`,
              top: `${coords.y}px`,
            }}
          >
            <div
              className={`px-3 py-2 bg-hover text-slate-200 rounded-lg whitespace-nowrap text-sm font-semibold ${className}`}
            >
              {content}
            </div>
          </motion.div>,
          document.body
        )}
    </>
  );
}
