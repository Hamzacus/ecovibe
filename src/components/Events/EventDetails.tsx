import React, { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, Users, Star, DollarSign, Heart, Share2, Bookmark, MessageCircle, Camera, Award, CheckCircle, AlertCircle } from 'lucide-react';

interface EventDetailsProps {
  eventId: string;
  onBack: () => void;
}

interface Event {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  date: string;
  time: string;
  endTime: string;
  location: string;
  venue: string;
  price: number;
  category: string;
  organizer: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
    rating: number;
    eventsOrganized: number;
  };
  capacity: number;
  attendees: number;
  rating: number;
  tags: string[];
  featured: boolean;
  requirements: string[];
  includes: string[];
  cancellationPolicy: string;
  ageRestriction?: string;
  difficulty?: string;
  languages: string[];
}

const EventDetails: React.FC<EventDetailsProps> = ({ eventId, onBack }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState(1);

  // Mock event data - in real app, this would come from props or API
  const event: Event = {
    id: eventId,
    title: 'Traditional Pottery Workshop in Nabeul',
    description: 'Learn ancient pottery techniques from master craftsmen in the pottery capital of Tunisia.',
    longDescription: 'Immerse yourself in the ancient art of pottery making in Nabeul, Tunisia\'s renowned pottery capital. This hands-on workshop offers a unique opportunity to learn traditional techniques that have been passed down through generations of skilled artisans. Under the guidance of master potter Ahmed Bouazizi, you\'ll discover the secrets of creating beautiful ceramic pieces using time-honored methods and local clay. The workshop includes a visit to the pottery souk, where you\'ll see the incredible variety of ceramics produced in the region, from decorative tiles to functional pottery. You\'ll learn about the cultural significance of pottery in Tunisian society and how this craft has evolved while maintaining its traditional roots. By the end of the workshop, you\'ll have created your own ceramic piece to take home as a lasting memory of your cultural experience.',
    image: 'https://images.pexels.com/photos/1293120/pexels-photo-1293120.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/1293120/pexels-photo-1293120.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4022092/pexels-photo-4022092.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    date: '2024-02-15',
    time: '10:00 AM',
    endTime: '4:00 PM',
    location: 'Nabeul, Tunisia',
    venue: 'Nabeul Artisan Center',
    price: 65,
    category: 'workshop',
    organizer: {
      id: '1',
      name: 'Nabeul Artisan Center',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      verified: true,
      rating: 4.8,
      eventsOrganized: 45
    },
    capacity: 15,
    attendees: 8,
    rating: 4.8,
    tags: ['pottery', 'traditional-crafts', 'hands-on', 'cultural-heritage'],
    featured: true,
    requirements: [
      'No prior experience required',
      'Comfortable clothing that can get dirty',
      'Closed-toe shoes recommended'
    ],
    includes: [
      'All materials and tools',
      'Expert instruction',
      'Traditional lunch',
      'Take-home ceramic piece',
      'Certificate of participation'
    ],
    cancellationPolicy: 'Free cancellation up to 24 hours before the event. 50% refund for cancellations within 24 hours.',
    ageRestriction: '12+ years',
    difficulty: 'Beginner friendly',
    languages: ['Arabic', 'French', 'English']
  };

  const tabs = [
    { id: 'details', label: 'Details', icon: AlertCircle },
    { id: 'organizer', label: 'Organizer', icon: Users },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'gallery', label: 'Gallery', icon: Camera }
  ];

  const reviews = [
    {
      id: '1',
      author: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      date: '1 week ago',
      comment: 'Amazing experience! The master potter was incredibly knowledgeable and patient. I learned so much about traditional techniques and created a beautiful bowl.'
    },
    {
      id: '2',
      author: 'Ahmed Trabelsi',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Perfect cultural immersion! The workshop was well-organized, and the lunch was delicious. Highly recommend for anyone interested in traditional crafts.'
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleBooking = () => {
    // Handle booking logic here
    alert(`Booking confirmed for ${attendeeCount} attendee(s)!`);
    setShowBookingForm(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Events</span>
      </button>

      {/* Event Header */}
      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Image Gallery */}
        <div className="lg:col-span-2">
          <div className="relative h-96 rounded-2xl overflow-hidden mb-4">
            <img 
              src={event.gallery[selectedImageIndex]} 
              alt={event.title}
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
                <Bookmark className="w-5 h-5" />
              </button>
            </div>

            {/* Event Info Overlay */}
            <div className="absolute bottom-6 left-6 text-white">
              {event.featured && (
                <div className="inline-block px-3 py-1 bg-yellow-500 rounded-full text-sm font-medium mb-3">
                  Featured Event
                </div>
              )}
              <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
              <div className="flex items-center space-x-4 text-green-100">
                <span>{event.organizer.name}</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{event.rating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-3 gap-2">
            {event.gallery.map((image, index) => (
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

        {/* Booking Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {event.price} TND
              </div>
              <div className="text-sm text-gray-500">per person</div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium text-gray-900">{formatDate(event.date)}</div>
                  <div className="text-sm text-gray-500">{event.time} - {event.endTime}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium text-gray-900">{event.venue}</div>
                  <div className="text-sm text-gray-500">{event.location}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium text-gray-900">
                    {event.attendees}/{event.capacity} attendees
                  </div>
                  <div className="text-sm text-gray-500">
                    {event.capacity - event.attendees} spots left
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowBookingForm(true)}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Book Now
            </button>
          </div>

          {/* Quick Info */}
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium text-gray-900 capitalize">{event.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Difficulty:</span>
                <span className="font-medium text-gray-900">{event.difficulty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Age Restriction:</span>
                <span className="font-medium text-gray-900">{event.ageRestriction}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Languages:</span>
                <span className="font-medium text-gray-900">{event.languages.join(', ')}</span>
              </div>
            </div>
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
          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About This Event</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{event.longDescription}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {event.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">What's Included</h4>
                  <ul className="space-y-2">
                    {event.includes.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h4>
                  <ul className="space-y-2">
                    {event.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <AlertCircle className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-600">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <h4 className="font-semibold text-gray-900 mb-2">Cancellation Policy</h4>
                <p className="text-gray-600 text-sm">{event.cancellationPolicy}</p>
              </div>
            </div>
          )}

          {/* Organizer Tab */}
          {activeTab === 'organizer' && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <img 
                  src={event.organizer.avatar} 
                  alt={event.organizer.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-semibold text-gray-900">{event.organizer.name}</h3>
                    {event.organizer.verified && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{event.organizer.rating} rating</span>
                    </div>
                    <span>•</span>
                    <span>{event.organizer.eventsOrganized} events organized</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">About the Organizer</h4>
                <p className="text-gray-600 mb-4">
                  The Nabeul Artisan Center is a renowned cultural institution dedicated to preserving and promoting traditional Tunisian crafts. 
                  With over 20 years of experience, they offer authentic workshops led by master craftsmen who have inherited their skills through generations.
                </p>
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Contact Organizer
                </button>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Reviews</h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{event.rating}</div>
                  <div className="text-sm text-gray-500">Based on {reviews.length} reviews</div>
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

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Event Gallery</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {event.gallery.map((image, index) => (
                  <div key={index} className="aspect-square rounded-xl overflow-hidden">
                    <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Book Event</h3>
              <button 
                onClick={() => setShowBookingForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Attendees</label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setAttendeeCount(Math.max(1, attendeeCount - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center">
                    <div className="text-2xl font-bold text-green-600">{attendeeCount}</div>
                  </div>
                  <button
                    onClick={() => setAttendeeCount(attendeeCount + 1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Cost:</span>
                  <span className="text-xl font-bold text-green-600">
                    {event.price * attendeeCount} TND
                  </span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleBooking}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;