import React, { useState } from 'react';
import { MapPin, Calendar, Heart, Star, Clock, Users, Bookmark, TrendingUp, Plus, MessageCircle } from 'lucide-react';

const SeekerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Trips Planned', value: '8', change: '+2 this month', icon: MapPin, color: 'text-green-600' },
    { label: 'Wishlist Items', value: '24', change: '+5 this week', icon: Heart, color: 'text-red-600' },
    { label: 'Reviews Written', value: '12', change: '+3 this month', icon: Star, color: 'text-yellow-600' },
    { label: 'CO₂ Saved', value: '145kg', change: '+22kg this month', icon: TrendingUp, color: 'text-blue-600' }
  ];

  const upcomingTrips = [
    {
      id: '1',
      destination: 'Sidi Bou Said',
      date: '2024-02-15',
      guide: 'Youssef Khelifi',
      status: 'confirmed',
      image: 'https://images.pexels.com/photos/12892812/pexels-photo-12892812.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      destination: 'Kairouan',
      date: '2024-02-22',
      guide: 'Salma Jemli',
      status: 'pending',
      image: 'https://images.pexels.com/photos/8294641/pexels-photo-8294641.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const wishlistItems = [
    {
      id: '1',
      title: 'Traditional Pottery Workshop',
      location: 'Nabeul',
      price: 65,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1293120/pexels-photo-1293120.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      title: 'Desert Safari Experience',
      location: 'Douz',
      price: 120,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: MapPin },
    { id: 'trips', label: 'My Trips', icon: Calendar },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'messages', label: 'Messages', icon: MessageCircle }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Travel Dashboard</h1>
          <p className="text-gray-600">Plan and manage your sustainable travel experiences</p>
        </div>
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Plan New Trip</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <div>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-xs text-green-600 mt-1">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-green-600 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Upcoming Trips */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Trips</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {upcomingTrips.map(trip => (
                    <div key={trip.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-32 relative">
                        <img src={trip.image} alt={trip.destination} className="w-full h-full object-cover" />
                        <div className="absolute top-3 right-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            trip.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {trip.status}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{trip.destination}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{trip.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{trip.guide}</span>
                          </div>
                        </div>
                        <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wishlist Preview */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Wishlist Items</h3>
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                    View All
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {wishlistItems.map(item => (
                    <div key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-32 relative">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        <button className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                          <Heart className="w-4 h-4 fill-current text-red-500" />
                        </button>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-1 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{item.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{item.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-lg font-bold text-green-600">{item.price} TND</span>
                          <button className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700 transition-colors text-sm">
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Other tabs content would go here */}
          {activeTab !== 'overview' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {tabs.find(t => t.id === activeTab)?.icon && 
                  React.createElement(tabs.find(t => t.id === activeTab)!.icon, { className: "w-8 h-8 text-gray-400" })
                }
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{tabs.find(t => t.id === activeTab)?.label}</h3>
              <p className="text-gray-600">This section is under development.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeekerDashboard;