import React, { useState } from 'react';
import { BookOpen, Play, Heart, Eye, Clock, Volume2 } from 'lucide-react';
import { stories } from '../../data/mockData';
import PageHeader from '../UI/PageHeader';
import SearchFilter from '../UI/SearchFilter';
import Card from '../UI/Card';
import InteractionButtons from '../UI/InteractionButtons';
import Breadcrumb from '../UI/Breadcrumb';
import NavigationContext from '../UI/NavigationContext';

const StoriesHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { id: 'all', label: 'All Stories', icon: '📚' },
    { id: 'Cultural Heritage', label: 'Cultural Heritage', icon: '🏛️' },
    { id: 'Music & Arts', label: 'Music & Arts', icon: '🎵' },
    { id: 'Traditional Crafts', label: 'Traditional Crafts', icon: '🏺' },
    { id: 'Culinary Traditions', label: 'Culinary Traditions', icon: '🍴' },
    { id: 'Local Legends', label: 'Local Legends', icon: '📜' }
  ];

  const filteredStories = stories.filter(story => 
    (selectedCategory === 'all' || story.category === selectedCategory) &&
    (searchQuery === '' || story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     story.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
     story.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const featuredStory = stories[0];

  const breadcrumbItems = [
    { label: 'Learn', onClick: () => {} },
    { label: 'Cultural Stories', isActive: true }
  ];

  if (selectedStory) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb 
          items={[
            ...breadcrumbItems,
            { label: selectedStory.title, isActive: true }
          ]} 
          className="mb-6" 
        />
        <button 
          onClick={() => setSelectedStory(null)}
          className="mb-6 flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
        >
          <span>←</span>
          <span>Back to Stories</span>
        </button>

        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="relative h-64 md:h-80">
            <img 
              src={selectedStory.image} 
              alt={selectedStory.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            {selectedStory.audioUrl && (
              <button className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                <Volume2 className="w-6 h-6" />
              </button>
            )}
            
            <div className="absolute bottom-6 left-6 text-white">
              <div className="inline-block px-3 py-1 bg-green-600 rounded-full text-sm font-medium mb-3">
                {selectedStory.category}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{selectedStory.title}</h1>
              <div className="flex items-center space-x-4 text-green-100">
                <span>By {selectedStory.author}</span>
                <span>•</span>
                <span>{selectedStory.location}</span>
                <span>•</span>
                <span>{selectedStory.readTime}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{selectedStory.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>{selectedStory.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{selectedStory.readTime}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span>Like</span>
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                  Share
                </button>
              </div>
            </div>

            {/* Story Content */}
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {selectedStory.content}
              </p>
              
              <p className="text-gray-600 leading-relaxed">
                In the heart of {selectedStory.location}, where ancient traditions meet modern aspirations, 
                this story unfolds as a testament to the resilience and beauty of Tunisian culture. 
                Through the voices of local artisans, historians, and community members, we discover 
                how heritage preservation becomes a bridge between past and future.
              </p>
              
              <p className="text-gray-600 leading-relaxed">
                The intricate patterns of traditional craftsmanship tell stories of generations past, 
                while innovative approaches to cultural preservation ensure these treasures will inspire 
                future generations. Each technique, each song, each story shared represents a living 
                library of human experience and cultural identity.
              </p>
            </div>

            {/* Cultural Context */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Cultural Context</h3>
                <p className="text-gray-600 text-sm">{selectedStory.culturalContext}</p>
              </div>
              
              <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Preservation Impact</h3>
                <p className="text-gray-600 text-sm">{selectedStory.preservationImpact}</p>
              </div>
            </div>

            {/* Author Info */}
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About the Storyteller</h3>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  {selectedStory.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{selectedStory.author}</h4>
                  <p className="text-sm text-gray-600">Cultural Heritage Advocate • {selectedStory.location}</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} className="mb-6" />

      {/* Header */}
      <PageHeader
        badge={{
          icon: BookOpen,
          text: 'Cultural Stories',
          color: 'indigo'
        }}
        title="Voices of Tunisia"
        subtitle="Discover authentic stories from local communities, traditional craftspeople, and cultural guardians preserving Tunisia's rich heritage."
      />

      {/* Search and Filter */}
      <SearchFilter
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search stories, authors, or locations..."
        filterValue={selectedCategory}
        onFilterChange={setSelectedCategory}
        filterOptions={categories.map(cat => ({ value: cat.id, label: cat.label }))}
        className="mb-8"
      />

      {/* Navigation Context */}
      <NavigationContext
        title="Cultural Stories"
        subtitle="Discover authentic narratives from local communities"
        showViewToggle={true}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        showFilter={true}
        className="mb-6"
      />

      {/* Featured Story */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Story</h2>
        <Card
          variant="simple"
          onClick={() => setSelectedStory(featuredStory)}
          className="shadow-lg overflow-hidden group hover:shadow-xl"
        >
          <div className="md:flex">
            <div className="md:w-1/2 relative">
              <img 
                src={featuredStory.image} 
                alt={featuredStory.title}
                className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {featuredStory.audioUrl && (
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                  <Play className="w-5 h-5" />
                </div>
              )}
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 bg-indigo-600 text-white rounded-full text-sm font-medium">
                  Featured
                </span>
              </div>
            </div>
            
            <div className="md:w-1/2 p-8">
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium">
                  {featuredStory.category}
                </span>
                <span className="text-xs text-gray-500">• {featuredStory.location}</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">
                {featuredStory.title}
              </h3>
              
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                {featuredStory.content.substring(0, 150)}...
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">{featuredStory.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{featuredStory.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{featuredStory.readTime}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-medium text-gray-900">{featuredStory.author}</p>
                  <p className="text-sm text-gray-500">Cultural Heritage Advocate</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Stories Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Stories</h2>
        <div className={`${viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}`}>
          {filteredStories.map((story) => (
            <Card
              key={story.id}
              variant="content"
              image={story.image}
              title={story.title}
              description={story.content}
              onClick={() => setSelectedStory(story)}
              className="cursor-pointer group hover:-translate-y-1"
              badges={[{ text: story.category, color: 'bg-black/50 backdrop-blur-sm text-white' }]}
              metadata={[
                { icon: Eye, text: story.location },
                { icon: Clock, text: story.readTime }
              ]}
              actions={
                <div className="flex items-center justify-between">
                  <InteractionButtons
                    views={story.views}
                    likes={story.likes}
                  />
                  <div className="text-right">
                    <p className="font-medium text-gray-900 text-sm">{story.author}</p>
                    <p className="text-xs text-gray-500">Storyteller</p>
                  </div>
                </div>
              }
            >
              {story.audioUrl && (
                <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                  <Play className="w-4 h-4" />
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-12 border border-indigo-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Share Your Story</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Have a cultural heritage story to tell? Join our community of storytellers and help preserve Tunisia's rich traditions for future generations.
        </p>
        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200">
          Become a Storyteller
        </button>
      </div>
    </div>
  );
};

export default StoriesHub;