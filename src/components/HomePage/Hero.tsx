import React from 'react';
import { MapPin, Leaf, Users, Star, ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-green-100 min-h-screen flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-green-200">
              <Leaf className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-700">Sustainable Travel Platform</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Travel 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> Sustainably</span> 
              <br />with EcoVibe Agent
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
              Your AI-powered travel companion that connects you with authentic Tunisian experiences while preserving our cultural heritage and protecting the environment.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">15.4k</div>
                <div className="text-sm text-gray-500">Tonnes CO₂ Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">340+</div>
                <div className="text-sm text-gray-500">Local Businesses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">25</div>
                <div className="text-sm text-gray-500">Heritage Projects</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={onGetStarted}
                className="group bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Plan Your Journey</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-xl font-medium hover:bg-white hover:shadow-md transition-all duration-200 flex items-center justify-center space-x-2 border border-gray-200">
                <Play className="w-5 h-5 text-green-600" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Right Content - Interactive Map */}
          <div className="relative">
            <div className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-8 border border-white/30">
              <div className="aspect-square bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-6 relative overflow-hidden">
                {/* Map Visualization */}
                <div className="absolute inset-0 opacity-30">
                  <img 
                    src="https://ontheworldmap.com/tunisia/tunisia-attractions-map.jpg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Tunisia Map" 
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                {/* Floating Cards */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-lg animate-float">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">4.9 Rating</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg animate-float delay-1000">
                  <div className="flex items-center space-x-2">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">85% Sustainable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;