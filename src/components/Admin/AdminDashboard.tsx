import React, { useState } from 'react';
import { Settings, Users, MapPin, Calendar, BookOpen, BarChart3, Bell, Globe, Shield, Eye, EyeOff, Edit, Save, X } from 'lucide-react';

interface PageStatus {
  id: string;
  name: string;
  path: string;
  isActive: boolean;
  lastModified: Date;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pages');
  const [pages, setPages] = useState<PageStatus[]>([
    { id: '1', name: 'Home', path: '/', isActive: true, lastModified: new Date() },
    { id: '2', name: 'Search', path: '/search', isActive: true, lastModified: new Date() },
    { id: '3', name: 'Plan Trip', path: '/plan-trip', isActive: true, lastModified: new Date() },
    { id: '4', name: 'Community', path: '/community', isActive: true, lastModified: new Date() },
    { id: '5', name: 'Travel Feed', path: '/travel-feed', isActive: true, lastModified: new Date() },
    { id: '6', name: 'Stories', path: '/stories', isActive: true, lastModified: new Date() },
    { id: '7', name: 'Travel Insights', path: '/insights', isActive: true, lastModified: new Date() },
    { id: '8', name: 'Local Guides', path: '/guides', isActive: true, lastModified: new Date() },
    { id: '9', name: 'Events', path: '/events', isActive: true, lastModified: new Date() }
  ]);

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: true
  });

  const [languages, setLanguages] = useState([
    { code: 'en', name: 'English', isActive: true },
    { code: 'fr', name: 'Français', isActive: true },
    { code: 'ar', name: 'العربية', isActive: true },
    { code: 'tn', name: 'Darja Tounsiya', isActive: false }
  ]);

  const togglePageStatus = (pageId: string) => {
    setPages(pages.map(page => 
      page.id === pageId 
        ? { ...page, isActive: !page.isActive, lastModified: new Date() }
        : page
    ));
  };

  const toggleLanguage = (langCode: string) => {
    setLanguages(languages.map(lang =>
      lang.code === langCode
        ? { ...lang, isActive: !lang.isActive }
        : lang
    ));
  };

  const tabs = [
    { id: 'pages', label: 'Page Management', icon: Settings },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'content', label: 'Content Management', icon: BookOpen },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'languages', label: 'Languages', icon: Globe },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your EcoVibe platform</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-600 text-purple-600'
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
          {/* Page Management Tab */}
          {activeTab === 'pages' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Page Management</h2>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Add New Page
                </button>
              </div>

              <div className="grid gap-4">
                {pages.map((page) => (
                  <div key={page.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${page.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <div>
                        <h3 className="font-medium text-gray-900">{page.name}</h3>
                        <p className="text-sm text-gray-500">{page.path}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">
                        Modified: {page.lastModified.toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => togglePageStatus(page.id)}
                        className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          page.isActive
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                      >
                        {page.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        <span>{page.isActive ? 'Active' : 'Inactive'}</span>
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">System Notifications</h3>
                  
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h4 className="font-medium text-gray-900 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {key === 'emailNotifications' && 'Send email notifications to users'}
                          {key === 'pushNotifications' && 'Send push notifications to mobile devices'}
                          {key === 'smsNotifications' && 'Send SMS notifications for important updates'}
                          {key === 'marketingEmails' && 'Send marketing and promotional emails'}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => setNotifications(prev => ({ ...prev, [key]: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Emails sent today</span>
                      <span className="font-medium">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Push notifications</span>
                      <span className="font-medium">3,892</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">SMS sent</span>
                      <span className="font-medium">156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery rate</span>
                      <span className="font-medium text-green-600">98.5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Languages Tab */}
          {activeTab === 'languages' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Language Management</h2>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Add Language
                </button>
              </div>

              <div className="grid gap-4">
                {languages.map((language) => (
                  <div key={language.code} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${language.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <div>
                        <h3 className="font-medium text-gray-900">{language.name}</h3>
                        <p className="text-sm text-gray-500">Code: {language.code}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => toggleLanguage(language.code)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          language.isActive
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {language.isActive ? 'Enabled' : 'Disabled'}
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Translation Status</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">English (en)</span>
                    <span className="text-green-600 font-medium">100% Complete</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Français (fr)</span>
                    <span className="text-green-600 font-medium">95% Complete</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">العربية (ar)</span>
                    <span className="text-yellow-600 font-medium">78% Complete</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Darja Tounsiya (tn)</span>
                    <span className="text-red-600 font-medium">12% Complete</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User Management Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">2,847</div>
                  <div className="text-sm text-gray-600">Total Users</div>
                </div>
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <div className="text-2xl font-bold text-green-600">156</div>
                  <div className="text-sm text-gray-600">Local Guides</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">1,234</div>
                  <div className="text-sm text-gray-600">Active This Month</div>
                </div>
                <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                  <div className="text-2xl font-bold text-yellow-600">89</div>
                  <div className="text-sm text-gray-600">New This Week</div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent User Activity</h3>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          U{i}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">User {i}</p>
                          <p className="text-sm text-gray-500">Joined 2 days ago</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Content Management Tab */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Content Management</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <MapPin className="w-6 h-6 text-green-600" />
                    <h3 className="text-lg font-medium text-gray-900">Destinations</h3>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">24</div>
                  <p className="text-sm text-gray-600">Active destinations</p>
                  <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Manage Destinations
                  </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Calendar className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-medium text-gray-900">Events</h3>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">67</div>
                  <p className="text-sm text-gray-600">Upcoming events</p>
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Manage Events
                  </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                    <h3 className="text-lg font-medium text-gray-900">Stories</h3>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">156</div>
                  <p className="text-sm text-gray-600">Published stories</p>
                  <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Manage Stories
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Platform Analytics</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-6 border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">15.4k</div>
                  <div className="text-sm text-gray-600">Page Views</div>
                  <div className="text-xs text-green-600 mt-1">+12% this week</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <div className="text-2xl font-bold text-green-600">2,847</div>
                  <div className="text-sm text-gray-600">Active Users</div>
                  <div className="text-xs text-green-600 mt-1">+8% this week</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">89%</div>
                  <div className="text-sm text-gray-600">User Satisfaction</div>
                  <div className="text-xs text-green-600 mt-1">+3% this week</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                  <div className="text-2xl font-bold text-yellow-600">4.8</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                  <div className="text-xs text-green-600 mt-1">+0.2 this week</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;