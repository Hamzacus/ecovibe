import React, { useState } from 'react';
import { Brain, Compass, Leaf, Users, Globe, MessageCircle, Share2, Bookmark, Calendar, Clock, User, ChevronRight, Star, Award, Shield, Heart, Eye, TrendingUp } from 'lucide-react';

const BlogPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const tableOfContents = [
    { id: 'introduction', title: 'Introduction to Sustainable Travel', icon: Globe },
    { id: 'how-it-works', title: 'How EcoVibe Works', icon: Brain },
    { id: 'features', title: 'Key Features & Benefits', icon: Leaf },
    { id: 'qa', title: 'Frequently Asked Questions', icon: MessageCircle },
    { id: 'conclusion', title: 'Start Your Journey', icon: Compass }
  ];

  const qaData = [
    {
      question: "How does EcoVibe create personalized itineraries?",
      answer: "EcoVibe's AI analyzes your preferences, including budget, interests, and sustainability goals, to craft a custom itinerary featuring eco-friendly stays, local cultural experiences, and low-carbon transport options. Our machine learning algorithms consider factors like your travel history, seasonal preferences, and environmental impact to create the perfect sustainable journey."
    },
    {
      question: "Does EcoVibe suggest eco-friendly activities?",
      answer: "Yes, EcoVibe recommends sustainable activities like nature hikes, conservation volunteering, traditional craft workshops, and local culinary experiences tailored to your interests. We partner with certified eco-tourism operators and community-based organizations to ensure authentic, low-impact experiences that benefit local communities."
    },
    {
      question: "How does EcoVibe ensure sustainability?",
      answer: "We partner with trusted certification programs and only recommend accommodations and activities that align with the UN's Sustainable Development Goals (SDGs). Our platform verifies eco-certifications, monitors carbon footprints, and tracks the positive impact of each travel choice on local communities and the environment."
    },
    {
      question: "Can I use EcoVibe for last-minute travel changes?",
      answer: "Absolutely! EcoVibe's AI assists with real-time updates and suggests sustainable alternatives if changes to your itinerary arise. Our 24/7 support system can quickly find eco-friendly accommodations, rebook sustainable transport options, and adjust your activities while maintaining your environmental and cultural goals."
    },
    {
      question: "What makes EcoVibe different from other travel platforms?",
      answer: "EcoVibe uniquely combines AI-powered personalization with a deep commitment to sustainability and cultural preservation. Unlike traditional platforms, we prioritize environmental impact, support local communities, and offer gamified rewards for sustainable choices. Our platform is specifically designed for conscious travelers who want to explore authentically while making a positive impact."
    },
    {
      question: "How does the rewards system work?",
      answer: "Our gamified rewards system tracks your sustainable travel choices and awards points for eco-friendly decisions. You earn points for choosing green accommodations, participating in conservation activities, supporting local businesses, and reducing your carbon footprint. These points unlock exclusive experiences, discounts, and recognition within our community of conscious travelers."
    }
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Personalization',
      description: 'Advanced machine learning algorithms analyze your preferences, travel history, and sustainability goals to create perfectly tailored itineraries.',
      benefits: ['Custom recommendations', 'Smart route optimization', 'Preference learning', 'Real-time adjustments']
    },
    {
      icon: Leaf,
      title: 'Sustainability First',
      description: 'Every recommendation is evaluated for environmental impact, supporting only certified eco-friendly accommodations and activities.',
      benefits: ['Carbon footprint tracking', 'Eco-certification verification', 'Impact measurement', 'Green alternatives']
    },
    {
      icon: Users,
      title: 'Community Impact',
      description: 'Connect with local communities and support traditional crafts, cultural preservation, and community-based tourism initiatives.',
      benefits: ['Local guide network', 'Cultural experiences', 'Community support', 'Traditional crafts']
    },
    {
      icon: Globe,
      title: 'Real-Time Intelligence',
      description: 'Access live data on crowd levels, weather conditions, and local events to optimize your travel experience.',
      benefits: ['Crowd predictions', 'Weather integration', 'Event notifications', 'Dynamic planning']
    }
  ];

  const stats = [
    { label: 'CO₂ Saved', value: '15.4k', unit: 'tonnes', icon: Leaf, color: 'text-green-600' },
    { label: 'Local Businesses', value: '340+', unit: 'partners', icon: Users, color: 'text-blue-600' },
    { label: 'Heritage Projects', value: '25', unit: 'funded', icon: Award, color: 'text-purple-600' },
    { label: 'Active Travelers', value: '2.8k+', unit: 'users', icon: Globe, color: 'text-orange-600' }
  ];

  const testimonials = [
    {
      name: 'Amina Ben Ahmed',
      role: 'Cultural Explorer',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      quote: 'EcoVibe transformed how I travel. The AI recommendations led me to incredible hidden gems while ensuring my journey supported local communities.',
      rating: 5,
      location: 'Tunis, Tunisia'
    },
    {
      name: 'Ahmed Trabelsi',
      role: 'Sustainable Tourism Advocate',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      quote: 'The platform\'s focus on cultural preservation and environmental responsibility aligns perfectly with my values. Highly recommended!',
      rating: 5,
      location: 'Kairouan, Tunisia'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 bg-green-100 rounded-full px-4 py-2 mb-6">
          <Brain className="w-5 h-5 text-green-600" />
          <span className="text-sm font-medium text-green-700">AI-Powered Travel Platform</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Explore the World with 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> EcoVibe</span>
          <br />
          Your AI Travel Companion for Sustainable and Authentic Travel
        </h1>
        
        <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
          Harnessing AI to create eco-friendly, personalized travel experiences that connect you with authentic local cultures while preserving our planet's natural heritage and supporting sustainable tourism practices.
        </p>

        {/* Stats Bar */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-center mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.unit}</div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200">
            Get Started with EcoVibe
          </button>
          <button className="bg-white text-gray-700 border border-gray-300 px-8 py-4 rounded-xl font-medium hover:bg-gray-50 transition-colors">
            Watch Demo
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Table of Contents Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h3>
              <nav className="space-y-2">
                {tableOfContents.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                        activeSection === item.id
                          ? 'bg-green-100 text-green-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 mt-6 border border-green-200">
              <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-2 text-left text-sm text-gray-600 hover:text-green-600 transition-colors">
                  <Bookmark className="w-4 h-4" />
                  <span>Save Article</span>
                </button>
                <button className="w-full flex items-center space-x-2 text-left text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>Share Article</span>
                </button>
                <button className="w-full flex items-center space-x-2 text-left text-sm text-gray-600 hover:text-purple-600 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>Ask Questions</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Article Header */}
            <div className="p-8 border-b border-gray-200">
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Published December 15, 2024</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>12 min read</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>EcoVibe Team</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">2.4k views</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">189 likes</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">34 comments</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-500 transition-colors">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-8">
              {/* Introduction Section */}
              {activeSection === 'introduction' && (
                <section id="introduction" className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Globe className="w-6 h-6 mr-3 text-green-600" />
                    The Future of Sustainable Travel
                  </h2>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    In an era where climate change and cultural preservation have become critical global concerns, the way we travel must evolve. Traditional tourism often prioritizes convenience and cost over environmental impact and cultural sensitivity, leading to overtourism, carbon emissions, and the erosion of local traditions.
                  </p>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    EcoVibe represents a paradigm shift in travel planning, leveraging artificial intelligence to create personalized, sustainable travel experiences that benefit both travelers and destinations. Our platform doesn't just help you find places to visit—it connects you with authentic cultural experiences while ensuring your journey contributes positively to local communities and environmental conservation.
                  </p>

                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Why Sustainable Travel Matters</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>Tourism accounts for 8% of global greenhouse gas emissions</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>Over 1 billion people depend on tourism for their livelihoods</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>Cultural heritage sites face increasing pressure from mass tourism</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>Sustainable tourism can generate 3x more local economic benefit</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-gray-600 leading-relaxed">
                    By choosing sustainable travel options, you become part of a global movement that preserves natural environments, supports local economies, and maintains cultural authenticity for future generations. EcoVibe makes this choice not just possible, but effortless and rewarding.
                  </p>
                </section>
              )}

              {/* How It Works Section */}
              {activeSection === 'how-it-works' && (
                <section id="how-it-works" className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Brain className="w-6 h-6 mr-3 text-blue-600" />
                    How EcoVibe's AI Creates Your Perfect Journey
                  </h2>

                  <p className="text-gray-600 leading-relaxed mb-8">
                    Our advanced AI system combines machine learning, real-time data analysis, and sustainability metrics to craft personalized travel experiences that align with your values and preferences.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                        <span className="text-2xl">🧠</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Preference Analysis</h3>
                      <p className="text-gray-600 text-sm">
                        Our AI analyzes your travel history, interests, budget, and sustainability goals to understand your unique travel personality and preferences.
                      </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                        <span className="text-2xl">🌍</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Sustainable Matching</h3>
                      <p className="text-gray-600 text-sm">
                        We match you with eco-certified accommodations, responsible tour operators, and authentic cultural experiences that align with your values.
                      </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                        <span className="text-2xl">🗺️</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Smart Optimization</h3>
                      <p className="text-gray-600 text-sm">
                        Routes are optimized for minimal carbon footprint while maximizing cultural immersion and authentic local experiences.
                      </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                        <span className="text-2xl">⚡</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Real-Time Adaptation</h3>
                      <p className="text-gray-600 text-sm">
                        Continuous monitoring and adjustment based on weather, crowd levels, local events, and your feedback during the journey.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">The EcoVibe Difference</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700">All recommendations verified for sustainability credentials</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700">Direct partnerships with local communities and guides</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-700">Continuous learning from user feedback and preferences</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Award className="w-5 h-5 text-orange-600" />
                        <span className="text-gray-700">Gamified rewards for sustainable travel choices</span>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Features Section */}
              {activeSection === 'features' && (
                <section id="features" className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Leaf className="w-6 h-6 mr-3 text-green-600" />
                    Key Features & Benefits
                  </h2>

                  <p className="text-gray-600 leading-relaxed mb-8">
                    EcoVibe offers a comprehensive suite of features designed to make sustainable travel accessible, rewarding, and transformative for both travelers and destinations.
                  </p>

                  <div className="space-y-8">
                    {features.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Icon className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                              <p className="text-gray-600 mb-4">{feature.description}</p>
                              <div className="grid md:grid-cols-2 gap-2">
                                {feature.benefits.map((benefit, benefitIndex) => (
                                  <div key={benefitIndex} className="flex items-center space-x-2">
                                    <ChevronRight className="w-4 h-4 text-green-600" />
                                    <span className="text-sm text-gray-600">{benefit}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Q&A Section */}
              {activeSection === 'qa' && (
                <section id="qa" className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <MessageCircle className="w-6 h-6 mr-3 text-purple-600" />
                    Frequently Asked Questions
                  </h2>

                  <p className="text-gray-600 leading-relaxed mb-8">
                    Get answers to common questions about EcoVibe's AI platform, sustainability features, and travel assistance capabilities.
                  </p>

                  <div className="space-y-6">
                    {qaData.map((qa, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-shadow">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-start">
                          <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1 flex-shrink-0">
                            Q
                          </span>
                          {qa.question}
                        </h3>
                        <div className="ml-9">
                          <div className="flex items-start mb-2">
                            <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                              A
                            </span>
                          </div>
                          <p className="text-gray-600 leading-relaxed ml-9">{qa.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200 mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Still have questions?</h3>
                    <p className="text-gray-600 mb-4">
                      Our support team is here to help you make the most of your sustainable travel experience.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                        Contact Support
                      </button>
                      <button className="bg-white text-purple-600 border border-purple-300 px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors">
                        Join Community
                      </button>
                    </div>
                  </div>
                </section>
              )}

              {/* Conclusion Section */}
              {activeSection === 'conclusion' && (
                <section id="conclusion" className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Compass className="w-6 h-6 mr-3 text-orange-600" />
                    Start Your Sustainable Journey Today
                  </h2>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    The future of travel is sustainable, authentic, and powered by intelligent technology. EcoVibe makes it possible for every traveler to explore the world responsibly while creating positive impact for local communities and the environment.
                  </p>

                  <p className="text-gray-600 leading-relaxed mb-8">
                    Join thousands of conscious travelers who have already discovered the joy of sustainable exploration. Whether you're planning a weekend getaway or a month-long adventure, EcoVibe's AI will craft the perfect journey that aligns with your values and exceeds your expectations.
                  </p>

                  {/* Testimonials */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {testimonials.map((testimonial, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full border-2 border-gray-200"
                          />
                          <div>
                            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                            <div className="flex items-center mt-1">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 italic mb-3">"{testimonial.quote}"</p>
                        <p className="text-xs text-gray-500">{testimonial.location}</p>
                      </div>
                    ))}
                  </div>

                  {/* Call to Action */}
                  <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white text-center">
                    <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Travel Experience?</h3>
                    <p className="text-green-100 mb-6 max-w-2xl mx-auto">
                      Join EcoVibe today and discover how AI-powered sustainable travel can create unforgettable experiences while making a positive impact on the world.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-medium hover:bg-gray-100 transition-colors">
                        Get Started with EcoVibe and Travel Smarter
                      </button>
                      <button className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-xl font-medium hover:bg-white hover:text-green-600 transition-colors">
                        Learn More
                      </button>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">What happens next?</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <ChevronRight className="w-4 h-4 text-green-600" />
                        <span>Create your personalized travel profile in under 5 minutes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ChevronRight className="w-4 h-4 text-green-600" />
                        <span>Receive AI-curated sustainable destination recommendations</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ChevronRight className="w-4 h-4 text-green-600" />
                        <span>Connect with verified local guides and eco-friendly accommodations</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ChevronRight className="w-4 h-4 text-green-600" />
                        <span>Start earning rewards for your sustainable travel choices</span>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </article>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 bg-gray-900 text-white rounded-2xl p-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">EcoVibe</h3>
                <p className="text-green-400 text-sm">Sustainable Travel AI</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Transforming travel through AI-powered sustainability and authentic cultural experiences.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="#" className="block hover:text-white transition-colors">How It Works</a>
              <a href="#" className="block hover:text-white transition-colors">Sustainability</a>
              <a href="#" className="block hover:text-white transition-colors">Community</a>
              <a href="#" className="block hover:text-white transition-colors">Rewards</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="#" className="block hover:text-white transition-colors">Help Center</a>
              <a href="#" className="block hover:text-white transition-colors">Contact Us</a>
              <a href="#" className="block hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="block hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Certifications</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>UN SDG Aligned</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-blue-400" />
                <span>B Corp Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Leaf className="w-4 h-4 text-green-400" />
                <span>Carbon Neutral</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 EcoVibe. All rights reserved. Made with 💚 for sustainable travel.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="sr-only">Instagram</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPage;