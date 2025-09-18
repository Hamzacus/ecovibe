import React from 'react';
import { MapPin, Star, Clock, Users, Leaf, TrendingUp } from 'lucide-react';
import { destinations } from '../../data/mockData';
import PageHeader from '../UI/PageHeader';
import Card from '../UI/Card';
import Badge from '../UI/Badge';

interface DestinationsProps {
  onExplore: () => void;
  onDestinationSelect?: (destinationId: string) => void;
}

const Destinations: React.FC<DestinationsProps> = ({ onExplore, onDestinationSelect }) => {
  const getCrowdLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCrowdLevelText = (level: string) => {
    switch (level) {
      case 'low': return 'Quiet';
      case 'medium': return 'Moderate';
      case 'high': return 'Busy';
      default: return 'Unknown';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <PageHeader
          badge={{
            icon: MapPin,
            text: 'Featured Destinations',
            color: 'green'
          }}
          title="Explore Authentic Tunisian Destinations"
          subtitle="From ancient Carthaginian ruins to traditional Berber villages, discover Tunisia's most captivating destinations while supporting local communities."
        />

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <Card
              key={destination.id}
              variant="content"
              image={destination.image}
              title={destination.name}
              subtitle={`${destination.region} • ${destination.nameArabic}`}
              description={destination.description}
              rating={4 + Math.floor(Math.random() * 1)}
              onClick={() => onDestinationSelect ? onDestinationSelect(destination.id) : onExplore()}
              className="group hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
              badges={[
                { 
                  text: getCrowdLevelText(destination.crowdLevel), 
                  color: getCrowdLevelColor(destination.crowdLevel) 
                },
                { 
                  text: `${destination.sustainabilityScore}%`, 
                  color: 'bg-white/90 backdrop-blur-sm text-green-600' 
                }
              ]}
              metadata={[
                { icon: Star, text: `4.${Math.floor(Math.random() * 3) + 6}` },
                { icon: Clock, text: destination.bestVisitTime },
                { icon: Users, text: `${destination.averageCost} TND` }
              ]}
              actions={
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {destination.activities.slice(0, 2).map((activity, idx) => (
                      <Badge 
                        key={idx}
                        text={activity.replace('-', ' ')}
                        variant="default"
                        size="sm"
                      />
                    ))}
                    {destination.activities.length > 2 && (
                      <Badge 
                        text={`+${destination.activities.length - 2} more`}
                        variant="success"
                        size="sm"
                      />
                    )}
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 group">
                    <span>{onDestinationSelect ? 'View Details' : 'Explore Destination'}</span>
                    <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              }
            >
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button 
            onClick={onExplore}
            className="bg-white text-green-600 border-2 border-green-600 px-8 py-4 rounded-xl font-medium hover:bg-green-600 hover:text-white transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  );
};

export default Destinations;