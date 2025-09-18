import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Hero from './components/HomePage/Hero';
import Features from './components/HomePage/Features';
import Destinations from './components/HomePage/Destinations';
import ItineraryPlanner from './components/ItineraryPlanner/ItineraryPlanner';
import ManualTripPlanner from './components/TripPlanning/ManualTripPlanner';
import RewardsDashboard from './components/Gamification/RewardsDashboard';
import AnalyticsDashboard from './components/Analytics/AnalyticsDashboard';
import StoriesHub from './components/Stories/StoriesHub';
import CommunityHub from './components/Community/CommunityHub';
import DestinationDetails from './components/Destinations/DestinationDetails';
import GuideProfile from './components/Guides/GuideProfile';
import EventDetails from './components/Events/EventDetails';
import UserProfile from './components/Profile/UserProfile';
import NewsfeedHub from './components/Newsfeed/NewsfeedHub';
import BlogPage from './components/Blog/BlogPage';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdvancedSearch from './components/Search/AdvancedSearch';
import EventsHub from './components/Events/EventsHub';
import MessagingSystem from './components/Messaging/MessagingSystem';
import AuthPages from './components/Auth/AuthPages';
import ProviderDashboard from './components/Dashboard/ProviderDashboard';
import SeekerDashboard from './components/Dashboard/SeekerDashboard';
import WishlistComparison from './components/Wishlist/WishlistComparison';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedDestinationId, setSelectedDestinationId] = useState<string | null>(null);
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<{mode: 'login' | 'register' | 'reset-password', userType: 'seeker' | 'provider'} | null>(null);

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

  const handleGuideSelect = (guideId: string) => {
    setSelectedGuideId(guideId);
    setCurrentPage('guide-profile');
  };

  const handleEventSelect = (eventId: string) => {
    setSelectedEventId(eventId);
    setCurrentPage('event-details');
  };
  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedDestinationId(null);
    setSelectedGuideId(null);
    setSelectedEventId(null);
  };

  const handleAuthRequest = (mode: 'login' | 'register' | 'reset-password', userType: 'seeker' | 'provider') => {
    setAuthMode({ mode, userType });
  };

  // Show auth pages if requested
  if (authMode) {
    return (
      <AuthPages 
        mode={authMode.mode} 
        userType={authMode.userType} 
        onBack={() => setAuthMode(null)} 
      />
    );
  }

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
      case 'manual-trip-planner':
        return <ManualTripPlanner />;
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
      case 'guide-profile':
        return selectedGuideId ? (
          <GuideProfile 
            guideId={selectedGuideId} 
            onBack={handleBackToHome}
          />
        ) : null;
      case 'event-details':
        return selectedEventId ? (
          <EventDetails 
            eventId={selectedEventId} 
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
      case 'messages':
        return <MessagingSystem />;
      case 'provider-dashboard':
        return <ProviderDashboard />;
      case 'seeker-dashboard':
        return <SeekerDashboard />;
      case 'wishlist':
        return <WishlistComparison />;
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
      <Header 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        onAuthRequest={handleAuthRequest}
      />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;