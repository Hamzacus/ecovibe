import React, { useState } from 'react';
import { MapPin, Calendar, Users, DollarSign, Clock, Plus, Search, Filter, Star, MessageCircle, Send, Heart, Share2 } from 'lucide-react';

interface TripProject {
  id: string;
  title: string;
  description: string;
  budget: number;
  duration: number;
  groupSize: number;
  startDate: string;
  destinations: string[];
  interests: string[];
  requirements: string;
  status: 'draft' | 'published' | 'in-progress' | 'completed';
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  proposals: TripProposal[];
  selectedGuide?: string;
}

interface TripProposal {
  id: string;
  guideId: string;
  guideName: string;
  guideAvatar: string;
  guideRating: number;
  proposedPrice: number;
  message: string;
  timeline: string;
  expertise: string[];
  submittedAt: Date;
}

const ManualTripPlanner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'browse' | 'my-projects'>('create');
  const [tripProject, setTripProject] = useState<Partial<TripProject>>({
    title: '',
    description: '',
    budget: 1000,
    duration: 7,
    groupSize: 2,
    startDate: '',
    destinations: [],
    interests: [],
    requirements: '',
    status: 'draft'
  });

  const [publishedProjects] = useState<TripProject[]>([
    {
      id: '1',
      title: 'Cultural Heritage Tour of Northern Tunisia',
      description: 'Looking for an expert guide to help us explore the rich cultural heritage of northern Tunisia, including Carthage, Sidi Bou Said, and traditional crafts workshops.',
      budget: 1500,
      duration: 10,
      groupSize: 4,
      startDate: '2024-03-15',
      destinations: ['Tunis', 'Carthage', 'Sidi Bou Said', 'Nabeul'],
      interests: ['Cultural Heritage', 'Traditional Crafts', 'History'],
      requirements: 'Fluent in English and French, experience with cultural tours, knowledge of traditional crafts',
      status: 'published',
      author: {
        id: '1',
        name: 'Sarah Johnson',
        avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      },
      proposals: [
        {
          id: '1',
          guideId: '1',
          guideName: 'Youssef Khelifi',
          guideAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
          guideRating: 4.9,
          proposedPrice: 1200,
          message: 'I would love to guide your cultural heritage tour. With 8 years of experience and deep knowledge of traditional crafts, I can provide an authentic experience.',
          timeline: '10 days with flexible schedule',
          expertise: ['Cultural Tours', 'Traditional Crafts', 'Historical Sites'],
          submittedAt: new Date('2024-02-01')
        }
      ]
    }
  ]);

  const interests = [
    'Cultural Heritage', 'Nature & Wildlife', 'Adventure Sports', 'Local Cuisine',
    'Arts & Crafts', 'History', 'Beaches', 'Desert', 'Photography', 'Wellness'
  ];

  const destinations = [
    'Tunis', 'Sidi Bou Said', 'Carthage', 'Kairouan', 'Matmata', 'Djerba',
    'Sousse', 'Monastir', 'Nabeul', 'Tozeur', 'Douz', 'Chott el Djerid'
  ];

  const handleInterestToggle = (interest: string) => {
    setTripProject(prev => ({
      ...prev,
      interests: prev.interests?.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...(prev.interests || []), interest]
    }));
  };

  const handleDestinationToggle = (destination: string) => {
    setTripProject(prev => ({
      ...prev,
      destinations: prev.destinations?.includes(destination)
        ? prev.destinations.filter(d => d !== destination)
        : [...(prev.destinations || []), destination]
    }));
  };

  const handlePublishProject = () => {
    // Here you would typically send to backend
    console.log('Publishing trip project:', tripProject);
    alert('Trip project published! Local guides will be notified and can submit proposals.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Manual Trip Planning
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> Hub</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Create your trip project and collaborate with expert local guides to plan your perfect sustainable journey in Tunisia.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'create', label: 'Create Project', icon: Plus },
              { id: 'browse', label: 'Browse Projects', icon: Search },
              { id: 'my-projects', label: 'My Projects', icon: Users }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
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
          {/* Create Project Tab */}
          {activeTab === 'create' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-900">Create Your Trip Project</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Basic Information */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                    <input
                      type="text"
                      value={tripProject.title}
                      onChange={(e) => setTripProject(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Cultural Heritage Tour of Northern Tunisia"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={tripProject.description}
                      onChange={(e) => setTripProject(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your ideal trip, what you want to experience, and what makes it special..."
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Budget (TND)</label>
                      <input
                        type="number"
                        value={tripProject.budget}
                        onChange={(e) => setTripProject(prev => ({ ...prev, budget: Number(e.target.value) }))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Duration (days)</label>
                      <input
                        type="number"
                        value={tripProject.duration}
                        onChange={(e) => setTripProject(prev => ({ ...prev, duration: Number(e.target.value) }))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Group Size</label>
                      <input
                        type="number"
                        value={tripProject.groupSize}
                        onChange={(e) => setTripProject(prev => ({ ...prev, groupSize: Number(e.target.value) }))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                      <input
                        type="date"
                        value={tripProject.startDate}
                        onChange={(e) => setTripProject(prev => ({ ...prev, startDate: e.target.value }))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Destinations of Interest</label>
                    <div className="grid grid-cols-2 gap-2">
                      {destinations.map(destination => (
                        <button
                          key={destination}
                          onClick={() => handleDestinationToggle(destination)}
                          className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                            tripProject.destinations?.includes(destination)
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {destination}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Interests</label>
                    <div className="grid grid-cols-2 gap-2">
                      {interests.map(interest => (
                        <button
                          key={interest}
                          onClick={() => handleInterestToggle(interest)}
                          className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                            tripProject.interests?.includes(interest)
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Guide Requirements</label>
                    <textarea
                      value={tripProject.requirements}
                      onChange={(e) => setTripProject(prev => ({ ...prev, requirements: e.target.value }))}
                      placeholder="Specify language requirements, expertise needed, certifications, etc."
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setTripProject(prev => ({ ...prev, status: 'draft' }))}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Save as Draft
                </button>
                <button
                  onClick={handlePublishProject}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  Publish Project
                </button>
              </div>
            </div>
          )}

          {/* Browse Projects Tab */}
          {activeTab === 'browse' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Browse Trip Projects</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>

              <div className="grid gap-6">
                {publishedProjects.map(project => (
                  <div key={project.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={project.author.avatar} 
                          alt={project.author.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                          <p className="text-sm text-gray-600">by {project.author.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{project.budget} TND</div>
                        <div className="text-sm text-gray-500">Budget</div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{project.description}</p>

                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{project.duration} days</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{project.groupSize} people</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{project.destinations.length} destinations</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MessageCircle className="w-4 h-4" />
                        <span>{project.proposals.length} proposals</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.interests.map(interest => (
                        <span key={interest} className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                          {interest}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">Save</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                          <Share2 className="w-4 h-4" />
                          <span className="text-sm">Share</span>
                        </button>
                      </div>
                      <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Submit Proposal
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* My Projects Tab */}
          {activeTab === 'my-projects' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">My Trip Projects</h2>
              
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects yet</h3>
                <p className="text-gray-600 mb-6">Create your first trip project to get started with collaborative planning.</p>
                <button
                  onClick={() => setActiveTab('create')}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Create First Project
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManualTripPlanner;