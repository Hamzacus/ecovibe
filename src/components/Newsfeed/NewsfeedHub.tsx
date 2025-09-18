import React, { useState } from 'react';
import { Clock, Star, MapPin, TrendingUp, Leaf, Heart, Share2, Filter, Search, Globe, Calendar, Users, Award, Zap, Eye, MessageCircle, Bookmark } from 'lucide-react';

const NewsfeedHub: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const lastAdded = [
    {
      id: 1,
      title: 'Eco-Lodge in Zaghouan Mountains',
      location: 'Zaghouan, Tunisia',
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800',
      timestamp: '2 hours ago',
      sustainability: ['Solar-Powered', 'Zero Waste', 'Local Sourcing'],
      description: 'Stunning mountain retreat with 100% renewable energy and organic farming',
      carbonSaved: 15.2,
      rating: 4.9,
      isNew: true
    },
    {
      id: 2,
      title: 'Traditional Berber Desert Camp',
      location: 'Douz, Tunisia',
      image: 'https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg?auto=compress&cs=tinysrgb&w=800',
      timestamp: '4 hours ago',
      sustainability: ['Water Conservation', 'Cultural Preservation', 'Plastic-Free'],
      description: 'Authentic desert experience supporting local Berber communities',
      carbonSaved: 8.7,
      rating: 4.8,
      isNew: true
    },
    {
      id: 3,
      title: 'Marine Conservation Center',
      location: 'Monastir, Tunisia',
      image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800',
      timestamp: '6 hours ago',
      sustainability: ['Marine Protection', 'Research Center', 'Educational Tours'],
      description: 'Learn about Mediterranean marine life while supporting conservation',
      carbonSaved: 12.3,
      rating: 4.7,
      isNew: true
    }
  ];

  const topFavorites = [
    {
      id: 1,
      title: 'Sidi Bou Said Eco-Village',
      location: 'Sidi Bou Said, Tunisia',
      image: 'https://images.pexels.com/photos/12892812/pexels-photo-12892812.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      reviews: 342,
      sustainability: ['UNESCO Heritage', 'Local Artisans', 'Green Transport'],
      description: 'Iconic blue and white village with sustainable tourism practices',
      likes: 1250,
      saves: 890
    },
    {
      id: 2,
      title: 'Matmata Underground Homes',
      location: 'Matmata, Tunisia',
      image: 'https://images.pexels.com/photos/11742091/pexels-photo-11742091.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      reviews: 287,
      sustainability: ['Traditional Architecture', 'Energy Efficient', 'Cultural Heritage'],
      description: 'Ancient Berber underground dwellings with minimal environmental impact',
      likes: 980,
      saves: 654
    },
    {
      id: 3,
      title: 'Kairouan Sacred City Tour',
      location: 'Kairouan, Tunisia',
      image: 'https://images.pexels.com/photos/8294641/pexels-photo-8294641.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      reviews: 198,
      sustainability: ['Religious Heritage', 'Walking Tours', 'Local Guides'],
      description: 'Spiritual journey through Islam\'s fourth holiest city',
      likes: 756,
      saves: 432
    }
  ];

  const recentlyVisited = [
    {
      id: 1,
      title: 'Carthage Archaeological Site',
      location: 'Carthage, Tunisia',
      image: 'https://images.pexels.com/photos/11041282/pexels-photo-11041282.jpeg?auto=compress&cs=tinysrgb&w=800',
      visitDate: '3 days ago',
      sustainability: ['Historical Preservation', 'Educational Value'],
      rating: 4.6
    },
    {
      id: 2,
      title: 'Djerba Pottery Workshop',
      location: 'Djerba, Tunisia',
      image: 'https://images.pexels.com/photos/1293120/pexels-photo-1293120.jpeg?auto=compress&cs=tinysrgb&w=800',
      visitDate: '1 week ago',
      sustainability: ['Traditional Crafts', 'Local Economy'],
      rating: 4.8
    },
    {
      id: 3,
      title: 'Tunis Medina Walking Tour',
      location: 'Tunis, Tunisia',
      image: 'https://images.pexels.com/photos/13455377/pexels-photo-13455377.jpeg?auto=compress&cs=tinysrgb&w=800',
      visitDate: '2 weeks ago',
      sustainability: ['Cultural Heritage', 'Walking Tours'],
      rating: 4.5
    }
  ];

  const recommendations = [
    {
      id: 1,
      title: 'Eco-Friendly Olive Farm Stay',
      location: 'Sfax, Tunisia',
      image: 'https://images.pexels.com/photos/4022092/pexels-photo-4022092.jpeg?auto=compress&cs=tinysrgb&w=800',
      aiScore: 95,
      sustainability: ['Organic Farming', 'Solar-Powered', 'Farm-to-Table'],
      description: 'Experience traditional olive harvesting with sustainable practices',
      matchReason: 'Based on your interest in agricultural tourism'
    },
    {
      id: 2,
      title: 'Wildlife Conservation Volunteer',
      location: 'Ichkeul National Park',
      image: 'https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg?auto=compress&cs=tinysrgb&w=800',
      aiScore: 92,
      sustainability: ['Wildlife Protection', 'Research Support', 'Conservation'],
      description: 'Help protect migratory birds in UNESCO Biosphere Reserve',
      matchReason: 'Matches your conservation interests'
    },
    {
      id: 3,
      title: 'Sustainable Fishing Experience',
      location: 'Mahdia, Tunisia',
      image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800',
      aiScore: 88,
      sustainability: ['Sustainable Fishing', 'Marine Conservation', 'Local Community'],
      description: 'Learn traditional fishing methods that protect marine ecosystems',
      matchReason: 'Perfect for your marine interest profile'
    }
  ];

  const ecoNews = [
    {
      id: 1,
      title: 'Tunisia Launches New Marine Protected Areas',
      category: 'Conservation',
      image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800',
      timestamp: '1 day ago',
      excerpt: 'Government announces three new marine reserves to protect Mediterranean biodiversity...',
      likes: 234,
      comments: 45,
      shares: 67
    },
    {
      id: 2,
      title: 'Solar-Powered Hotels Leading Sustainable Tourism',
      category: 'Innovation',
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800',
      timestamp: '2 days ago',
      excerpt: 'Tunisian hospitality sector embraces renewable energy with 50+ solar-powered accommodations...',
      likes: 189,
      comments: 32,
      shares: 54
    },
    {
      id: 3,
      title: 'Traditional Crafts Revival Supports Local Communities',
      category: 'Culture',
      image: 'https://images.pexels.com/photos/1293120/pexels-photo-1293120.jpeg?auto=compress&cs=tinysrgb&w=800',
      timestamp: '3 days ago',
      excerpt: 'UNESCO initiative helps preserve traditional pottery and weaving techniques...',
      likes: 156,
      comments: 28,
      shares: 41
    }
  ];

  const trendingTopics = [
    { id: 1, topic: 'Eco-Lodges Tunisia', posts: 1250, growth: '+15%' },
    { id: 2, topic: 'Sustainable Desert Tours', posts: 890, growth: '+22%' },
    { id: 3, topic: 'Marine Conservation', posts: 654, growth: '+18%' },
    { id: 4, topic: 'Traditional Crafts', posts: 432, growth: '+12%' },
    { id: 5, topic: 'Zero Waste Travel', posts: 321, growth: '+25%' }
  ];

  const sustainabilityTags = [
    'Solar-Powered', 'Zero Waste', 'Local Sourcing', 'Water Conservation',
    'Cultural Preservation', 'Plastic-Free', 'Marine Protection', 'Wildlife Conservation',
    'Organic Farming', 'Traditional Crafts', 'Educational Tours', 'Community Support'
  ];

  const getSustainabilityColor = (tag: string) => {
    const colors: { [key: string]: string } = {
      'Solar-Powered': 'bg-yellow-100 text-yellow-700',
      'Zero Waste': 'bg-green-100 text-green-700',
      'Local Sourcing': 'bg-blue-100 text-blue-700',
      'Water Conservation': 'bg-cyan-100 text-cyan-700',
      'Cultural Preservation': 'bg-purple-100 text-purple-700',
      'Plastic-Free': 'bg-emerald-100 text-emerald-700',
      'Marine Protection': 'bg-teal-100 text-teal-700',
      'Wildlife Conservation': 'bg-indigo-100 text-indigo-700',
      'Organic Farming': 'bg-lime-100 text-lime-700',
      'Traditional Crafts': 'bg-orange-100 text-orange-700',
      'Educational Tours': 'bg-pink-100 text-pink-700',
      'Community Support': 'bg-rose-100 text-rose-700'
    };
    return colors[tag] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 bg-green-100 rounded-full px-4 py-2 mb-4">
          <Globe className="w-5 h-5 text-green-600" />
          <span className="text-sm font-medium text-green-700">EcoVibe Newsfeed</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Discover Sustainable
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> Travel Experiences</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Stay updated with the latest eco-friendly destinations, conservation news, and personalized recommendations for sustainable travel in Tunisia.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search sustainable destinations, experiences, or news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Content</option>
            <option value="destinations">Destinations</option>
            <option value="experiences">Experiences</option>
            <option value="news">Eco News</option>
            <option value="recommendations">AI Recommendations</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Last Added */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Clock className="w-6 h-6 mr-2 text-green-600" />
                Last Added
              </h2>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                View All
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lastAdded.map((item) => (
                <div key={item.id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-48">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {item.isNew && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        NEW
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                      <Leaf className="w-3 h-3 text-green-600" />
                      <span className="text-xs font-medium">{item.carbonSaved}kg CO₂ saved</span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{item.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{item.location}</span>
                      <span className="mx-2">•</span>
                      <span>{item.timestamp}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.sustainability.slice(0, 2).map((tag) => (
                        <span key={tag} className={`px-2 py-1 rounded-full text-xs font-medium ${getSustainabilityColor(tag)}`}>
                          {tag}
                        </span>
                      ))}
                      {item.sustainability.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                          +{item.sustainability.length - 2} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">Save</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span className="text-sm">Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Top Favorites */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Star className="w-6 h-6 mr-2 text-yellow-500" />
                Top Favorites
              </h2>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-6">
              {topFavorites.map((item, index) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/3 relative">
                      <img src={item.image} alt={item.title} className="w-full h-48 md:h-full object-cover" />
                      <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                        <Award className="w-3 h-3" />
                        <span>#{index + 1} Favorite</span>
                      </div>
                    </div>
                    
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">{item.title}</h3>
                          <div className="flex items-center text-gray-500 text-sm mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{item.location}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center mb-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span className="font-medium">{item.rating}</span>
                            <span className="text-gray-500 text-sm ml-1">({item.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.sustainability.map((tag) => (
                          <span key={tag} className={`px-2 py-1 rounded-full text-xs font-medium ${getSustainabilityColor(tag)}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{item.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Bookmark className="w-4 h-4" />
                            <span>{item.saves}</span>
                          </div>
                        </div>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                          Explore
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recently Visited */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Eye className="w-6 h-6 mr-2 text-blue-600" />
                Recently Visited
              </h2>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                View History
              </button>
            </div>
            
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {recentlyVisited.map((item) => (
                <div key={item.id} className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-32">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Recently Visited
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{item.visitDate}</span>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recommended for You */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Zap className="w-6 h-6 mr-2 text-purple-600" />
                Recommended for You
              </h2>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                Refresh
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-48">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                      <Zap className="w-3 h-3" />
                      <span>AI Match {item.aiScore}%</span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{item.location}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                    
                    <div className="bg-purple-50 rounded-lg p-2 mb-3">
                      <p className="text-purple-700 text-xs font-medium">{item.matchReason}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.sustainability.map((tag) => (
                        <span key={tag} className={`px-2 py-1 rounded-full text-xs font-medium ${getSustainabilityColor(tag)}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:shadow-lg transition-all">
                      Explore Recommendation
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Eco News & Updates */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Globe className="w-6 h-6 mr-2 text-green-600" />
                Eco News & Updates
              </h2>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                View All News
              </button>
            </div>
            
            <div className="space-y-6">
              {ecoNews.map((article) => (
                <article key={article.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img src={article.image} alt={article.title} className="w-full h-48 md:h-full object-cover" />
                    </div>
                    
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          {article.category}
                        </span>
                        <span className="text-gray-500 text-sm">{article.timestamp}</span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-green-600 transition-colors cursor-pointer">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4">{article.excerpt}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                            <Heart className="w-4 h-4" />
                            <span>{article.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            <span>{article.comments}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-green-500 transition-colors">
                            <Share2 className="w-4 h-4" />
                            <span>{article.shares}</span>
                          </button>
                        </div>
                        <button className="text-green-600 hover:text-green-700 font-medium">
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Interactive Sustainability Map */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-green-600" />
              Sustainability Map
            </h3>
            
            <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-xl h-64 flex items-center justify-center mb-4">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <p className="text-gray-600 font-medium">Interactive Map</p>
                <p className="text-sm text-gray-500">Explore eco-destinations</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Eco-Lodges</span>
                </div>
                <span className="text-gray-500">24</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Conservation Sites</span>
                </div>
                <span className="text-gray-500">18</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>Cultural Heritage</span>
                </div>
                <span className="text-gray-500">31</span>
              </div>
            </div>
            
            <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
              Explore Map
            </button>
          </div>

          {/* Trending Now */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
              Trending Now
            </h3>
            
            <div className="space-y-3">
              {trendingTopics.map((topic, index) => (
                <div key={topic.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs font-bold text-orange-600">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{topic.topic}</p>
                      <p className="text-xs text-gray-500">{topic.posts} posts</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-green-600">{topic.growth}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sustainability Tags */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Leaf className="w-5 h-5 mr-2 text-green-600" />
              Sustainability Tags
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {sustainabilityTags.map((tag) => (
                <button
                  key={tag}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors hover:scale-105 ${getSustainabilityColor(tag)}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsfeedHub;