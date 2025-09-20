import React, { useState } from 'react';
import { Eye, Heart, Star, Calendar, Users, MapPin } from 'lucide-react';
import AccessibleCarousel from '../UI/AccessibleCarousel';
import AccessibleInfiniteScroll from '../UI/AccessibleInfiniteScroll';
import AccessibleDropdown from '../UI/AccessibleDropdown';
import AccessibleModal from '../UI/AccessibleModal';
import AccessibleTabs from '../UI/AccessibleTabs';
import AccessibleForm from '../UI/AccessibleForm';
import AccessibleTooltip from '../UI/AccessibleTooltip';
import ProgressiveImage from '../UI/ProgressiveImage';

const AccessibilityDemo: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Sample data for carousel
  const carouselItems = [
    {
      id: '1',
      title: 'Sidi Bou Said',
      description: 'Beautiful blue and white village',
      image: 'https://images.pexels.com/photos/12892812/pexels-photo-12892812.jpeg?auto=compress&cs=tinysrgb&w=800',
      content: (
        <div className="relative h-64 bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Sidi Bou Said</h3>
            <p className="text-blue-100">Beautiful blue and white village</p>
          </div>
        </div>
      )
    },
    {
      id: '2',
      title: 'Carthage',
      description: 'Ancient archaeological site',
      image: 'https://images.pexels.com/photos/11041282/pexels-photo-11041282.jpeg?auto=compress&cs=tinysrgb&w=800',
      content: (
        <div className="relative h-64 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Carthage</h3>
            <p className="text-purple-100">Ancient archaeological site</p>
          </div>
        </div>
      )
    },
    {
      id: '3',
      title: 'Matmata',
      description: 'Traditional underground homes',
      image: 'https://images.pexels.com/photos/11742091/pexels-photo-11742091.jpeg?auto=compress&cs=tinysrgb&w=800',
      content: (
        <div className="relative h-64 bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Matmata</h3>
            <p className="text-orange-100">Traditional underground homes</p>
          </div>
        </div>
      )
    }
  ];

  // Sample data for infinite scroll
  const [scrollItems, setScrollItems] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      id: `item-${i}`,
      title: `Destination ${i + 1}`,
      location: `Tunisia Location ${i + 1}`,
      rating: 4 + Math.random(),
      image: `https://images.pexels.com/photos/12892812/pexels-photo-12892812.jpeg?auto=compress&cs=tinysrgb&w=400`
    }))
  );

  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMoreItems = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newItems = Array.from({ length: 10 }, (_, i) => ({
      id: `item-${scrollItems.length + i}`,
      title: `Destination ${scrollItems.length + i + 1}`,
      location: `Tunisia Location ${scrollItems.length + i + 1}`,
      rating: 4 + Math.random(),
      image: `https://images.pexels.com/photos/11742091/pexels-photo-11742091.jpeg?auto=compress&cs=tinysrgb&w=400`
    }));

    setScrollItems(prev => [...prev, ...newItems]);
    setLoading(false);
    
    // Stop loading more after 50 items for demo
    if (scrollItems.length >= 40) {
      setHasMore(false);
    }
  };

  const renderScrollItem = (item: any, index: number) => (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <ProgressiveImage
        src={item.image}
        alt={item.title}
        className="h-48"
        lazy={index > 5} // Only lazy load items beyond the first few
      />
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{item.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-medium">{item.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Language options for dropdown
  const languageOptions = [
    { value: 'en', label: 'English', description: 'English language' },
    { value: 'fr', label: 'Français', description: 'French language' },
    { value: 'ar', label: 'العربية', description: 'Arabic language' },
    { value: 'tn', label: 'دارجة تونسية', description: 'Tunisian dialect' }
  ];

  // Form fields for demo
  const formFields = [
    {
      id: 'name',
      type: 'text' as const,
      label: 'Full Name',
      placeholder: 'Enter your full name',
      required: true,
      autoComplete: 'name'
    },
    {
      id: 'email',
      type: 'email' as const,
      label: 'Email Address',
      placeholder: 'Enter your email',
      required: true,
      autoComplete: 'email',
      validation: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      }
    },
    {
      id: 'interests',
      type: 'checkbox' as const,
      label: 'I am interested in sustainable travel',
      description: 'Check this if you want to receive updates about eco-friendly travel options'
    }
  ];

  // Tab content for demo
  const tabContent = [
    {
      id: 'overview',
      label: 'Overview',
      icon: Eye,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Accessibility Overview</h3>
          <p className="text-gray-600">
            This demo showcases accessible alternatives to common problematic UI patterns.
            All components follow WCAG 2.1 AA guidelines and include progressive enhancement.
          </p>
          <ul className="space-y-2 text-gray-600">
            <li>• Keyboard navigation support</li>
            <li>• Screen reader compatibility</li>
            <li>• Reduced motion preferences</li>
            <li>• High contrast mode support</li>
            <li>• Touch-friendly interactions</li>
          </ul>
        </div>
      )
    },
    {
      id: 'features',
      label: 'Features',
      icon: Star,
      badge: 'New',
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Accessibility Features</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">Keyboard Navigation</h4>
              <p className="text-sm text-green-800">Full keyboard support with logical tab order</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">Screen Reader Support</h4>
              <p className="text-sm text-blue-800">Proper ARIA labels and live regions</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'guidelines',
      label: 'Guidelines',
      icon: Users,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Implementation Guidelines</h3>
          <div className="space-y-3">
            <div className="p-4 border-l-4 border-green-500 bg-green-50">
              <h4 className="font-medium text-green-900">Do: Use semantic HTML</h4>
              <p className="text-sm text-green-800">Always use appropriate HTML elements for their intended purpose</p>
            </div>
            <div className="p-4 border-l-4 border-red-500 bg-red-50">
              <h4 className="font-medium text-red-900">Don't: Rely only on color</h4>
              <p className="text-sm text-red-800">Always provide additional visual or textual cues beyond color</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Accessibility Demo
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore accessible alternatives to common UI patterns. All components support keyboard navigation, 
          screen readers, and respect user preferences for motion and contrast.
        </p>
      </div>

      {/* Accessible Carousel */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Accessible Carousel</h2>
          <p className="text-gray-600 mb-4">
            Replaces auto-playing carousels with user-controlled navigation, keyboard support, 
            and respect for motion preferences.
          </p>
        </div>
        
        <AccessibleCarousel
          items={carouselItems}
          autoPlay={true}
          showDots={true}
          showThumbnails={true}
          ariaLabel="Featured destinations carousel"
          className="max-w-4xl mx-auto"
        />
      </section>

      {/* Accessible Infinite Scroll */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Accessible Infinite Scroll</h2>
          <p className="text-gray-600 mb-4">
            Provides manual load controls, respects reduced motion preferences, 
            and includes proper loading states and error handling.
          </p>
        </div>

        <AccessibleInfiniteScroll
          items={scrollItems}
          renderItem={renderScrollItem}
          loadMore={loadMoreItems}
          hasMore={hasMore}
          loading={loading}
          ariaLabel="Destinations list"
          enableManualLoad={true}
          showViewToggle={true}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          className="max-w-6xl mx-auto"
        />
      </section>

      {/* Accessible Dropdown */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Accessible Dropdown</h2>
          <p className="text-gray-600 mb-4">
            Replaces complex dropdowns with keyboard-navigable, searchable alternatives 
            that work well with assistive technologies.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <AccessibleDropdown
            options={languageOptions}
            value={selectedLanguage}
            onChange={(value) => setSelectedLanguage(value as string)}
            label="Select Language"
            description="Choose your preferred language for the interface"
            searchable={true}
            placeholder="Choose a language..."
          />
        </div>
      </section>

      {/* Accessible Tabs */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Accessible Tabs</h2>
          <p className="text-gray-600 mb-4">
            Keyboard-navigable tabs with proper ARIA attributes and alternative navigation for screen readers.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <AccessibleTabs
            tabs={tabContent}
            variant="underline"
          />
        </div>
      </section>

      {/* Accessible Form */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Accessible Form</h2>
          <p className="text-gray-600 mb-4">
            Forms with proper labeling, error handling, validation feedback, and progress indicators.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <AccessibleForm
            fields={formFields}
            onSubmit={(data) => console.log('Form submitted:', data)}
            submitLabel="Subscribe"
            showProgress={true}
          />
        </div>
      </section>

      {/* Progressive Image Loading */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Progressive Image Loading</h2>
          <p className="text-gray-600 mb-4">
            Images with lazy loading, progressive enhancement, and proper fallbacks.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[1, 2, 3].map((i) => (
            <ProgressiveImage
              key={i}
              src={`https://images.pexels.com/photos/1293120${i}/pexels-photo-1293120${i}.jpeg?auto=compress&cs=tinysrgb&w=400`}
              alt={`Traditional pottery example ${i}`}
              className="h-48 rounded-lg"
              lazy={i > 1}
              fallback={
                <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="w-8 h-8 mx-auto mb-2">🏺</div>
                    <p className="text-sm">Pottery Image {i}</p>
                  </div>
                </div>
              }
            />
          ))}
        </div>
      </section>

      {/* Tooltips and Help */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Accessible Tooltips</h2>
          <p className="text-gray-600 mb-4">
            Tooltips that work with keyboard navigation and screen readers.
          </p>
        </div>

        <div className="flex justify-center space-x-8">
          <AccessibleTooltip content="This button saves the item to your wishlist">
            <button className="flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors">
              <Heart className="w-4 h-4" />
              <span>Save to Wishlist</span>
            </button>
          </AccessibleTooltip>

          <AccessibleTooltip content="View detailed information about this destination" placement="bottom">
            <button className="flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors">
              <Eye className="w-4 h-4" />
              <span>View Details</span>
            </button>
          </AccessibleTooltip>

          <AccessibleTooltip content="Book this experience for your trip" placement="left">
            <button className="flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors">
              <Calendar className="w-4 h-4" />
              <span>Book Now</span>
            </button>
          </AccessibleTooltip>
        </div>
      </section>

      {/* Modal Demo */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Accessible Modal</h2>
          <p className="text-gray-600 mb-4">
            Modal dialogs with proper focus management, keyboard trapping, and escape handling.
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Open Modal Demo
          </button>
        </div>

        <AccessibleModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Accessibility Features"
          description="This modal demonstrates accessible design patterns"
          variant="info"
          actions={
            <>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Got it
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              This modal includes:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Focus trapping within the modal</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Escape key to close</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Focus restoration when closed</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Proper ARIA attributes</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Backdrop click to close (optional)</span>
              </li>
            </ul>
          </div>
        </AccessibleModal>
      </section>

      {/* Accessibility Guidelines */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Accessibility Implementation Guidelines</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">✅ Best Practices Implemented</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Semantic HTML:</strong> Proper use of headings, landmarks, and form elements</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Keyboard Navigation:</strong> All interactive elements accessible via keyboard</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>ARIA Labels:</strong> Comprehensive labeling for screen readers</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Focus Management:</strong> Logical focus order and visible indicators</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Color Contrast:</strong> WCAG AA compliant color combinations</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Motion Preferences:</strong> Respect for reduced motion settings</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🔧 Progressive Enhancement</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Graceful Degradation:</strong> Core functionality works without JavaScript</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Alternative Interfaces:</strong> List views for complex interactions</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Manual Controls:</strong> User-initiated actions over automatic behaviors</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Error Recovery:</strong> Clear error messages and retry mechanisms</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Performance:</strong> Lazy loading with proper loading states</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Customization:</strong> User-controlled accessibility preferences</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Keyboard Shortcuts</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Skip to main content:</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-800">Tab</kbd>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Open search:</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-800">Alt + S</kbd>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Navigate carousel:</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-800">← →</kbd>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Close modal:</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-800">Esc</kbd>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Toggle menu:</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-800">Alt + M</kbd>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Accessibility settings:</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-800">Alt + A</kbd>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccessibilityDemo;