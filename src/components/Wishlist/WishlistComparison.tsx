import React, { useState } from 'react';
import { Heart, Compare, X, Star, MapPin, DollarSign, Clock, Users, Check, Minus } from 'lucide-react';

interface WishlistItem {
  id: string;
  type: 'destination' | 'guide' | 'event' | 'activity';
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  features: string[];
  description: string;
}

const WishlistComparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wishlist' | 'comparison'>('wishlist');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  const wishlistItems: WishlistItem[] = [
    {
      id: '1',
      type: 'destination',
      title: 'Sidi Bou Said',
      location: 'North Tunisia',
      price: 180,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/12892812/pexels-photo-12892812.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['UNESCO Heritage', 'Blue & White Architecture', 'Art Galleries', 'Sea Views'],
      description: 'Picturesque blue and white village overlooking the Mediterranean'
    },
    {
      id: '2',
      type: 'destination',
      title: 'Matmata',
      location: 'South Tunisia',
      price: 220,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/11742091/pexels-photo-11742091.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Underground Houses', 'Berber Culture', 'Desert Landscape', 'Star Wars Filming'],
      description: 'Traditional Berber underground homes in the Saharan landscape'
    },
    {
      id: '3',
      type: 'guide',
      title: 'Youssef Khelifi',
      location: 'Sidi Bou Said',
      price: 85,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Cultural Tours', 'Photography', 'Local Cuisine', '8+ Years Experience'],
      description: 'Expert cultural guide specializing in Sidi Bou Said tours'
    },
    {
      id: '4',
      type: 'event',
      title: 'Pottery Workshop',
      location: 'Nabeul',
      price: 65,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1293120/pexels-photo-1293120.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Hands-on Learning', 'Master Craftsmen', 'Take Home Piece', 'Traditional Lunch'],
      description: 'Learn ancient pottery techniques from master craftsmen'
    },
    {
      id: '5',
      type: 'activity',
      title: 'Desert Safari',
      location: 'Douz',
      price: 120,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Camel Riding', 'Sunset Views', 'Berber Camp', 'Traditional Music'],
      description: 'Authentic desert experience with camel trekking and Berber culture'
    },
    {
      id: '6',
      type: 'destination',
      title: 'Kairouan',
      location: 'Central Tunisia',
      price: 160,
      rating: 4.6,
      image: 'https://images.pexels.com/photos/8294641/pexels-photo-8294641.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Holy City', 'Great Mosque', 'Carpet Weaving', 'Islamic Architecture'],
      description: 'Holy city of Islam with magnificent mosques and traditional crafts'
    }
  ];

  const handleItemSelect = (itemId: string) => {
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else if (prev.length < 3) {
        return [...prev, itemId];
      }
      return prev;
    });
  };

  const removeFromWishlist = (itemId: string) => {
    // Handle removing item from wishlist
    console.log('Remove from wishlist:', itemId);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'destination': return '🏛️';
      case 'guide': return '👨‍🏫';
      case 'event': return '🎭';
      case 'activity': return '🎯';
      default: return '📍';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'destination': return 'bg-blue-100 text-blue-700';
      case 'guide': return 'bg-green-100 text-green-700';
      case 'event': return 'bg-purple-100 text-purple-700';
      case 'activity': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const selectedItemsData = wishlistItems.filter(item => selectedItems.includes(item.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Wishlist & 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> Comparison</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Save your favorite destinations, guides, and experiences. Compare them side by side to make the best choice for your journey.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                activeTab === 'wishlist'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Heart className="w-5 h-5" />
              <span className="font-medium">My Wishlist ({wishlistItems.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                activeTab === 'comparison'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Compare className="w-5 h-5" />
              <span className="font-medium">Compare ({selectedItems.length}/3)</span>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              {selectedItems.length > 0 && (
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Compare className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-900">
                        {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected for comparison
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setActiveTab('comparison')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Compare Now
                      </button>
                      <button
                        onClick={() => setSelectedItems([])}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map(item => (
                  <div key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-48">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                          {getTypeIcon(item.type)} {item.type}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 flex space-x-2">
                        <button
                          onClick={() => handleItemSelect(item.id)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                            selectedItems.includes(item.id)
                              ? 'bg-blue-500 text-white'
                              : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                          }`}
                        >
                          <Compare className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs font-medium">{item.rating}</span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>{item.location}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-green-600">{item.price} TND</span>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {wishlistItems.length === 0 && (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
                  <p className="text-gray-600 mb-6">
                    Start exploring and save your favorite destinations, guides, and experiences.
                  </p>
                  <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                    Explore Now
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Comparison Tab */}
          {activeTab === 'comparison' && (
            <div className="space-y-6">
              {selectedItemsData.length === 0 ? (
                <div className="text-center py-12">
                  <Compare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No items selected for comparison</h3>
                  <p className="text-gray-600 mb-6">
                    Go back to your wishlist and select up to 3 items to compare side by side.
                  </p>
                  <button
                    onClick={() => setActiveTab('wishlist')}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Back to Wishlist
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-900 w-48">Features</th>
                        {selectedItemsData.map(item => (
                          <th key={item.id} className="text-center p-4 min-w-64">
                            <div className="space-y-3">
                              <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded-lg" />
                              <div>
                                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                <p className="text-sm text-gray-600">{item.location}</p>
                              </div>
                              <button
                                onClick={() => handleItemSelect(item.id)}
                                className="text-red-500 hover:text-red-700 text-sm"
                              >
                                Remove
                              </button>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="p-4 font-medium text-gray-900">Type</td>
                        {selectedItemsData.map(item => (
                          <td key={item.id} className="p-4 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                              {getTypeIcon(item.type)} {item.type}
                            </span>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-4 font-medium text-gray-900">Price</td>
                        {selectedItemsData.map(item => (
                          <td key={item.id} className="p-4 text-center">
                            <span className="text-lg font-bold text-green-600">{item.price} TND</span>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-4 font-medium text-gray-900">Rating</td>
                        {selectedItemsData.map(item => (
                          <td key={item.id} className="p-4 text-center">
                            <div className="flex items-center justify-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="font-medium">{item.rating}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-4 font-medium text-gray-900">Features</td>
                        {selectedItemsData.map(item => (
                          <td key={item.id} className="p-4">
                            <div className="space-y-2">
                              {item.features.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-2 text-sm">
                                  <Check className="w-4 h-4 text-green-500" />
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-4 font-medium text-gray-900">Description</td>
                        {selectedItemsData.map(item => (
                          <td key={item.id} className="p-4 text-center text-sm text-gray-600">
                            {item.description}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-4 font-medium text-gray-900">Action</td>
                        {selectedItemsData.map(item => (
                          <td key={item.id} className="p-4 text-center">
                            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                              Book Now
                            </button>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistComparison;