import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Star, Filter, Search, Heart, Share2, Bookmark, Eye, DollarSign } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  price: number;
  category: string;
  organizer: string;
  capacity: number;
  attendees: number;
  rating: number;
  tags: string[];
  featured: boolean;
}

const EventsHub: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const categories = [
    { id: 'all', label: 'All Events', icon: '📅' },
    { id: 'cultural', label: 'Cultural', icon: '🏛️' },
    { id: 'adventure', label: 'Adventure', icon: '🏔️' },
    { id: 'culinary', label: 'Culinary', icon: '🍴' },
    { id: 'workshop', label: 'Workshops', icon: '🎨' },
    { id: 'festival', label: 'Festivals', icon: '🎭' },
    { id: 'nature', label: 'Nature', icon: '🌿' }
  ];

  const events: Event[] = [
    {
      id: '1',
      title: 'Traditional Pottery Workshop',
      description: 'Learn ancient pottery techniques from master craftsmen in Nabeul. Create your own ceramic pieces using traditional methods passed down through generations.',
      image: 'https://images.pexels.com/photos/1293120/pexels-photo-1293120.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-02-15',
      time: '10:00 AM',
      location: 'Nabeul, Tunisia',
      price: 65,
      category: 'workshop',
      organizer: 'Nabeul Artisan Center',
      capacity: 15,
      attendees: 8,
      rating: 4.8,
      tags: ['pottery', 'traditional-crafts', 'hands-on'],
      featured: true
    },
    {
      id: '2',
      title: 'Sahara Desert Sunset Experience',
      description: 'Witness the breathtaking sunset over the Sahara dunes with traditional Berber music and authentic desert cuisine.',
      image: 'https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-02-18',
      time: '4:00 PM',
      location: 'Douz, Tunisia',
      price: 120,
      category: 'adventure',
      organizer: 'Desert Adventures Tunisia',
      capacity: 25,
      attendees: 18,
      rating: 4.9,
      tags: ['desert', 'sunset', 'berber-culture'],
      featured: true
    },
    {
      id: '3',
      title: 'Medina Food Walking Tour',
      description: 'Explore the flavors of Tunisia through a guided food tour in the historic Medina of Tunis.',
      image: 'https://images.pexels.com/photos/13455377/pexels-photo-13455377.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-02-20',
      time: '6:00 PM',
      location: 'Tunis Medina',
      price: 45,
      category: 'culinary',
      organizer: 'Tunis Food Tours',
      capacity: 12,
      attendees: 5,
      rating: 4.7,
      tags: ['food', 'walking-tour', 'local-cuisine'],
      featured: false
    },
    {
      id: '4',
      title: 'Carthage Archaeological Discovery',
      description: 'Join archaeologists for an exclusive behind-the-scenes tour of ongoing excavations at ancient Carthage.',
      image: 'https://images.pexels.com/photos/11041282/pexels-photo-11041282.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-02-22',
      time: '9:00 AM',
      location: 'Carthage, Tunisia',
      price: 85,
      category: 'cultural',
      organizer: 'Carthage Archaeological Institute',
      capacity: 20,
      attendees: 12,
      rating: 4.6,
      tags: ['archaeology', 'history', 'exclusive'],
      featured: false
    },
    {
      id: '5',
      title: 'Sidi Bou Said Art Festival',
      description: 'Annual art festival celebrating local and international artists in the beautiful blue and white village.',
      image: 'https://images.pexels.com/photos/12892812/pexels-photo-12892812.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-02-25',
      time: '2:00 PM',
      location: 'Sidi Bou Said',
      price: 25,
      category: 'festival',
      organizer: 'Sidi Bou Said Cultural Center',
      capacity: 200,
      attendees: 145,
      rating: 4.5,
      tags: ['art', 'festival', 'culture'],
      featured: true
    },
    {
      id: '6',
      title: 'Ichkeul National Park Bird Watching',
      description: 'Guided bird watching tour in UNESCO Biosphere Reserve during migration season.',
      image: 'https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-02-28',
      time: '7:00 AM',
      location: 'Ichkeul National Park',
      price: 55,
      category: 'nature',
      organizer: 'Tunisia Wildlife Society',
      capacity: 15,
      attendees: 9,
      rating: 4.8,
      tags: ['birdwatching', 'nature', 'conservation'],
      featured: false
    }
  ];

  const filteredEvents = events.filter(event => 
    (selectedCategory === 'all' || event.category === selectedCategory) &&
    (searchQuery === '' || 
     event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
     event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  const toggleWishlist = (eventId: string) => {
    setWishlist(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (selectedEvent) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button 
          onClick={() => setSelectedEvent(null)}
          className="mb-6 flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
        >
          <span>←</span>
          <span>Back to Events</span>
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Event Header */}
          <div className="relative h-64 md:h-80">
            <img 
              src={selectedEvent.image} 
              alt={selectedEvent.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            <div className="absolute top-4 right-4 flex space-x-2">
              <button 
                onClick={() => toggleWishlist(selectedEvent.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  wishlist.includes(selectedEvent.id)
                    ? 'bg-red-500 text-white'
                    : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                }`}
              >
                <Heart className={`w-5 h-5 ${wishlist.includes(selectedEvent.id) ? 'fill-current' : ''}`} />
              </button>
              <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
            
            <div className="absolute bottom-6 left-6 text-white">
              {selectedEvent.featured && (
                <div className="inline-block px-3 py-1 bg-yellow-500 rounded-full text-sm font-medium mb-3">
                  Featured Event
                </div>
              )}
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{selectedEvent.title}</h1>
              <div className="flex items-center space-x-4 text-green-100">
                <span>{selectedEvent.organizer}</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{selectedEvent.rating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{selectedEvent.description}</p>
                
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Included</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Expert local guide</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>All materials and equipment</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Traditional refreshments</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Certificate of participation</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedEvent.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Booking Sidebar */}
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {selectedEvent.price} TND
                    </div>
                    <div className="text-sm text-gray-500">per person</div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">{formatDate(selectedEvent.date)}</div>
                        <div className="text-sm text-gray-500">{selectedEvent.time}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div className="font-medium text-gray-900">{selectedEvent.location}</div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">
                          {selectedEvent.attendees}/{selectedEvent.capacity} attendees
                        </div>
                        <div className="text-sm text-gray-500">
                          {selectedEvent.capacity - selectedEvent.attendees} spots left
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200">
                    Book Now
                  </button>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Organizer</h4>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {selectedEvent.organizer.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{selectedEvent.organizer}</div>
                      <div className="text-sm text-gray-600">Verified Organizer</div>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Contact Organizer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-4 py-2 mb-4">
          <Calendar className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium text-blue-700">Events & Activities</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Discover Amazing
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> Experiences</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Join unique cultural events, workshops, and adventures that connect you with Tunisia's rich heritage and vibrant communities.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search events, locations, or activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Featured Events */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Events</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.filter(event => event.featured).map((event) => (
            <div 
              key={event.id} 
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="relative h-48">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Featured
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-medium">{event.rating}</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(event.id);
                  }}
                  className={`absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    wishlist.includes(event.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${wishlist.includes(event.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium capitalize">
                    {event.category}
                  </span>
                  <span className="text-xs text-gray-500">by {event.organizer}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {event.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{formatDate(event.date)} at {event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{event.attendees}/{event.capacity} attendees</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-green-600 font-bold text-lg">
                    {event.price} TND
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="p-2 text-gray-400 hover:text-green-500 transition-colors"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Events */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">All Events ({filteredEvents.length})</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>Date</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
              <option>Popularity</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div 
              key={event.id} 
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="relative h-48">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {event.featured && (
                  <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-medium">{event.rating}</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(event.id);
                  }}
                  className={`absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    wishlist.includes(event.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${wishlist.includes(event.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium capitalize">
                    {event.category}
                  </span>
                  <span className="text-xs text-gray-500">by {event.organizer}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {event.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{formatDate(event.date)} at {event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{event.attendees}/{event.capacity} attendees</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-green-600 font-bold text-lg">
                    {event.price} TND
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="p-2 text-gray-400 hover:text-green-500 transition-colors"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* No Results */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search terms or filters to find events that match your interests.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default EventsHub;