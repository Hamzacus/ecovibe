import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, Languages, Award, Calendar, MessageCircle, Heart, Share2, Shield, Camera, Clock, Users, DollarSign, CheckCircle } from 'lucide-react';
import { localGuides } from '../../data/mockData';

interface GuideProfileProps {
  guideId: string;
  onBack: () => void;
}

const GuideProfile: React.FC<GuideProfileProps> = ({ guideId, onBack }) => {
  const [activeTab, setActiveTab] = useState('about');
  const [showContactForm, setShowContactForm] = useState(false);
  
  const guide = localGuides.find(g => g.id === guideId);

  if (!guide) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Guide Not Found</h2>
        <button onClick={onBack} className="text-green-600 hover:text-green-700">
          ← Back to Guides
        </button>
      </div>
    );
  }

  const tabs = [
    { id: 'about', label: 'About', icon: Users },
    { id: 'services', label: 'Services', icon: Award },
    { id: 'portfolio', label: 'Portfolio', icon: Camera },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'availability', label: 'Availability', icon: Calendar }
  ];

  const services = [
    {
      id: '1',
      name: 'Cultural Heritage Tour',
      description: 'Comprehensive tour of historical sites and cultural landmarks',
      duration: 'Full Day (8 hours)',
      price: 120,
      includes: ['Transportation', 'Entry fees', 'Traditional lunch', 'Cultural insights']
    },
    {
      id: '2',
      name: 'Photography Workshop',
      description: 'Learn to capture the beauty of Tunisia with professional guidance',
      duration: 'Half Day (4 hours)',
      price: 80,
      includes: ['Photography tips', 'Best locations', 'Equipment advice', 'Photo editing basics']
    },
    {
      id: '3',
      name: 'Culinary Experience',
      description: 'Discover authentic Tunisian cuisine and cooking techniques',
      duration: '6 hours',
      price: 95,
      includes: ['Market visit', 'Cooking class', 'Traditional recipes', 'Full meal']
    }
  ];

  const portfolio = [
    {
      id: '1',
      title: 'Sidi Bou Said Blue & White Architecture',
      image: 'https://images.pexels.com/photos/12892812/pexels-photo-12892812.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Capturing the iconic blue and white buildings'
    },
    {
      id: '2',
      title: 'Traditional Pottery Workshop',
      image: 'https://images.pexels.com/photos/1293120/pexels-photo-1293120.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Hands-on experience with local artisans'
    },
    {
      id: '3',
      title: 'Sunset at Carthage Ruins',
      image: 'https://images.pexels.com/photos/11041282/pexels-photo-11041282.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Ancient history meets natural beauty'
    }
  ];

  const reviews = [
    {
      id: '1',
      author: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Youssef provided an incredible cultural tour of Sidi Bou Said. His knowledge of local history and traditions is exceptional. Highly recommended!'
    },
    {
      id: '2',
      author: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      date: '1 month ago',
      comment: 'The photography workshop was amazing! Youssef knows all the best spots and gave great technical advice. My photos turned out fantastic.'
    },
    {
      id: '3',
      author: 'Emma Wilson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      date: '2 months ago',
      comment: 'Professional, knowledgeable, and passionate about sharing Tunisian culture. The culinary experience was unforgettable!'
    }
  ];

  const availability = [
    { date: '2024-02-15', status: 'available' },
    { date: '2024-02-16', status: 'booked' },
    { date: '2024-02-17', status: 'available' },
    { date: '2024-02-18', status: 'available' },
    { date: '2024-02-19', status: 'booked' },
    { date: '2024-02-20', status: 'available' },
    { date: '2024-02-21', status: 'available' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Guides</span>
      </button>

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl text-white p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="relative">
            <img 
              src={guide.avatar} 
              alt={guide.name}
              className="w-32 h-32 rounded-full border-4 border-white/30"
            />
            {guide.verified && (
              <div className="absolute bottom-2 right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                <Shield className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <h1 className="text-3xl font-bold">{guide.name}</h1>
              {guide.verified && (
                <CheckCircle className="w-6 h-6 text-green-300" />
              )}
            </div>
            
            <div className="flex items-center justify-center md:justify-start space-x-4 text-green-100 mb-4">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{guide.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-300 fill-current" />
                <span>{guide.rating} ({guide.reviewCount} reviews)</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{guide.reviewCount}</div>
                <div className="text-green-100 text-sm">Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">8+</div>
                <div className="text-blue-100 text-sm">Years Exp.</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{guide.languages.length}</div>
                <div className="text-purple-100 text-sm">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{guide.pricePerDay}</div>
                <div className="text-yellow-100 text-sm">TND/day</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => setShowContactForm(true)}
                className="bg-white text-green-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors"
              >
                Contact Guide
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium hover:bg-white/30 transition-colors">
                View Availability
              </button>
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
          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About {guide.name}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{guide.about}</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {guide.specialties.map(specialty => (
                        <span key={specialty} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {guide.languages.map(language => (
                        <span key={language} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Cultural Expertise</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {guide.culturalExpertise.map(expertise => (
                    <div key={expertise} className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <h5 className="font-medium text-purple-900">{expertise}</h5>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Services Offered</h3>
              
              <div className="grid gap-6">
                {services.map(service => (
                  <div key={service.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h4>
                        <p className="text-gray-600 mb-3">{service.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{service.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{service.price} TND</div>
                        <div className="text-sm text-gray-500">per person</div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h5 className="font-medium text-gray-900 mb-2">Includes:</h5>
                      <ul className="grid grid-cols-2 gap-1">
                        {service.includes.map((item, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                      Book This Service
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Portfolio Tab */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Portfolio</h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolio.map(item => (
                  <div key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-48 relative">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Reviews</h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{guide.rating}</div>
                  <div className="text-sm text-gray-500">Based on {guide.reviewCount} reviews</div>
                </div>
              </div>
              
              <div className="space-y-6">
                {reviews.map(review => (
                  <div key={review.id} className="border-b border-gray-200 pb-6">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={review.avatar} 
                        alt={review.author}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{review.author}</h4>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-3">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star 
                              key={star} 
                              className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Availability Tab */}
          {activeTab === 'availability' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Availability Calendar</h3>
              
              <div className="grid grid-cols-7 gap-2">
                {availability.map((day, index) => (
                  <div 
                    key={index}
                    className={`p-3 text-center rounded-lg border ${
                      day.status === 'available' 
                        ? 'bg-green-50 border-green-200 text-green-700' 
                        : 'bg-red-50 border-red-200 text-red-700'
                    }`}
                  >
                    <div className="text-sm font-medium">
                      {new Date(day.date).getDate()}
                    </div>
                    <div className="text-xs capitalize">{day.status}</div>
                  </div>
                ))}
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-3">Booking Information</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Advance booking recommended (48 hours minimum)</li>
                  <li>• Flexible scheduling available for multi-day tours</li>
                  <li>• Group discounts available for 4+ people</li>
                  <li>• Cancellation policy: 24 hours notice required</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Contact {guide.name}</h3>
              <button 
                onClick={() => setShowContactForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input 
                  type="text" 
                  placeholder="Tour inquiry"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  rows={4}
                  placeholder="Tell me about your travel plans..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                />
              </div>
              <div className="flex space-x-3">
                <button 
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuideProfile;