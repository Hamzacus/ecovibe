import React, { useState } from 'react';
import { MapPin, Calendar, Users, DollarSign, Compass, Sparkles, Download, Share2, Heart, Star } from 'lucide-react';
import { destinations } from '../../data/mockData';

interface TripPreferences {
  destinations: string[];
  duration: number;
  budget: string;
  groupSize: number;
  interests: string[];
  travelStyle: string;
  climatePreference: string;
  startDate: string;
}

const ItineraryPlanner: React.FC = () => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<TripPreferences>({
    destinations: [],
    duration: 7,
    budget: 'medium',
    groupSize: 2,
    interests: [],
    travelStyle: 'cultural',
    climatePreference: 'Mediterranean',
    startDate: ''
  });
  const [generatedItinerary, setGeneratedItinerary] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const budgetOptions = [
    { id: 'budget', label: 'Budget Friendly', price: '500-1000 TND', icon: '💰' },
    { id: 'medium', label: 'Comfortable', price: '1000-2500 TND', icon: '🏨' },
    { id: 'luxury', label: 'Luxury Experience', price: '2500+ TND', icon: '✨' }
  ];

  const interestOptions = [
    { id: 'culture', label: 'Cultural Heritage', icon: '🏛️' },
    { id: 'nature', label: 'Natural Beauty', icon: '🌿' },
    { id: 'adventure', label: 'Adventure Sports', icon: '🏔️' },
    { id: 'cuisine', label: 'Local Cuisine', icon: '🍴' },
    { id: 'arts', label: 'Arts & Crafts', icon: '🎨' },
    { id: 'history', label: 'Ancient History', icon: '📿' },
    { id: 'beaches', label: 'Coastal Areas', icon: '🏖️' },
    { id: 'desert', label: 'Desert Experience', icon: '🐪' }
  ];

  const travelStyles = [
    { id: 'cultural', label: 'Cultural Immersion', desc: 'Deep local experiences' },
    { id: 'adventure', label: 'Adventure Seeker', desc: 'Thrilling activities' },
    { id: 'relaxed', label: 'Relaxed Explorer', desc: 'Comfortable pace' },
    { id: 'authentic', label: 'Authentic Local', desc: 'Off-the-beaten-path' }
  ];

  const handleInterestToggle = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const generateItinerary = () => {
    setIsGenerating(true);
    // Simulate AI processing
    setTimeout(() => {
      const mockItinerary = {
        title: `7-Day Cultural Journey Through Tunisia`,
        totalCost: 1850,
        carbonFootprint: 12.5,
        sustainabilityScore: 88,
        days: [
          {
            day: 1,
            location: 'Tunis & Carthage',
            activities: [
              { time: '9:00', activity: 'Arrival & Hotel Check-in', cost: 0 },
              { time: '11:00', activity: 'Carthage Archaeological Site', cost: 25 },
              { time: '14:00', activity: 'Traditional Lunch at Local Family', cost: 45 },
              { time: '16:00', activity: 'Sidi Bou Said Village Tour', cost: 30 }
            ],
            accommodation: 'Villa Didon - Boutique Hotel',
            meals: ['Traditional Couscous', 'Mint Tea Experience'],
            transport: 'Electric Vehicle Tour',
            totalCost: 285
          },
          {
            day: 2,
            location: 'La Medina de Tunis',
            activities: [
              { time: '9:00', activity: 'Guided Medina Walking Tour', cost: 40 },
              { time: '11:00', activity: 'Traditional Pottery Workshop', cost: 55 },
              { time: '14:00', activity: 'Authentic Street Food Tour', cost: 35 },
              { time: '16:00', activity: 'Zitouna Mosque Visit', cost: 15 }
            ],
            accommodation: 'Villa Didon - Boutique Hotel',
            meals: ['Brik & Harissa', 'Traditional Makroud'],
            transport: 'Walking Tour',
            totalCost: 225
          }
        ]
      };
      
      setGeneratedItinerary(mockItinerary);
      setIsGenerating(false);
      setStep(4);
    }, 3000);
  };

  if (generatedItinerary) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-green-100 rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-700">AI-Generated Itinerary</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{generatedItinerary.title}</h1>
          <p className="text-gray-600">Personalized for Amina Ben Ahmed • Created just now</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Budget</p>
                <p className="text-xl font-bold text-green-600">{generatedItinerary.totalCost} TND</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Carbon Impact</p>
                <p className="text-xl font-bold text-blue-600">{generatedItinerary.carbonFootprint}kg CO₂</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Sustainability</p>
                <p className="text-xl font-bold text-emerald-600">{generatedItinerary.sustainabilityScore}%</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="text-xl font-bold text-purple-600">7 Days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors">
            <Heart className="w-5 h-5" />
            <span>Save Itinerary</span>
          </button>
          <button className="flex items-center space-x-2 bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
            <Download className="w-5 h-5" />
            <span>Download PDF</span>
          </button>
        </div>

        {/* Daily Itinerary */}
        <div className="space-y-8">
          {generatedItinerary.days.map((day: any, index: number) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">Day {day.day}</h3>
                    <p className="text-green-100">{day.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-100">Daily Budget</p>
                    <p className="text-xl font-bold">{day.totalCost} TND</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Activities Timeline */}
                  <div className="lg:col-span-2">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Activities Timeline</h4>
                    <div className="space-y-4">
                      {day.activities.map((activity: any, actIndex: number) => (
                        <div key={actIndex} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                          <div className="w-16 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <span className="text-sm font-medium text-green-700">{activity.time}</span>
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900">{activity.activity}</h5>
                            {activity.cost > 0 && (
                              <p className="text-sm text-green-600 font-medium">{activity.cost} TND</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Day Summary */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Accommodation</h4>
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                        <p className="font-medium text-gray-900">{day.accommodation}</p>
                        <p className="text-sm text-blue-600">Eco-certified • Local partnership</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Local Cuisine</h4>
                      <div className="space-y-2">
                        {day.meals.map((meal: string, mealIndex: number) => (
                          <div key={mealIndex} className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                            <p className="text-sm font-medium text-gray-800">{meal}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Transport</h4>
                      <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                        <p className="font-medium text-gray-900">{day.transport}</p>
                        <p className="text-sm text-emerald-600">Low carbon footprint</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Regenerate Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => setStep(1)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Create New Itinerary
          </button>
        </div>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Creating Your Perfect Journey</h2>
        <p className="text-gray-600 mb-8">Our AI is analyzing your preferences and crafting a personalized sustainable travel experience...</p>
        
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Analyzing preferences...</span>
              <span className="text-green-600">✓</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Matching sustainable accommodations...</span>
              <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Connecting with local guides...</span>
              <span className="text-gray-400">⏳</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Optimizing for minimal carbon footprint...</span>
              <span className="text-gray-400">⏳</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4 mb-4">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                step >= stepNumber 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-16 h-1 mx-2 rounded ${
                  step > stepNumber ? 'bg-green-600' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Step {step} of 3: {
              step === 1 ? 'Basic Preferences' : 
              step === 2 ? 'Interests & Style' : 
              'Review & Generate'
            }
          </p>
        </div>
      </div>

      {/* Step 1: Basic Preferences */}
      {step === 1 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Let's Plan Your Tunisian Adventure</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                How long is your trip?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[3, 7, 14].map((days) => (
                  <button
                    key={days}
                    onClick={() => setPreferences(prev => ({ ...prev, duration: days }))}
                    className={`p-3 rounded-lg border text-center transition-colors ${
                      preferences.duration === days
                        ? 'bg-green-600 text-white border-green-600'
                        : 'border-gray-300 hover:border-green-300 hover:bg-green-50'
                    }`}
                  >
                    <div className="font-medium">{days} Days</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Group Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Group Size
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setPreferences(prev => ({ ...prev, groupSize: Math.max(1, prev.groupSize - 1) }))}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <div className="flex-1 text-center">
                  <div className="text-2xl font-bold text-green-600">{preferences.groupSize}</div>
                  <div className="text-sm text-gray-500">People</div>
                </div>
                <button
                  onClick={() => setPreferences(prev => ({ ...prev, groupSize: prev.groupSize + 1 }))}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Budget Selection */}
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              What's your budget range?
            </label>
            <div className="grid md:grid-cols-3 gap-4">
              {budgetOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setPreferences(prev => ({ ...prev, budget: option.id }))}
                  className={`p-6 rounded-xl border text-left transition-all hover:scale-105 ${
                    preferences.budget === option.id
                      ? 'bg-green-600 text-white border-green-600'
                      : 'border-gray-300 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  <div className="text-2xl mb-2">{option.icon}</div>
                  <div className="font-medium mb-1">{option.label}</div>
                  <div className={`text-sm ${preferences.budget === option.id ? 'text-green-100' : 'text-gray-500'}`}>
                    {option.price}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Start Date */}
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              When would you like to start?
            </label>
            <input
              type="date"
              value={preferences.startDate}
              onChange={(e) => setPreferences(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setStep(2)}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Continue to Interests
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Interests & Style */}
      {step === 2 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">What Interests You Most?</h2>
          
          {/* Interests */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Select your interests (choose multiple)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {interestOptions.map((interest) => (
                <button
                  key={interest.id}
                  onClick={() => handleInterestToggle(interest.id)}
                  className={`p-4 rounded-xl border text-center transition-all hover:scale-105 ${
                    preferences.interests.includes(interest.id)
                      ? 'bg-green-600 text-white border-green-600'
                      : 'border-gray-300 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  <div className="text-2xl mb-2">{interest.icon}</div>
                  <div className="text-sm font-medium">{interest.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Travel Style */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              What's your travel style?
            </label>
            <div className="grid md:grid-cols-2 gap-4">
              {travelStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setPreferences(prev => ({ ...prev, travelStyle: style.id }))}
                  className={`p-6 rounded-xl border text-left transition-all hover:scale-105 ${
                    preferences.travelStyle === style.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="font-medium mb-1">{style.label}</div>
                  <div className={`text-sm ${preferences.travelStyle === style.id ? 'text-blue-100' : 'text-gray-500'}`}>
                    {style.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setStep(1)}
              className="flex-1 bg-gray-200 text-gray-700 px-8 py-4 rounded-xl font-medium hover:bg-gray-300 transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={preferences.interests.length === 0}
              className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Review & Generate
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review & Generate */}
      {step === 3 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Review Your Preferences</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <h3 className="font-medium text-gray-900 mb-2">Trip Details</h3>
                <p className="text-sm text-gray-600">{preferences.duration} days • {preferences.groupSize} people</p>
                <p className="text-sm text-green-600 font-medium">
                  Budget: {budgetOptions.find(b => b.id === preferences.budget)?.label}
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h3 className="font-medium text-gray-900 mb-2">Travel Style</h3>
                <p className="text-sm text-blue-600">
                  {travelStyles.find(s => s.id === preferences.travelStyle)?.label}
                </p>
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
              <h3 className="font-medium text-gray-900 mb-2">Your Interests</h3>
              <div className="flex flex-wrap gap-2">
                {preferences.interests.map((interest) => {
                  const option = interestOptions.find(o => o.id === interest);
                  return (
                    <span key={interest} className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-xs">
                      {option?.icon} {option?.label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🤖 AI Itinerary Generation
              </h3>
              <p className="text-gray-600 text-sm">
                Our AI will create a personalized sustainable travel plan based on your preferences, 
                connecting you with authentic local experiences while minimizing environmental impact.
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setStep(2)}
              className="flex-1 bg-gray-200 text-gray-700 px-8 py-4 rounded-xl font-medium hover:bg-gray-300 transition-colors"
            >
              Back to Edit
            </button>
            <button
              onClick={generateItinerary}
              className="flex-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Generate My Itinerary</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryPlanner;