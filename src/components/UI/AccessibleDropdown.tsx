import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Search, X } from 'lucide-react';

interface DropdownOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  group?: string;
}

interface AccessibleDropdownProps {
  options: DropdownOption[];
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  searchable?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  error?: string;
  label: string;
  description?: string;
  required?: boolean;
  className?: string;
  maxHeight?: string;
}

const AccessibleDropdown: React.FC<AccessibleDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  searchable = false,
  multiple = false,
  disabled = false,
  error,
  label,
  description,
  required = false,
  className = '',
  maxHeight = 'max-h-64'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const announcementRef = useRef<HTMLDivElement>(null);

  const dropdownId = useRef(`dropdown-${Math.random().toString(36).substr(2, 9)}`);
  const labelId = useRef(`label-${Math.random().toString(36).substr(2, 9)}`);
  const descriptionId = useRef(`desc-${Math.random().toString(36).substr(2, 9)}`);
  const errorId = useRef(`error-${Math.random().toString(36).substr(2, 9)}`);

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

  // Filter options based on search
  const filteredOptions = searchable && searchQuery
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        option.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  // Group options if they have groups
  const groupedOptions = filteredOptions.reduce((groups, option) => {
    const group = option.group || 'default';
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(option);
    return groups;
  }, {} as Record<string, DropdownOption[]>);

  // Get selected option(s) for display
  const getSelectedDisplay = () => {
    if (multiple && Array.isArray(value)) {
      if (value.length === 0) return placeholder;
      if (value.length === 1) {
        const option = options.find(opt => opt.value === value[0]);
        return option?.label || value[0];
      }
      return `${value.length} selected`;
    } else {
      const option = options.find(opt => opt.value === value);
      return option?.label || placeholder;
    }
  };

  // Handle option selection
  const handleSelect = (optionValue: string) => {
    if (multiple && Array.isArray(value)) {
      const newValue = value.includes(optionValue)
        ? value.filter(v => v !== optionValue)
        : [...value, optionValue];
      onChange(newValue);
      
      // Announce selection to screen readers
      const option = options.find(opt => opt.value === optionValue);
      if (announcementRef.current && option) {
        announcementRef.current.textContent = value.includes(optionValue)
          ? `Removed ${option.label} from selection`
          : `Added ${option.label} to selection`;
      }
    } else {
      onChange(optionValue);
      setIsOpen(false);
      
      // Announce selection to screen readers
      const option = options.find(opt => opt.value === optionValue);
      if (announcementRef.current && option) {
        announcementRef.current.textContent = `Selected ${option.label}`;
      }
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else if (focusedIndex >= 0) {
          handleSelect(filteredOptions[focusedIndex].value);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
        }
        break;
      case 'Home':
        if (isOpen) {
          e.preventDefault();
          setFocusedIndex(0);
        }
        break;
      case 'End':
        if (isOpen) {
          e.preventDefault();
          setFocusedIndex(filteredOptions.length - 1);
        }
        break;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus management
  useEffect(() => {
    if (isOpen && searchable && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Scroll focused option into view
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listRef.current) {
      const focusedElement = listRef.current.children[focusedIndex] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({
          block: 'nearest',
          behavior: reducedMotion ? 'auto' : 'smooth'
        });
      }
    }
  }, [focusedIndex, isOpen, reducedMotion]);

  const isSelected = (optionValue: string) => {
    if (multiple && Array.isArray(value)) {
      return value.includes(optionValue);
    }
    return value === optionValue;
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Screen reader announcements */}
      <div ref={announcementRef} className="sr-only" aria-live="polite" />

      {/* Label */}
      <label
        id={labelId.current}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
      </label>

      {/* Description */}
      {description && (
        <p id={descriptionId.current} className="text-sm text-gray-600 mb-2">
          {description}
        </p>
      )}

      {/* Trigger button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`w-full flex items-center justify-between px-4 py-3 text-left border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
          disabled
            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
            : error
            ? 'border-red-300 bg-red-50'
            : isOpen
            ? 'border-green-500 bg-white'
            : 'border-gray-300 bg-white hover:border-gray-400'
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={labelId.current}
        aria-describedby={`${description ? descriptionId.current : ''} ${error ? errorId.current : ''}`.trim()}
        aria-required={required}
        aria-invalid={!!error}
        id={dropdownId.current}
      >
        <span className={`block truncate ${
          (multiple && Array.isArray(value) && value.length === 0) || (!multiple && !value)
            ? 'text-gray-500'
            : 'text-gray-900'
        }`}>
          {getSelectedDisplay()}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          style={{ transition: reducedMotion ? 'none' : 'transform 200ms ease-in-out' }}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className={`absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg ${maxHeight} overflow-hidden`}
          style={{
            animation: reducedMotion ? 'none' : 'slideDown 200ms ease-out'
          }}
        >
          {/* Search input */}
          {searchable && (
            <div className="p-3 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setFocusedIndex(0);
                  }}
                  placeholder="Search options..."
                  className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  aria-label="Search options"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setFocusedIndex(0);
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Options list */}
          <ul
            ref={listRef}
            className={`${maxHeight} overflow-y-auto`}
            role="listbox"
            aria-labelledby={labelId.current}
            aria-multiselectable={multiple}
          >
            {Object.entries(groupedOptions).map(([groupName, groupOptions]) => (
              <li key={groupName} role="group">
                {groupName !== 'default' && (
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50 border-b border-gray-200">
                    {groupName}
                  </div>
                )}
                {groupOptions.map((option, index) => {
                  const globalIndex = filteredOptions.findIndex(opt => opt.value === option.value);
                  const isFocused = globalIndex === focusedIndex;
                  const selected = isSelected(option.value);
                  
                  return (
                    <li key={option.value} role="presentation">
                      <button
                        type="button"
                        onClick={() => !option.disabled && handleSelect(option.value)}
                        disabled={option.disabled}
                        className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors focus:outline-none ${
                          option.disabled
                            ? 'text-gray-400 cursor-not-allowed'
                            : isFocused
                            ? 'bg-green-50 text-green-900'
                            : selected
                            ? 'bg-green-100 text-green-900'
                            : 'text-gray-900 hover:bg-gray-50'
                        }`}
                        role="option"
                        aria-selected={selected}
                        aria-disabled={option.disabled}
                        tabIndex={-1}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{option.label}</div>
                          {option.description && (
                            <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                          )}
                        </div>
                        {selected && (
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 ml-2" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </li>
            ))}
            
            {filteredOptions.length === 0 && (
              <li className="px-4 py-3 text-gray-500 text-center" role="option" aria-disabled="true">
                {searchQuery ? 'No options match your search' : 'No options available'}
              </li>
            )}
          </ul>

          {/* Multiple selection summary */}
          {multiple && Array.isArray(value) && value.length > 0 && (
            <div className="p-3 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {value.length} item{value.length !== 1 ? 's' : ''} selected
                </span>
                <button
                  onClick={() => onChange([])}
                  className="text-sm text-red-600 hover:text-red-700 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-2 py-1"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error message */}
      {error && (
        <p id={errorId.current} className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {/* Selected items display for multiple selection */}
      {multiple && Array.isArray(value) && value.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {value.map(selectedValue => {
            const option = options.find(opt => opt.value === selectedValue);
            if (!option) return null;
            
            return (
              <span
                key={selectedValue}
                className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
              >
                <span>{option.label}</span>
                <button
                  onClick={() => {
                    const newValue = value.filter(v => v !== selectedValue);
                    onChange(newValue);
                  }}
                  className="text-green-600 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full p-1"
                  aria-label={`Remove ${option.label} from selection`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AccessibleDropdown;