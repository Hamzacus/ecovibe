import React, { useEffect, useRef, useState } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  preventScroll?: boolean;
  className?: string;
  actions?: React.ReactNode;
  initialFocus?: React.RefObject<HTMLElement>;
}

const AccessibleModal: React.FC<AccessibleModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  variant = 'default',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  preventScroll = true,
  className = '',
  actions,
  initialFocus
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Focus the modal or initial focus element
      setTimeout(() => {
        if (initialFocus?.current) {
          initialFocus.current.focus();
        } else if (closeButtonRef.current) {
          closeButtonRef.current.focus();
        } else if (modalRef.current) {
          modalRef.current.focus();
        }
      }, 100);
    } else {
      // Return focus to the previously focused element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
  }, [isOpen, initialFocus]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen && preventScroll) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen, preventScroll]);

  // Keyboard event handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape' && closeOnEscape) {
        e.preventDefault();
        onClose();
      }

      // Trap focus within modal
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
          
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === overlayRef.current) {
      onClose();
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'max-w-md';
      case 'md': return 'max-w-lg';
      case 'lg': return 'max-w-2xl';
      case 'xl': return 'max-w-4xl';
      case 'full': return 'max-w-7xl mx-4';
      default: return 'max-w-lg';
    }
  };

  const getVariantIcon = () => {
    switch (variant) {
      case 'success': return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-6 h-6 text-yellow-600" />;
      case 'error': return <AlertCircle className="w-6 h-6 text-red-600" />;
      case 'info': return <Info className="w-6 h-6 text-blue-600" />;
      default: return null;
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'success': return 'border-t-4 border-t-green-500';
      case 'warning': return 'border-t-4 border-t-yellow-500';
      case 'error': return 'border-t-4 border-t-red-500';
      case 'info': return 'border-t-4 border-t-blue-500';
      default: return '';
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 overflow-y-auto"
      onClick={handleOverlayClick}
      style={{
        animation: reducedMotion ? 'none' : 'fadeIn 200ms ease-out'
      }}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
      
      {/* Modal container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={modalRef}
          className={`relative w-full ${getSizeClasses()} bg-white rounded-2xl shadow-2xl ${getVariantClasses()} ${className}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby={description ? "modal-description" : undefined}
          tabIndex={-1}
          style={{
            animation: reducedMotion ? 'none' : 'slideUp 200ms ease-out'
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-gray-200">
            <div className="flex items-start space-x-3">
              {getVariantIcon()}
              <div>
                <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
                  {title}
                </h2>
                {description && (
                  <p id="modal-description" className="mt-1 text-sm text-gray-600">
                    {description}
                  </p>
                )}
              </div>
            </div>
            
            {showCloseButton && (
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            {children}
          </div>

          {/* Actions */}
          {actions && (
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              {actions}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default AccessibleModal;