import React, { useState } from 'react';
import { Search, Filter, MapPin, Calendar, Users, Star, DollarSign, Clock, Compass, User, BookOpen, Zap } from 'lucide-react';

interface SearchFilters {
  query: string;
  category: 'all' | 'destinations' | 'guides' | 'events' | 'stories' | 'news';
  location: string;
  dateRange: {
    start: string;
    end: string;
  };
  priceRange: {
    min: number;
    max: number;
  };
  rating: number;
  groupSize: number;
  interests: string[];
}

const AdvancedSearch: React.FC = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: 'all',
    location: '',
    dateRange: { start: '', end: '' },
    priceRange: { min: 0, max: 1000 },
    rating: 0,
    groupSize: 1,
    interests: []
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const categories = [
    { id: 'all', label: 'Everything', icon: Search, description: 'Search across all content' },
    { id: 'destinations', label: 'Destinations', icon: MapPin, description: 'Places to visit' },
    { id: 'guides', label: 'Local Guides', icon: User, description: 'Expert local guides' },
    { id: 'events', label: 'Events', icon: Calendar, description: 'Activities and events' },
    { id: 'stories', label: 'Stories', icon: BookOpen, description: 'Cultural stories' },
    { id: 'news', label: 'Travel News', icon: Zap, description: 'Latest travel updates' }
  ];

  const interests = [
    'Cultural Heritage', 'Nature & Wildlife', 'Adventure Sports', 'Local Cuisine',
    'Arts & Crafts', 'History', 'Beaches', 'Desert', 'Photography', 'Wellness'
  ];

  const locations = [
    'Tunis', 'Sidi Bou Said', 'Carthage', 'Kairouan', 'Matmata', 'Djerba',
    'Sousse', 'Monastir', 'Nabeul', 'Tozeur', 'Douz', 'Chott el Djerid'
  ];

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate search API call
    setTimeout(() => {
      // Mock search results based on category
      const mockResults = generateMockResults(filters.category, filters.query);
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1000);
  };

  const generateMockResults = (category: string, query: string) => {
    const baseResults = {
      destinations: [
        {
          id: '1',
          type: 'destination',
          title: 'Sidi Bou Said',
          description: 'Picturesque blue and white village overlooking the Mediterranean',
          image: 'https://images.pexels.com/photos/12892812/pexels-photo-12892812.jpeg?auto=compress&cs=tinysrgb&w=400',
          rating: 4.8,
          price: 180,
          location: 'North Tunisia'
        },
        {
          id: '2',
          type: 'destination',
          title: 'Matmata',
          description: 'Traditional Berber underground homes in the Saharan landscape',
          image: 'https://images.pexels.com/photos/11742091/pexels-photo-11742091.jpeg?auto=compress&cs=tinysrgb&w=400',
          rating: 4.9,
          price: 220,
          location: 'South Tunisia'
        }
      ],
      guides: [
        {
          id: '1',
          type: 'guide',
          title: 'Youssef Khelifi',
          description: 'Expert cultural guide specializing in Sidi Bou Said tours',
          image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
          rating: 4.9,
          price: 85,
          location: 'Sidi Bou Said',
          specialties: ['Cultural Tours', 'Photography', 'Local Cuisine']
        }
      ],
      events: [
        {
          id: '1',
          type: 'event',
          title: 'Traditional Pottery Workshop',
          description: 'Learn ancient pottery techniques from master craftsmen',
          image: 'https://images.pexels.com/photos/1293120/pexels-photo-1293120.jpeg?auto=compress&cs=tinysrgb&w=400',
          rating: 4.7,
          price: 65,
          location: 'Nabeul',
          date: '2024-02-15'
        }
      ]
    };

    if (category === 'all') {
      return [...baseResults.destinations, ...baseResults.guides, ...baseResults.events];
    }
    
    return baseResults[category as keyof typeof baseResults] || [];
  };

  const toggleInterest = (interest: string) => {
    setFilters(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Discover Your Perfect
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> Travel Experience</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Search across destinations, local guides, events, stories, and travel insights to plan your sustainable journey in Tunisia.
        </p>
      </div>

      {/* Search Interface */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
        {/* Main Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="What are you looking for? (destinations, guides, events...)"
              value={filters.query}
              onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setFilters(prev => ({ ...prev, category: category.id as any }))}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filters.category === category.id
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title={category.description}
              >
                <Icon className="w-4 h-4" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium"
          >
            <Filter className="w-4 h-4" />
            <span>Advanced Filters</span>
          </button>
          
          {filters.interests.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Filters applied:</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                {filters.interests.length} interests
              </span>
            </div>
          )}
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location
                </label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">All locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Date Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={filters.dateRange.start}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      dateRange: { ...prev.dateRange, start: e.target.value }
                    }))}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <input
                    type="date"
                    value={filters.dateRange.end}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      dateRange: { ...prev.dateRange, end: e.target.value }
                    }))}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Price Range (TND)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange.min}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      priceRange: { ...prev.priceRange, min: Number(e.target.value) }
                    }))}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange.max}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      priceRange: { ...prev.priceRange, max: Number(e.target.value) }
                    }))}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Star className="w-4 h-4 inline mr-1" />
                  Minimum Rating
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) => setFilters(prev => ({ ...prev, rating: Number(e.target.value) }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value={0}>Any rating</option>
                  <option value={3}>3+ stars</option>
                  <option value={4}>4+ stars</option>
                  <option value={4.5}>4.5+ stars</option>
                </select>
              </div>

              {/* Group Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-1" />
                  Group Size
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={filters.groupSize}
                  onChange={(e) => setFilters(prev => ({ ...prev, groupSize: Number(e.target.value) }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Interests */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Compass className="w-4 h-4 inline mr-1" />
                Interests
              </label>
              <div className="flex flex-wrap gap-2">
                {interests.map(interest => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filters.interests.includes(interest)
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Search Results ({searchResults.length})
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>Relevance</option>
                <option>Rating</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((result) => (
              <div key={result.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img src={result.image} alt={result.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium capitalize">
                    {result.type}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-medium">{result.rating}</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{result.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{result.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{result.location}</span>
                    </div>
                    <div className="text-green-600 font-semibold">
                      {result.price} TND
                    </div>
                  </div>

                  {result.specialties && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {result.specialties.slice(0, 2).map((specialty: string) => (
                        <span key={specialty} className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {searchResults.length === 0 && filters.query && !isSearching && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
          <button
            onClick={() => setFilters(prev => ({ ...prev, query: '', interests: [] }))}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;