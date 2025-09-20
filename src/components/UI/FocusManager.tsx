import React, { useEffect, useRef } from 'react';

interface FocusManagerProps {
  children: React.ReactNode;
  restoreFocus?: boolean;
  autoFocus?: boolean;
  trapFocus?: boolean;
  className?: string;
}

const FocusManager: React.FC<FocusManagerProps> = ({
  children,
  restoreFocus = true,
  autoFocus = false,
  trapFocus = false,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Store the previously focused element
    if (restoreFocus) {
      previousActiveElement.current = document.activeElement as HTMLElement;
    }

    // Auto-focus the first focusable element
    if (autoFocus && containerRef.current) {
      const firstFocusable = containerRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      
      if (firstFocusable) {
        setTimeout(() => firstFocusable.focus(), 100);
      }
    }

    return () => {
      // Restore focus when component unmounts
      if (restoreFocus && previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [autoFocus, restoreFocus]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!trapFocus || e.key !== 'Tab') return;

    const focusableElements = containerRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  };

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      className={className}
    >
      {children}
    </div>
  );
};

export default FocusManager;