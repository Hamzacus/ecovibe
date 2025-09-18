import React, { useState, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇹🇳' },
  { code: 'tn', name: 'Darja Tounsiya', nativeName: 'دارجة تونسية', flag: '🇹🇳' }
];

interface LanguageSwitchProps {
  className?: string;
  variant?: 'header' | 'footer' | 'settings';
}

const LanguageSwitch: React.FC<LanguageSwitchProps> = ({ 
  className = '', 
  variant = 'header' 
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('ecovibe-language');
    if (savedLanguage) {
      const lang = languages.find(l => l.code === savedLanguage);
      if (lang) {
        setCurrentLanguage(lang);
        applyLanguage(lang);
      }
    }
  }, []);

  const applyLanguage = (language: Language) => {
    // Save to localStorage
    localStorage.setItem('ecovibe-language', language.code);
    
    // Apply RTL for Arabic languages
    if (language.code === 'ar' || language.code === 'tn') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = language.code;
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = language.code;
    }

    // Here you would typically trigger your translation system
    // For now, we'll just update the state
    setCurrentLanguage(language);
    setIsOpen(false);
  };

  const handleLanguageChange = (language: Language) => {
    applyLanguage(language);
  };

  if (variant === 'settings') {
    return (
      <div className={`space-y-3 ${className}`}>
        <label className="block text-sm font-medium text-gray-700">Language / اللغة</label>
        <div className="grid grid-cols-2 gap-3">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                currentLanguage.code === language.code
                  ? 'bg-green-50 border-green-300 text-green-700'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">{language.flag}</span>
              <div className="text-left">
                <div className="font-medium text-gray-900">{language.nativeName}</div>
                <div className="text-xs text-gray-500">{language.name}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
          variant === 'header' 
            ? 'text-gray-600 hover:text-green-600 hover:bg-green-50' 
            : 'text-gray-400 hover:text-gray-600'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLanguage.flag}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                Choose Language / اختر اللغة
              </p>
            </div>
            
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                  currentLanguage.code === language.code ? 'bg-green-50 text-green-700' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <div className="flex-1">
                  <div className="font-medium">{language.nativeName}</div>
                  <div className="text-xs text-gray-500">{language.name}</div>
                </div>
                {currentLanguage.code === language.code && (
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </button>
            ))}
            
            <div className="px-4 py-2 border-t border-gray-100 mt-2">
              <p className="text-xs text-gray-500">
                More languages coming soon
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitch;