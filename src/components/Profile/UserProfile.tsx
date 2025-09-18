import React, { useState } from 'react';
import { User, Settings, Camera, Edit3, MapPin, Calendar, Award, Leaf, Users, Star, Heart, Share2, Download, Bell, Lock, Globe, CreditCard, HelpCircle, LogOut } from 'lucide-react';
import { currentUser, achievements } from '../../data/mockData';

interface UserProfileProps {
  onBack: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: '+216 98 123 456',
    location: 'Tunis, Tunisia',
    bio: 'Passionate about sustainable travel and cultural preservation. Love exploring Tunisia\'s hidden gems while supporting local communities.',
    interests: currentUser.preferences.interests,
    languages: currentUser.preferences.languages,
    travelStyle: currentUser.preferences.travelStyle
  });

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: true
    },
    privacy: {
      profileVisibility: 'public',
      showTravelHistory: true,
      showAchievements: true,
      allowMessages: true
    },
    preferences: {
      language: 'en',
      currency: 'TND',
      units: 'metric',
      theme: 'light'
    }
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'travel-history', label: 'Travel History', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const travelHistory = [
    {
      id: 1,
      destination: 'Sidi Bou Said',
      date: 'March 2024',
      duration: '3 days',
      rating: 5,
      image: 'https://images.pexels.com/photos/12892812/pexels-photo-12892812.jpeg?auto=compress&cs=tinysrgb&w=400',
      carbonSaved: 15.2,
      localSpent: 450
    },
    {
      id: 2,
      destination: 'Kairouan',
      date: 'February 2024',
      duration: '2 days',
      rating: 5,
      image: 'https://images.pexels.com/photos/8294641/pexels-photo-8294641.jpeg?auto=compress&cs=tinysrgb&w=400',
      carbonSaved: 12.8,
      localSpent: 320
    },
    {
      id: 3,
      destination: 'Matmata',
      date: 'January 2024',
      duration: '4 days',
      rating: 4,
      image: 'https://images.pexels.com/photos/11742091/pexels-photo-11742091.jpeg?auto=compress&cs=tinysrgb&w=400',
      carbonSaved: 22.5,
      localSpent: 680
    }
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
        >
          <span>←</span>
          <span>Back to Dashboard</span>
        </button>
        
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Share2 className="w-4 h-4" />
            <span>Share Profile</span>
          </button>
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl text-white p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="relative">
            <img 
              src={currentUser.avatar} 
              alt="Profile" 
              className="w-32 h-32 rounded-full border-4 border-white/30"
            />
            <button className="absolute bottom-2 right-2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <Camera className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{currentUser.name}</h1>
            <p className="text-green-100 mb-4">Cultural Explorer • Level {currentUser.level}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{currentUser.points.toLocaleString()}</div>
                <div className="text-green-100 text-sm">Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{currentUser.carbonSaved}kg</div>
                <div className="text-blue-100 text-sm">CO₂ Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{currentUser.tripsCompleted}</div>
                <div className="text-purple-100 text-sm">Trips</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{achievements.filter(a => a.unlocked).length}</div>
                <div className="text-yellow-100 text-sm">Badges</div>
              </div>
            </div>
          </div>
        </div>
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
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                <button
                  onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Basic Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900">{profileData.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900">{profileData.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900">{profileData.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.location}
                          onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                          {profileData.location}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">About Me</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    {isEditing ? (
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                      />
                    ) : (
                      <p className="text-gray-600 leading-relaxed">{profileData.bio}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Travel Interests</label>
                    <div className="flex flex-wrap gap-2">
                      {profileData.interests.map((interest) => (
                        <span 
                          key={interest}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                        >
                          {interest.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                    <div className="flex flex-wrap gap-2">
                      {profileData.languages.map((language) => (
                        <span 
                          key={language}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">My Achievements</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-br from-green-50 to-blue-50 border-green-300 hover:shadow-lg' 
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`text-4xl mb-3 ${achievement.unlocked ? '' : 'grayscale'}`}>
                        {achievement.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          achievement.unlocked 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {achievement.category}
                        </span>
                        <span className="font-medium text-purple-600">
                          {achievement.points} pts
                        </span>
                      </div>

                      {achievement.unlocked && achievement.unlockedDate && (
                        <div className="mt-3 pt-3 border-t border-green-200">
                          <p className="text-xs text-green-600">
                            Unlocked {achievement.unlockedDate.toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Travel History Tab */}
          {activeTab === 'travel-history' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Travel History</h2>
                <div className="text-sm text-gray-600">
                  {travelHistory.length} trips completed
                </div>
              </div>

              <div className="space-y-6">
                {travelHistory.map((trip) => (
                  <div key={trip.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img 
                          src={trip.image} 
                          alt={trip.destination}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">{trip.destination}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{trip.date}</span>
                              </div>
                              <span>•</span>
                              <span>{trip.duration}</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`w-4 h-4 ${star <= trip.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-4">
                          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                            <div className="flex items-center space-x-2 mb-2">
                              <Leaf className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-medium text-gray-700">Carbon Saved</span>
                            </div>
                            <div className="text-lg font-bold text-green-600">{trip.carbonSaved}kg CO₂</div>
                          </div>
                          
                          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <div className="flex items-center space-x-2 mb-2">
                              <Users className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-medium text-gray-700">Local Support</span>
                            </div>
                            <div className="text-lg font-bold text-blue-600">{trip.localSpent} TND</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">Add to Favorites</span>
                          </button>
                          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                            <Share2 className="w-4 h-4" />
                            <span className="text-sm">Share Experience</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>

              {/* Notifications */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Bell className="w-6 h-6 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                </div>
                
                <div className="space-y-4">
                  {Object.entries(settings.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {key === 'email' && 'Receive email notifications about your trips and achievements'}
                          {key === 'push' && 'Get push notifications on your device'}
                          {key === 'sms' && 'Receive SMS notifications for important updates'}
                          {key === 'marketing' && 'Get updates about new features and destinations'}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Privacy */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Lock className="w-6 h-6 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Privacy</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
                    <select
                      value={settings.privacy.profileVisibility}
                      onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="public">Public</option>
                      <option value="friends">Friends Only</option>
                      <option value="private">Private</option>
                    </select>
                  </div>

                  {Object.entries(settings.privacy).slice(1).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value as boolean}
                          onChange={(e) => handleSettingChange('privacy', key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Globe className="w-6 h-6 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select
                      value={settings.preferences.language}
                      onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                      <option value="ar">العربية</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <select
                      value={settings.preferences.currency}
                      onChange={(e) => handleSettingChange('preferences', 'currency', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="TND">Tunisian Dinar (TND)</option>
                      <option value="EUR">Euro (EUR)</option>
                      <option value="USD">US Dollar (USD)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Units</label>
                    <select
                      value={settings.preferences.units}
                      onChange={(e) => handleSettingChange('preferences', 'units', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="metric">Metric</option>
                      <option value="imperial">Imperial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                    <select
                      value={settings.preferences.theme}
                      onChange={(e) => handleSettingChange('preferences', 'theme', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Account Actions */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Actions</h3>
                
                <div className="space-y-4">
                  <button className="flex items-center space-x-3 w-full p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <div>
                      <h4 className="font-medium text-gray-900">Payment Methods</h4>
                      <p className="text-sm text-gray-600">Manage your payment methods and billing</p>
                    </div>
                  </button>

                  <button className="flex items-center space-x-3 w-full p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <HelpCircle className="w-5 h-5 text-gray-600" />
                    <div>
                      <h4 className="font-medium text-gray-900">Help & Support</h4>
                      <p className="text-sm text-gray-600">Get help with your account and trips</p>
                    </div>
                  </button>

                  <button className="flex items-center space-x-3 w-full p-4 text-left border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-red-600">
                    <LogOut className="w-5 h-5" />
                    <div>
                      <h4 className="font-medium">Sign Out</h4>
                      <p className="text-sm text-red-500">Sign out of your account</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;