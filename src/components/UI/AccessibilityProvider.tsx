import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilitySettings {
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  focusVisible: boolean;
  screenReader: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => void;
  resetSettings: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const defaultSettings: AccessibilitySettings = {
  reducedMotion: false,
  highContrast: false,
  fontSize: 'medium',
  focusVisible: true,
  screenReader: false
};

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);

  // Load settings from localStorage and system preferences
  useEffect(() => {
    const savedSettings = localStorage.getItem('ecovibe-accessibility');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.warn('Failed to parse accessibility settings:', error);
      }
    }

    // Check system preferences
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    
    setSettings(prev => ({
      ...prev,
      reducedMotion: reducedMotionQuery.matches,
      highContrast: highContrastQuery.matches
    }));

    // Listen for changes
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setSettings(prev => ({ ...prev, reducedMotion: e.matches }));
    };

    const handleHighContrastChange = (e: MediaQueryListEvent) => {
      setSettings(prev => ({ ...prev, highContrast: e.matches }));
    };

    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    highContrastQuery.addEventListener('change', handleHighContrastChange);

    return () => {
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
      highContrastQuery.removeEventListener('change', handleHighContrastChange);
    };
  }, []);

  // Apply settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Font size
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px',
      'extra-large': '20px'
    };
    root.style.fontSize = fontSizeMap[settings.fontSize];

    // High contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    // Focus visible
    if (settings.focusVisible) {
      root.classList.add('focus-visible');
    } else {
      root.classList.remove('focus-visible');
    }

    // Save to localStorage
    localStorage.setItem('ecovibe-accessibility', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('ecovibe-accessibility');
  };

  return (
    <AccessibilityContext.Provider value={{ settings, updateSetting, resetSettings }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

// Accessibility settings panel component
export const AccessibilityPanel: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ 
  isOpen, 
  onClose 
}) => {
  const { settings, updateSetting, resetSettings } = useAccessibility();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Accessibility Settings</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              aria-label="Close accessibility settings"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Font Size
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['small', 'medium', 'large', 'extra-large'] as const).map(size => (
                  <button
                    key={size}
                    onClick={() => updateSetting('fontSize', size)}
                    className={`p-3 text-left border rounded-lg transition-colors ${
                      settings.fontSize === size
                        ? 'bg-green-50 border-green-300 text-green-700'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium capitalize">{size.replace('-', ' ')}</div>
                    <div className="text-xs text-gray-500">
                      {size === 'small' && '14px'}
                      {size === 'medium' && '16px (default)'}
                      {size === 'large' && '18px'}
                      {size === 'extra-large' && '20px'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Motion Settings */}
            <div>
              <label className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Reduce Motion</div>
                  <div className="text-sm text-gray-600">Minimize animations and transitions</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.reducedMotion}
                  onChange={(e) => updateSetting('reducedMotion', e.target.checked)}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
              </label>
            </div>

            {/* High Contrast */}
            <div>
              <label className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">High Contrast</div>
                  <div className="text-sm text-gray-600">Increase color contrast for better visibility</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.highContrast}
                  onChange={(e) => updateSetting('highContrast', e.target.checked)}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
              </label>
            </div>

            {/* Focus Indicators */}
            <div>
              <label className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Enhanced Focus</div>
                  <div className="text-sm text-gray-600">Show clear focus indicators</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.focusVisible}
                  onChange={(e) => updateSetting('focusVisible', e.target.checked)}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
              </label>
            </div>

            {/* Screen Reader Mode */}
            <div>
              <label className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Screen Reader Mode</div>
                  <div className="text-sm text-gray-600">Optimize for screen readers</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.screenReader}
                  onChange={(e) => updateSetting('screenReader', e.target.checked)}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
              </label>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200">
            <button
              onClick={resetSettings}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};