import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, X, Globe, User, Bell, Search, Settings, 
  Home, MapPin, Compass, BookOpen, Calendar, MessageCircle,
  ChevronDown, SkipForward
} from 'lucide-react';
import SkipLinks from '../UI/SkipLinks';
import AccessibleDropdown from '../UI/AccessibleDropdown';
import AccessibleTooltip from '../UI/AccessibleTooltip';
import { AccessibilityPanel, useAccessibility } from '../UI/AccessibilityProvider';

interface AccessibleHeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onAuthRequest?: (mode: 'login' | 'register' | 'reset-password', userType: 'seeker' | 'provider') => void;
}

const AccessibleHeader: React.FC<AccessibleHeaderProps> = ({ 
  currentPage, 
  onPageChange, 
  onAuthRequest 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAccessibilityPanel, setShowAccessibilityPanel] = useState(false);
  const [announcements, setAnnouncements] = useState<string[]>([]);
  
  const { settings } = useAccessibility();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const announcementRef = useRef<HTMLDivElement>(null);

  const navigation = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: Home,
      description: 'Return to homepage',
      shortcut: 'Alt+H'
    },
    { 
      id: 'search', 
      label: 'Search', 
      icon: Search,
      description: 'Search destinations and guides',
      shortcut: 'Alt+S'
    },
    { 
      id: 'itinerary', 
      label: 'Plan Trip', 
      icon: MapPin,
      description: 'Plan your sustainable journey',
      shortcut: 'Alt+P'
    },
    { 
      id: 'stories', 
      label: 'Stories', 
      icon: BookOpen,
      description: 'Cultural stories and heritage',
      shortcut: 'Alt+T'
    },
    { 
      id: 'events', 
      label: 'Events', 
      icon: Calendar,
      description: 'Local events and activities',
      shortcut: 'Alt+E'
    },
    { 
      id: 'accessibility-demo', 
      label: 'A11y Demo', 
      icon: Settings,
      description: 'Accessibility demonstration',
      shortcut: 'Alt+D'
    }
  ];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey) {
        switch (e.key.toLowerCase()) {
          case 'h':
            e.preventDefault();
            onPageChange('home');
            announce('Navigated to Home');
            break;
          case 's':
            e.preventDefault();
            setIsSearchOpen(true);
            setTimeout(() => searchInputRef.current?.focus(), 100);
            announce('Search opened');
            break;
          case 'p':
            e.preventDefault();
            onPageChange('itinerary');
            announce('Navigated to Trip Planning');
            break;
          case 'm':
            e.preventDefault();
            setIsMenuOpen(!isMenuOpen);
            announce(isMenuOpen ? 'Menu closed' : 'Menu opened');
            break;
          case 'a':
            e.preventDefault();
            setShowAccessibilityPanel(true);
            announce('Accessibility settings opened');
            break;
        }
      }

      if (e.key === 'Escape') {
        if (isMenuOpen) {
          setIsMenuOpen(false);
          menuButtonRef.current?.focus();
          announce('Menu closed');
        }
        if (isSearchOpen) {
          setIsSearchOpen(false);
          announce('Search closed');
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, isSearchOpen, onPageChange]);

  // Announce changes to screen readers
  const announce = (message: string) => {
    setAnnouncements(prev => [...prev, message]);
    setTimeout(() => {
      setAnnouncements(prev => prev.slice(1));
    }, 1000);
  };

  const handleNavigation = (pageId: string) => {
    onPageChange(pageId);
    setIsMenuOpen(false);
    announce(`Navigated to ${navigation.find(nav => nav.id === pageId)?.label}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onPageChange('search');
      announce(`Searching for: ${searchQuery}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Skip Links */}
      <SkipLinks />

      {/* Live region for announcements */}
      <div ref={announcementRef} className="sr-only" aria-live="polite" aria-atomic="true">
        {announcements.map((announcement, index) => (
          <div key={index}>{announcement}</div>
        ))}
      </div>

      <header 
        className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-green-100"
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('home');
                }}
                className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg p-1"
                aria-label="EcoVibe - Return to homepage"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg" aria-hidden="true">E</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-gray-900">EcoVibe</h1>
                  <p className="text-xs text-green-600 -mt-1">Tunisia Travel</p>
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav 
              className="hidden lg:flex space-x-1"
              role="navigation"
              aria-label="Main navigation"
              id="navigation"
            >
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <AccessibleTooltip
                    key={item.id}
                    content={`${item.description} (${item.shortcut})`}
                    placement="bottom"
                  >
                    <button
                      onClick={() => handleNavigation(item.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                        isActive
                          ? 'bg-green-100 text-green-700 shadow-sm'
                          : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                      aria-describedby={`nav-${item.id}-desc`}
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                      <span>{item.label}</span>
                      <span id={`nav-${item.id}-desc`} className="sr-only">
                        {item.description}. Keyboard shortcut: {item.shortcut}
                      </span>
                    </button>
                  </AccessibleTooltip>
                );
              })}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              {/* Search */}
              <div className="relative">
                {isSearchOpen ? (
                  <form onSubmit={handleSearch} className="flex items-center">
                    <label htmlFor="header-search" className="sr-only">Search</label>
                    <input
                      id="header-search"
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search destinations, guides..."
                      className="border border-gray-300 rounded-lg p-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      aria-describedby="search-help"
                    />
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600" aria-hidden="true" />
                    <div id="search-help" className="sr-only">
                      Type to search and press Enter to submit
                    </div>
                  </form>
                ) : (
                  <AccessibleTooltip content="Open search (Alt+S)">
                    <button 
                      onClick={() => {
                        setIsSearchOpen(true);
                        setTimeout(() => searchInputRef.current?.focus(), 100);
                      }}
                      className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                      aria-label="Open search"
                    >
                      <Search className="w-5 h-5 text-gray-600" aria-hidden="true" />
                    </button>
                  </AccessibleTooltip>
                )}
              </div>

              {/* Accessibility Settings */}
              <AccessibleTooltip content="Accessibility settings (Alt+A)">
                <button
                  onClick={() => setShowAccessibilityPanel(true)}
                  className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Open accessibility settings"
                >
                  <Settings className="w-5 h-5 text-gray-600" aria-hidden="true" />
                </button>
              </AccessibleTooltip>

              {/* Notifications */}
              <AccessibleTooltip content="Notifications">
                <button 
                  className="relative p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Notifications (3 unread)"
                >
                  <Bell className="w-5 h-5 text-gray-600" aria-hidden="true" />
                  <span className="absolute top-0 right-0 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-xs text-white font-medium">
                    3
                  </span>
                  <span className="sr-only">3 unread notifications</span>
                </button>
              </AccessibleTooltip>

              {/* User Menu */}
              <AccessibleTooltip content="User account">
                <button 
                  className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="User account menu"
                  aria-haspopup="true"
                >
                  <User className="w-5 h-5 text-gray-600" aria-hidden="true" />
                </button>
              </AccessibleTooltip>

              {/* Mobile Menu Button */}
              <button
                ref={menuButtonRef}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-gray-600" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-600" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div 
            id="mobile-menu"
            className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-2 space-y-1 max-h-96 overflow-y-auto">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className="w-full text-left px-4 py-3 hover:bg-green-50 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    aria-current={currentPage === item.id ? 'page' : undefined}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-gray-600" aria-hidden="true" />
                      <div>
                        <div className="font-medium text-gray-900">{item.label}</div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Accessibility Panel */}
      <AccessibilityPanel 
        isOpen={showAccessibilityPanel} 
        onClose={() => setShowAccessibilityPanel(false)} 
      />
    </>
  );
};

export default AccessibleHeader;