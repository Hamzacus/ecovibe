import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Hero from './components/HomePage/Hero';
import Features from './components/HomePage/Features';
import Destinations from './components/HomePage/Destinations';
import ItineraryPlanner from './components/ItineraryPlanner/ItineraryPlanner';
import RewardsDashboard from './components/Gamification/RewardsDashboard';
import AnalyticsDashboard from './components/Analytics/AnalyticsDashboard';
import StoriesHub from './components/Stories/StoriesHub';
import CommunityHub from './components/Community/CommunityHub';
import DestinationDetails from './components/Destinations/DestinationDetails';
import UserProfile from './components/Profile/UserProfile';
import NewsfeedHub from './components/Newsfeed/NewsfeedHub';
import BlogPage from './components/Blog/BlogPage';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdvancedSearch from './components/Search/AdvancedSearch';
import EventsHub from './components/Events/EventsHub';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedDestinationId, setSelectedDestinationId] = useState<string | null>(null);

  const handleGetStarted = () => {
    setCurrentPage('itinerary');
  };

  const handleExploreDestinations = () => {
    setCurrentPage('analytics');
  };

  const handleDestinationSelect = (destinationId: string) => {
    setSelectedDestinationId(destinationId);
    setCurrentPage('destination-details');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedDestinationId(null);
  };
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onGetStarted={handleGetStarted} />
            <Features />
            <Destinations 
              onExplore={handleExploreDestinations}
              onDestinationSelect={handleDestinationSelect}
            />
          </>
        );
      case 'itinerary':
        return <ItineraryPlanner />;
      case 'rewards':
        return <RewardsDashboard />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'stories':
        return <StoriesHub />;
      case 'community':
        return <CommunityHub />;
      case 'destination-details':
        return selectedDestinationId ? (
          <DestinationDetails 
            destinationId={selectedDestinationId} 
            onBack={handleBackToHome}
          />
        ) : null;
      case 'profile':
        return <UserProfile onBack={handleBackToHome} />;
      case 'newsfeed':
        return <NewsfeedHub />;
      case 'blog':
        return <BlogPage />;
      case 'admin':
        return <AdminDashboard />;
      case 'search':
        return <AdvancedSearch />;
      case 'events':
        return <EventsHub />;
      default:
        return (
          <>
            <Hero onGetStarted={handleGetStarted} />
            <Features />
            <Destinations 
              onExplore={handleExploreDestinations}
              onDestinationSelect={handleDestinationSelect}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;