import React, { useState } from 'react';
import { Users, MessageCircle, Calendar, Plus, Camera, MapPin } from 'lucide-react';
import { localGuides, communityPosts } from '../../data/mockData';
import PageHeader from '../UI/PageHeader';
import TabNavigation from '../UI/TabNavigation';
import SearchFilter from '../UI/SearchFilter';
import UserCard from '../UI/UserCard';
import Card from '../UI/Card';
import InteractionButtons from '../UI/InteractionButtons';
import Breadcrumb from '../UI/Breadcrumb';
import NavigationContext from '../UI/NavigationContext';
import QuickActions from '../UI/QuickActions';

const CommunityHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [newPost, setNewPost] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterOpen, setFilterOpen] = useState(false);

  const tabs = [
    { id: 'posts', label: 'Community Posts', icon: MessageCircle },
    { id: 'guides', label: 'Local Guides', icon: Users },
    { id: 'events', label: 'Events', icon: Calendar }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Guides' },
    { value: 'verified', label: 'Verified Only' },
    { value: 'top-rated', label: 'Top Rated' },
    { value: 'available', label: 'Available Now' }
  ];

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      // Here you would typically send the post to your backend
      setNewPost('');
      setSelectedLocation('');
      setShowNewPostForm(false);
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const breadcrumbItems = [
    { label: 'Community', onClick: () => {} },
    { label: activeTab === 'posts' ? 'Posts' : activeTab === 'guides' ? 'Local Guides' : 'Events', isActive: true }
  ];

  const quickActions = [
    { id: 'new-post', label: 'New Post', icon: Plus, onClick: () => setShowNewPostForm(true), variant: 'primary' as const },
    { id: 'search', label: 'Search', icon: Users, onClick: () => {}, variant: 'secondary' as const },
    { id: 'filter', label: 'Filter', icon: MessageCircle, onClick: () => setFilterOpen(!filterOpen), variant: 'ghost' as const }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} className="mb-6" />

      {/* Header */}
      <PageHeader
        badge={{
          icon: Users,
          text: 'Community Hub',
          color: 'purple'
        }}
        title="Connect with Fellow Travelers"
        subtitle="Join a vibrant community of sustainable travelers, local guides, and cultural enthusiasts exploring Tunisia together."
        stats={[
          { value: '2,847', label: 'Active Members' },
          { value: '1,234', label: 'Stories Shared' },
          { value: '156', label: 'Verified Guides' },
          { value: '89', label: 'Upcoming Events' }
        ]}
      />

      {/* Navigation Tabs */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="mb-8"
      />

      {/* Navigation Context */}
      <NavigationContext
        title={`${activeTab === 'posts' ? 'Community Posts' : activeTab === 'guides' ? 'Local Guides' : 'Events'}`}
        subtitle={`${activeTab === 'posts' ? 'Share experiences and connect' : activeTab === 'guides' ? 'Find verified local experts' : 'Upcoming community events'}`}
        showViewToggle={activeTab === 'guides'}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        showFilter={true}
        onFilterClick={() => setFilterOpen(!filterOpen)}
        actions={<QuickActions actions={quickActions} />}
        className="mb-6"
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6">
          {/* Community Posts Tab */}
          {activeTab === 'posts' && (
            <div className="space-y-6">
              {/* Create New Post */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                {!showNewPostForm ? (
                  <button
                    onClick={() => setShowNewPostForm(true)}
                    className="flex items-center space-x-3 w-full text-left"
                  >
                    <img 
                      src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
                      alt="Your avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 bg-white rounded-full px-4 py-3 text-gray-500 hover:bg-gray-100 transition-colors">
                      Share your Tunisia travel experience...
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
                        <Camera className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                        <MapPin className="w-5 h-5" />
                      </button>
                    </div>
                  </button>
                ) : (
                  <div className="space-y-4">
                    <textarea
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder="Share your experience, tips, or ask questions about sustainable travel in Tunisia..."
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      rows={4}
                    />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <select
                          value={selectedLocation}
                          onChange={(e) => setSelectedLocation(e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="">Select Location</option>
                          <option value="sidi-bou-said">Sidi Bou Said</option>
                          <option value="carthage">Carthage</option>
                          <option value="kairouan">Kairouan</option>
                          <option value="matmata">Matmata</option>
                          <option value="djerba">Djerba</option>
                        </select>
                        
                        <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-purple-600 transition-colors">
                          <Camera className="w-4 h-4" />
                          <span className="text-sm">Add Photo</span>
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setShowNewPostForm(false)}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handlePostSubmit}
                          disabled={!newPost.trim()}
                          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Share Post
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Posts Feed */}
              <div className="space-y-6">
                {communityPosts.map((post) => (
                  <Card key={post.id} variant="simple" className="border border-gray-200 overflow-hidden">
                    {/* Post Header */}
                    <div className="p-6 pb-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name}
                          className="w-12 h-12 rounded-full border-2 border-gray-200"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>{post.location} • {formatTimestamp(post.timestamp)}</span>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                          <span className="sr-only">More options</span>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                      </div>

                      {/* Post Content */}
                      <p className="text-gray-800 mb-4">{post.content}</p>

                      {/* Post Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Post Images */}
                    {post.images.length > 0 && (
                      <div className="px-6 pb-4">
                        <div className="grid grid-cols-1 gap-2 rounded-xl overflow-hidden">
                          {post.images.map((image, index) => (
                            <img 
                              key={index}
                              src={image} 
                              alt={`Post image ${index + 1}`}
                              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Post Actions */}
                    <div className="px-6 py-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <InteractionButtons
                          likes={post.likes}
                          comments={post.comments.length}
                          shares={0}
                        />
                        <div className="text-xs text-gray-400">
                          {post.views || Math.floor(Math.random() * 100) + 50} views
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Local Guides Tab */}
          {activeTab === 'guides' && (
            <div className="space-y-6">
              {/* Search and Filter */}
              <SearchFilter
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                searchPlaceholder="Search guides by name, location, or specialty..."
                filterOptions={filterOptions}
                className="mb-6"
              />

              {/* Guides Grid */}
              <div className={`${viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
                {localGuides.map((guide) => (
                  <UserCard
                    key={guide.id}
                    id={guide.id}
                    name={guide.name}
                    avatar={guide.avatar}
                    location={guide.location}
                    rating={guide.rating}
                    reviewCount={guide.reviewCount}
                    specialties={guide.specialties}
                    languages={guide.languages}
                    price={{
                      amount: guide.pricePerDay,
                      currency: 'TND',
                      period: 'day'
                    }}
                    about={guide.about}
                    verified={guide.verified}
                    actions={
                      <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200">
                        Contact Guide
                      </button>
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Events Coming Soon!</h3>
                <p className="text-gray-600 mb-6">
                  We're working on bringing you amazing cultural events and sustainable travel meetups.
                </p>
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200">
                  Notify Me of Events
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityHub;