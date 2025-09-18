import React, { useState } from 'react';
import { ArrowLeft, MapPin, Star, Clock, Users, Leaf, Camera, Heart, Share2, Calendar, Thermometer, Mountain, Waves, Sun, Cloud, Wind, Eye, TrendingUp, Award, Shield, Info } from 'lucide-react';
import { destinations, localGuides } from '../../data/mockData';

interface DestinationDetailsProps {
  destinationId: string;
  onBack: () => void;
}

const DestinationDetails: React.FC<DestinationDetailsProps> = ({ destinationId, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const destination = destinations.find(d => d.id === destinationId);
  const availableGuides = localGuides.filter(guide => 
    guide.location === destination?.name || 
    guide.location.includes(destination?.name || '')
  );

  if (!destination) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Destination Not Found</h2>
        <button onClick={onBack} className="text-green-600 hover:text-green-700">
          ← Back to Destinations
        </button>
      </div>
    );
  }

  const galleryImages = [
    destination.image,
    'https://images.pexels.com/photos/12892812/pexels-photo-12892812.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/11742091/pexels-photo-11742091.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/8294641/pexels-photo-8294641.jpeg?auto=compress&cs=tinysrgb&w=800'
  ];

  const weatherData = {
    current: { temp: 24, condition: 'Sunny', humidity: 65, wind: 12 },
    forecast: [
      { day: 'Today', high: 26, low: 18, condition: 'sunny' },
      { day: 'Tomorrow', high: 28, low: 20, condition: 'partly-cloudy' },
      { day: 'Wed', high: 25, low: 17, condition: 'cloudy' },
      { day: 'Thu', high: 27, low: 19, condition: 'sunny' }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'activities', label: 'Activities', icon: Mountain },
    { id: 'guides', label: 'Local Guides', icon: Users },
    { id: 'reviews', label: 'Reviews', icon: Star }
  ];

  const getCrowdLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'partly-cloudy': return <Cloud className="w-5 h-5 text-gray-500" />;
      case 'cloudy': return <Cloud className="w-5 h-5 text-gray-600" />;
      default: return <Sun className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Destinations</span>
      </button>

      {/* Hero Section */}
      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Image Gallery */}
        <div className="lg:col-span-2">
          <div className="relative h-96 rounded-2xl overflow-hidden mb-4">
            <img 
              src={galleryImages[selectedImageIndex]} 
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            
            {/* Image Controls */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                <Camera className="w-5 h-5" />
              </button>
            </div>

            {/* Destination Info Overlay */}
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-3xl font-bold mb-2">{destination.name}</h1>
              <div className="flex items-center space-x-4 text-green-100">
                <span>{destination.nameArabic}</span>
                <span>•</span>
                <span>{destination.nameFrench}</span>
              </div>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-2">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImageIndex === index ? 'border-green-500' : 'border-transparent'
                }`}
              >
                <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Quick Info & Weather */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Region</span>
                </div>
                <span className="font-medium text-gray-900">{destination.region}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Leaf className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">Sustainability</span>
                </div>
                <span className="font-medium text-green-600">{destination.sustainabilityScore}%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Crowd Level</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCrowdLevelColor(destination.crowdLevel)}`}>
                  {destination.crowdLevel}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Best Time</span>
                </div>
                <span className="font-medium text-gray-900">{destination.bestVisitTime}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-600">Average Cost</span>
                </div>
                <span className="font-medium text-green-600">{destination.averageCost} TND</span>
              </div>
            </div>
          </div>

          {/* Weather Widget */}
          <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Weather</h3>
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-2xl font-bold text-blue-600">{weatherData.current.temp}°C</div>
                <div className="text-sm text-gray-600">{weatherData.current.condition}</div>
              </div>
              <Sun className="w-12 h-12 text-yellow-500" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Thermometer className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Humidity: {weatherData.current.humidity}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wind className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Wind: {weatherData.current.wind} km/h</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-blue-200">
              <div className="grid grid-cols-4 gap-2">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-gray-600 mb-1">{day.day}</div>
                    <div className="flex justify-center mb-1">
                      {getWeatherIcon(day.condition)}
                    </div>
                    <div className="text-xs">
                      <div className="font-medium text-gray-900">{day.high}°</div>
                      <div className="text-gray-500">{day.low}°</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Book Now CTA */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Ready to Visit?</h3>
            <p className="text-green-100 text-sm mb-4">Plan your sustainable journey to {destination.name}</p>
            <button className="w-full bg-white text-green-600 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors">
              Plan Your Trip
            </button>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
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
              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About {destination.name}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{destination.description}</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Cultural Significance</h4>
                    <p className="text-gray-600 text-sm">{destination.culturalSignificance}</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Environmental Impact</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Carbon Footprint:</span>
                        <span className="font-medium text-green-600">{destination.carbonImpact}kg CO₂</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sustainability Score:</span>
                        <span className="font-medium text-green-600">{destination.sustainabilityScore}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Highlights */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Highlights</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {destination.activities.map((activity, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="text-2xl mb-2">
                        {activity === 'walking-tours' && '🚶'}
                        {activity === 'artisan-visits' && '🏺'}
                        {activity === 'traditional-cafes' && '☕'}
                        {activity === 'berber-culture' && '🏕️'}
                        {activity === 'underground-houses' && '🏠'}
                        {activity === 'traditional-meals' && '🍽️'}
                        {activity === 'mosque-visits' && '🕌'}
                        {activity === 'carpet-weaving' && '🧶'}
                        {activity === 'islamic-heritage' && '📿'}
                        {activity === 'beach-conservation' && '🏖️'}
                        {activity === 'pottery-making' && '🏺'}
                        {activity === 'cultural-diversity' && '🌍'}
                        {activity === 'archaeology' && '🏛️'}
                        {activity === 'museum-visits' && '🏛️'}
                        {activity === 'historical-tours' && '📚'}
                        {activity === 'souk-exploration' && '🛍️'}
                        {activity === 'artisan-workshops' && '🎨'}
                        {activity === 'traditional-architecture' && '🏗️'}
                      </div>
                      <h4 className="font-medium text-gray-900 capitalize">
                        {activity.replace('-', ' ')}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Activities Tab */}
          {activeTab === 'activities' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Popular Activities</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { name: 'Cultural Heritage Tour', duration: '3-4 hours', price: 85, rating: 4.8, image: destination.image },
                  { name: 'Traditional Craft Workshop', duration: '2-3 hours', price: 65, rating: 4.9, image: destination.image },
                  { name: 'Local Cuisine Experience', duration: '2 hours', price: 45, rating: 4.7, image: destination.image },
                  { name: 'Photography Walking Tour', duration: '3 hours', price: 55, rating: 4.6, image: destination.image }
                ].map((activity, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-48 relative">
                      <img src={activity.image} alt={activity.name} className="w-full h-full object-cover" />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs font-medium">{activity.rating}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{activity.name}</h4>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{activity.duration}</span>
                        </div>
                        <span className="font-medium text-green-600">{activity.price} TND</span>
                      </div>
                      <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Local Guides Tab */}
          {activeTab === 'guides' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Local Guides in {destination.name}</h3>
              
              {availableGuides.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {availableGuides.map((guide) => (
                    <div key={guide.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="relative">
                          <img 
                            src={guide.avatar} 
                            alt={guide.name}
                            className="w-16 h-16 rounded-full border-3 border-white shadow-md"
                          />
                          {guide.verified && (
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <Shield className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900">{guide.name}</h4>
                          <div className="flex items-center mt-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-700 ml-1">{guide.rating}</span>
                            <span className="text-sm text-gray-500 ml-1">({guide.reviewCount} reviews)</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{guide.about}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {guide.specialties.slice(0, 3).map((specialty) => (
                          <span 
                            key={specialty}
                            className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-green-600">{guide.pricePerDay} TND</span>
                          <span className="text-sm text-gray-500">/day</span>
                        </div>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                          Contact Guide
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">No Local Guides Available</h4>
                  <p className="text-gray-600">We're working on connecting with local guides in this area.</p>
                </div>
              )}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Traveler Reviews</h3>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Write Review
                </button>
              </div>

              {/* Review Summary */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">4.8</div>
                    <div className="flex items-center justify-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">Based on 127 reviews</div>
                  </div>
                  
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600 w-8">{rating}★</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 rounded-full h-2"
                            style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">
                          {rating === 5 ? 89 : rating === 4 ? 25 : rating === 3 ? 9 : rating === 2 ? 3 : 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-6">
                {[
                  {
                    name: 'Fatma Ben Ali',
                    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
                    rating: 5,
                    date: '2 weeks ago',
                    review: 'Absolutely magical experience! The cultural heritage tour was incredibly informative and our guide was passionate about preserving local traditions. The sustainable tourism approach really makes a difference.'
                  },
                  {
                    name: 'Ahmed Trabelsi',
                    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
                    rating: 5,
                    date: '1 month ago',
                    review: 'Perfect blend of history and sustainability. The local community involvement is evident everywhere. Highly recommend the pottery workshop - learned so much about traditional techniques!'
                  },
                  {
                    name: 'Leila Trabelsi',
                    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
                    rating: 4,
                    date: '1 month ago',
                    review: 'Beautiful destination with rich cultural heritage. The sustainable practices are impressive. Only minor issue was the crowd levels during peak hours, but overall an amazing experience.'
                  }
                ].map((review, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={review.avatar} 
                        alt={review.name}
                        className="w-12 h-12 rounded-full border-2 border-gray-200"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{review.name}</h4>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <p className="text-gray-600 leading-relaxed">{review.review}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;