import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, User, Bell, Search, ChevronDown, MapPin, Compass, Award, Users, BookOpen, BarChart3, Home, Settings, LogOut, Heart, Calendar } from 'lucide-react';
import NotificationCenter from '../Notifications/NotificationCenter';
import LanguageSwitch from '../Language/LanguageSwitch';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onAuthRequest?: (mode: 'login' | 'register' | 'reset-password', userType: 'seeker' | 'provider') => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange, onAuthRequest }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
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
      id: 'search', 
      label: 'Search', 
      labelFr: 'Rechercher', 
      labelAr: 'البحث',
      icon: Search,
      description: 'Find destinations, guides, events'
    },
    { 
      id: 'travel-feed', 
      label: 'Travel Feed', 
      labelFr: 'Fil de Voyage', 
      labelAr: 'تغذية السفر',
      icon: Compass,
      description: 'Latest travel updates and content'
    },
    { 
      id: 'plan-trip', 
      label: 'Plan Trip', 
      labelFr: 'Planifier', 
      labelAr: 'خطط رحلة',
      icon: MapPin,
      description: 'Create your perfect journey',
      children: [
        { id: 'itinerary', label: 'With AI', labelFr: 'Avec IA', labelAr: 'مع الذكاء الاصطناعي', description: 'AI-assisted trip planning' },
        { id: 'manual-trip-planner', label: 'Manual Planning', labelFr: 'Planification Manuelle', labelAr: 'التخطيط اليدوي', description: 'Collaborate with local guides' }
      ]
    },
    { 
      id: 'community', 
      label: 'Discover', 
      labelFr: 'Découvrir', 
      labelAr: 'المجتمع',
      icon: BookOpen,
      description: 'Travel guides and insights',
      children: [
        { id: 'blog', label: 'Travel Guide', labelFr: 'Guide de Voyage', labelAr: 'دليل السفر', description: 'Expert travel advice' },
        { id: 'stories', label: 'Stories', labelFr: 'Histoires', labelAr: 'القصص', description: 'Cultural narratives' },
        { id: 'analytics', label: 'Travel Insights', labelFr: 'Analyses de Voyage', labelAr: 'رؤى السفر', description: 'Real-time tourism data' },
        { id: 'events', label: 'Events', labelFr: 'Événements', labelAr: 'الأحداث', description: 'Cultural events and activities' }
      ]
    }
  ];


  const handleDropdownClick = (e: React.MouseEvent, dropdownId: string) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };

  const handleNavigation = (pageId: string) => {
    if (pageId === 'search') {
      onPageChange('search');
    } else if (pageId === 'travel-feed') {
      onPageChange('newsfeed');
    } else {
      onPageChange(pageId);
    }
    setIsMenuOpen(false);
    setActiveDropdown(null);
    setShowProfileMenu(false);
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
                    placeholder="Search"
                    className="border border-gray-300 rounded-lg p-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button type="submit" className="absolute left-2">
                    <Search className="w-4 h-4 text-gray-600" />
                  </button>
                </form>
              ) : (
                <button onClick={() => setIsSearchOpen(true)} className="p-2 rounded-lg hover:bg-gray-100">
                  <Search className="w-5 h-5 text-gray-600" />
                </button>
              )}
            </div>

            {/* Language Switch */}
            <LanguageSwitch variant="header" />

            {/* Wishlist */}
            <button 
              onClick={() => onPageChange('wishlist')}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Heart className="w-5 h-5 text-gray-600" />
            </button>

            {/* Messages */}
            <button 
              onClick={() => onPageChange('messages')}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <MessageCircle className="w-5 h-5 text-gray-600" />
            </button>

            {/* Notification Center */}
            <div className="relative">
              <button onClick={() => setShowNotifications((prev) => !prev)} className="p-2 rounded-lg hover:bg-gray-100">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              {unreadNotifications > 0 && (
                <div className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-xs text-white">
                  {unreadNotifications}
                </div>
              )}
            </div>

            {/* Auth/Profile Section */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <User className="w-5 h-5 text-gray-600" />
                </button>
                {showProfileMenu && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
                    <button
                      onClick={() => handleNavigation('profile')}
                      className="w-full text-left px-4 py-3 hover:bg-green-50 transition-colors"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => handleNavigation('seeker-dashboard')}
                      className="w-full text-left px-4 py-3 hover:bg-green-50 transition-colors"
                    >
                      My Dashboard
                    </button>
                    <button
                      onClick={() => handleNavigation('provider-dashboard')}
                      className="w-full text-left px-4 py-3 hover:bg-green-50 transition-colors"
                    >
                      Provider Dashboard
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={() => setIsLoggedIn(false)}
                      className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onAuthRequest?.('login', 'seeker')}
                  className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-lg transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onAuthRequest?.('register', 'seeker')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Join Now
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-2 space-y-1 max-h-96 overflow-y-auto">
            {navigation.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => handleNavigation(item.id)}
                  className="w-full text-left px-4 py-3 hover:bg-green-50 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className="w-5 h-5 text-gray-600" />
                    <span>{item.label}</span>
                  </div>
                </button>
                {item.children && (
                  <div className="pl-5">
                    {item.children.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => handleNavigation(child.id)}
                        className="w-full text-left px-4 py-3 hover:bg-green-50 transition-colors"
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notification Center */}
      <NotificationCenter 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </header>
  );
};

export default Header;