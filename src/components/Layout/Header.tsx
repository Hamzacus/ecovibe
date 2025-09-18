import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, User, Bell, Search, ChevronDown, MapPin, Compass, Award, Users, BookOpen, BarChart3, Home } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
      setIsLanguageOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navigation = [
    { 
      id: 'home', 
      label: 'Home', 
      labelFr: 'Accueil', 
      labelAr: 'الرئيسية',
      icon: Home,
      description: 'Discover sustainable travel'
    },
    { 
      id: 'discover', 
      label: 'Discover', 
      labelFr: 'Découvrir', 
      labelAr: 'اكتشف',
      icon: Compass,
      description: 'Explore destinations & insights',
      children: [
        { id: 'analytics', label: 'Travel Insights', labelFr: 'Analyses', labelAr: 'التحليلات', description: 'Real-time tourism data' },
        { id: 'destination-details', label: 'Destinations', labelFr: 'Destinations', labelAr: 'الوجهات', description: 'Explore places' }
      ]
    },
    { 
      id: 'plan', 
      label: 'Plan Trip', 
      labelFr: 'Planifier', 
      labelAr: 'خطط رحلة',
      icon: MapPin,
      description: 'Create your perfect journey'
    },
    { 
      id: 'community', 
      label: 'Community', 
      labelFr: 'Communauté', 
      labelAr: 'المجتمع',
      icon: Users,
      description: 'Connect with travelers',
      children: [
        { id: 'community', label: 'Community Hub', labelFr: 'Hub Communautaire', labelAr: 'مركز المجتمع', description: 'Connect with travelers' },
        { id: 'newsfeed', label: 'Travel Feed', labelFr: 'Actualités', labelAr: 'الأخبار', description: 'Latest travel updates' },
        { id: 'stories', label: 'Local Stories', labelFr: 'Histoires', labelAr: 'القصص', description: 'Cultural narratives' }
      ]
    },
    { 
      id: 'learn', 
      label: 'Learn', 
      labelFr: 'Apprendre', 
      labelAr: 'تعلم',
      icon: BookOpen,
      description: 'Educational content',
      children: [
        { id: 'blog', label: 'Travel Guide', labelFr: 'Guide', labelAr: 'الدليل', description: 'Expert travel advice' },
        { id: 'stories', label: 'Cultural Stories', labelFr: 'Histoires Culturelles', labelAr: 'القصص الثقافية', description: 'Local heritage' }
      ]
    },
    { 
      id: 'rewards', 
      label: 'Rewards', 
      labelFr: 'Récompenses', 
      labelAr: 'المكافآت',
      icon: Award,
      description: 'Track your achievements'
    }
  ];

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'ar', label: 'العربية', flag: '🇹🇳' },
  ];

  const handleDropdownClick = (e: React.MouseEvent, dropdownId: string) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };

  const handleNavigation = (pageId: string) => {
    onPageChange(pageId === 'plan' ? 'itinerary' : pageId);
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">EcoVibe</h1>
              <p className="text-xs text-green-600 -mt-1">Tunisia Travel</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1 relative">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id || 
                (item.children && item.children.some(child => child.id === currentPage));
              
              if (item.children) {
                return (
                  <div key={item.id} className="relative">
                    <button
                      onClick={(e) => handleDropdownClick(e, item.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-green-100 text-green-700 shadow-sm'
                          : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                      }`}
                      aria-expanded={activeDropdown === item.id}
                      aria-haspopup="true"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                      <ChevronDown className={`w-3 h-3 transition-transform ${
                        activeDropdown === item.id ? 'rotate-180' : ''
                      }`} />
                    </button>

                    {activeDropdown === item.id && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                            {item.description}
                          </p>
                        </div>
                        {item.children.map((child) => (
                          <button
                            key={child.id}
                            onClick={() => handleNavigation(child.id)}
                            className="w-full text-left px-4 py-3 hover:bg-green-50 transition-colors group"
                          >
                            <div className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                              {child.label}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {child.description}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-green-100 text-green-700 shadow-sm'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                  title={item.description}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search destinations, guides..."
                    className="w-64 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-2 p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="hidden md:flex p-2 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors"
                  title="Search"
                >
                  <Search size={20} />
                </button>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLanguageOpen(!isLanguageOpen);
                }}
                className="flex items-center space-x-1 p-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                title="Change Language"
              >
                <Globe size={20} />
                <span className="hidden sm:inline text-sm">EN</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setIsLanguageOpen(false)}
                      className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-green-50 transition-colors"
                    >
                      <span>{lang.flag}</span>
                      <span className="text-sm text-gray-700">{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <button className="p-2 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors relative">
              <Bell size={20} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>

            {/* User Profile */}
            <button
              onClick={() => handleNavigation('profile')}
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-green-50 transition-colors"
            >
              <img
                src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-green-200"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">Amina</p>
                <p className="text-xs text-green-600">Level 7</p>
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-2 space-y-1 max-h-96 overflow-y-auto">
            {/* Mobile Search */}
            <div className="py-2 border-b border-gray-100 mb-2">
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search destinations, guides..."
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="ml-2 p-2 text-green-600 hover:text-green-700"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id || 
                (item.children && item.children.some(child => child.id === currentPage));

              if (item.children) {
                return (
                  <div key={item.id} className="space-y-1">
                    <button
                      onClick={(e) => handleDropdownClick(e, `mobile-${item.id}`)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-green-100 text-green-700'
                          : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        activeDropdown === `mobile-${item.id}` ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    {activeDropdown === `mobile-${item.id}` && (
                      <div className="ml-8 space-y-1">
                        {item.children.map((child) => (
                          <button
                            key={child.id}
                            onClick={() => handleNavigation(child.id)}
                            className="w-full text-left px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                          >
                            {child.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;