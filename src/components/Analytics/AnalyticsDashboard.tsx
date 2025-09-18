import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, MapPin, Calendar, Eye, Activity, Zap } from 'lucide-react';
import { analyticsData } from '../../data/mockData';
import PageHeader from '../UI/PageHeader';
import Card from '../UI/Card';
import Breadcrumb from '../UI/Breadcrumb';
import NavigationContext from '../UI/NavigationContext';

const AnalyticsDashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const timeRanges = [
    { id: '24h', label: '24 Hours' },
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '3 Months' }
  ];

  const regions = [
    { id: 'all', label: 'All Tunisia' },
    { id: 'north', label: 'Northern Tunisia' },
    { id: 'center', label: 'Central Tunisia' },
    { id: 'south', label: 'Southern Tunisia' },
    { id: 'coastal', label: 'Coastal Areas' }
  ];

  const getCrowdColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const sustainabilityTrend = [
    { month: 'Jan', score: 78 },
    { month: 'Feb', score: 82 },
    { month: 'Mar', score: 85 },
    { month: 'Apr', score: 88 },
    { month: 'May', score: 91 },
    { month: 'Jun', score: 89 }
  ];

  const breadcrumbItems = [
    { label: 'Discover', onClick: () => {} },
    { label: 'Travel Insights', isActive: true }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} className="mb-6" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <PageHeader
          badge={{ icon: BarChart3, text: 'Travel Insights', color: 'blue' }}
          title="Real-time Tourism Intelligence"
          subtitle="Real-time insights for sustainable tourism in Tunisia"
          className="text-left mb-0"
        />
        <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {timeRanges.map(range => (
              <option key={range.id} value={range.id}>{range.label}</option>
            ))}
          </select>

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {regions.map(region => (
              <option key={region.id} value={region.id}>{region.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Navigation Context */}
      <NavigationContext
        title="Dashboard Overview"
        subtitle="Monitor tourism trends and sustainability metrics"
        showFilter={true}
        showSort={true}
        className="mb-6"
      />

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card
          variant="stat"
          icon={TrendingUp}
          value={analyticsData.sustainabilityMetrics.totalCarbonSaved.toLocaleString()}
          label="Tonnes CO₂ Saved"
          color="green"
          trend="+12.5%"
        />
        <Card
          variant="stat"
          icon={Users}
          value="2,847"
          label="Active Travelers"
          color="blue"
          trend="+8.3%"
        />
        <Card
          variant="stat"
          icon={MapPin}
          value={analyticsData.sustainabilityMetrics.localBusinessesSupported}
          label="Local Partners"
          color="purple"
          trend="+15.7%"
        />
        <Card
          variant="stat"
          icon={Activity}
          value={analyticsData.sustainabilityMetrics.culturalProjectsFunded}
          label="Heritage Projects"
          color="yellow"
          trend="+22.1%"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Destination Popularity Trends */}
        <Card variant="simple" className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Destination Popularity Trends</h2>
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-500">Live data</span>
            </div>
          </div>

          <div className="space-y-4">
            {analyticsData.destinationTrends.map((destination, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{destination.destination}</h3>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        destination.growth > 15 ? 'bg-green-100 text-green-600' :
                        destination.growth > 10 ? 'bg-yellow-100 text-yellow-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        +{destination.growth}% growth
                      </span>
                      <span className="text-sm font-medium text-gray-600">
                        {destination.popularity}% popularity
                      </span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full h-2 transition-all duration-500"
                      style={{ width: `${destination.popularity}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Real-time Crowd Predictions */}
        <Card variant="simple" className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Crowd Predictions</h2>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-green-500" />
              <span className="text-sm text-green-600">Live</span>
            </div>
          </div>

          <div className="space-y-4">
            {analyticsData.crowdPredictions.map((prediction, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{prediction.destination}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCrowdColor(prediction.current)}`}>
                    {prediction.current}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3 text-sm">
                  <span className="text-gray-600">In {prediction.timeframe}:</span>
                  <span className={`font-medium ${
                    prediction.predicted === 'low' ? 'text-green-600' :
                    prediction.predicted === 'medium' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {prediction.predicted} crowds
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="font-medium text-blue-900">Best Visit Times Today</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Sidi Bou Said</span>
                <span className="text-green-600 font-medium">8-10 AM, 5-7 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">La Medina</span>
                <span className="text-green-600 font-medium">9-11 AM, 4-6 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Carthage</span>
                <span className="text-green-600 font-medium">7-9 AM, 6-8 PM</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Sustainability Progress Chart */}
      <Card variant="simple" className="p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Sustainability Score Trend</h2>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">89%</div>
            <div className="text-sm text-gray-500">Current Average</div>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-4 h-48">
          {sustainabilityTrend.map((data, index) => (
            <div key={index} className="flex flex-col items-center justify-end">
              <div 
                className="w-8 bg-gradient-to-t from-green-500 to-emerald-400 rounded-t transition-all duration-500 hover:from-green-600 hover:to-emerald-500"
                style={{ height: `${data.score}%` }}
              ></div>
              <div className="text-xs text-gray-600 mt-2">{data.month}</div>
              <div className="text-xs font-medium text-green-600">{data.score}%</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Impact Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🌳</span>
          </div>
          <div className="text-2xl font-bold text-green-600 mb-1">
            {analyticsData.sustainabilityMetrics.treesPlanted.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Trees Planted</div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💧</span>
          </div>
          <div className="text-2xl font-bold text-blue-600 mb-1">847L</div>
          <div className="text-sm text-gray-600">Water Saved/Day</div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🏺</span>
          </div>
          <div className="text-2xl font-bold text-purple-600 mb-1">125</div>
          <div className="text-sm text-gray-600">Artisan Families Supported</div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎓</span>
          </div>
          <div className="text-2xl font-bold text-yellow-600 mb-1">89</div>
          <div className="text-sm text-gray-600">Cultural Education Programs</div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;