import React, { useState } from 'react';
import { Trophy, Target, Zap, Calendar, Crown, Award, Gift } from 'lucide-react';
import { currentUser, achievements } from '../../data/mockData';
import PageHeader from '../UI/PageHeader';
import TabNavigation from '../UI/TabNavigation';
import Card from '../UI/Card';
import ProgressBar from '../UI/ProgressBar';

const RewardsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const levelProgress = {
    current: currentUser.level,
    nextLevelPoints: currentUser.level * 500,
    currentPoints: currentUser.points,
    progressPercentage: ((currentUser.points % 500) / 500) * 100
  };

  const weeklyChallenge = {
    title: 'Cultural Explorer Week',
    description: 'Visit 3 cultural sites and learn 2 traditional crafts',
    progress: 60,
    reward: 200,
    daysLeft: 4
  };

  const monthlyGoals = [
    { id: 1, title: 'Save 50kg CO₂', current: 32, target: 50, reward: 300 },
    { id: 2, title: 'Support 5 Local Businesses', current: 3, target: 5, reward: 150 },
    { id: 3, title: 'Complete Heritage Tour', current: 0, target: 1, reward: 400 }
  ];

  const leaderboard = [
    { rank: 1, name: 'Fatma Ben Ali', points: 3420, avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
    { rank: 2, name: 'Ahmed Trabelsi', points: 3180, avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
    { rank: 3, name: 'Amina Ben Ahmed', points: 2850, avatar: currentUser.avatar, isCurrentUser: true },
    { rank: 4, name: 'Youssef Khelifi', points: 2650, avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
    { rank: 5, name: 'Leila Trabelsi', points: 2420, avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' }
  ];

  const recentActivity = [
    { action: 'Completed pottery workshop in Nabeul', points: 150, time: '2 hours ago', icon: '🏺' },
    { action: 'Visited Carthage archaeological site', points: 100, time: '1 day ago', icon: '🏛️' },
    { action: 'Saved 15kg CO₂ by choosing electric transport', points: 75, time: '2 days ago', icon: '🌱' },
    { action: 'Unlocked "Eco-Voyageur Champion" badge', points: 300, time: '3 days ago', icon: '🌿' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Trophy },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'challenges', label: 'Challenges', icon: Target },
    { id: 'leaderboard', label: 'Leaderboard', icon: Crown }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <PageHeader
        badge={{
          icon: Trophy,
          text: 'Rewards & Achievements',
          color: 'yellow'
        }}
        title="Your Journey Progress"
        subtitle="Track your sustainable travel achievements and cultural contributions"
      />

      {/* User Stats Card */}
      <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl text-white p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <img 
              src={currentUser.avatar} 
              alt="Profile" 
              className="w-16 h-16 rounded-full border-4 border-white/30"
            />
            <div>
              <h2 className="text-2xl font-bold">{currentUser.name}</h2>
              <p className="text-green-100">Cultural Explorer • Level {currentUser.level}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{currentUser.points.toLocaleString()}</div>
            <div className="text-green-100">Total Points</div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold">{currentUser.carbonSaved}kg</div>
            <div className="text-green-100 text-sm">CO₂ Saved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{currentUser.tripsCompleted}</div>
            <div className="text-blue-100 text-sm">Trips Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{achievements.filter(a => a.unlocked).length}</div>
            <div className="text-purple-100 text-sm">Achievements</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">#{leaderboard.findIndex(u => u.isCurrentUser) + 1}</div>
            <div className="text-yellow-100 text-sm">Leaderboard</div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/90">Level {levelProgress.current}</span>
            <span className="text-white/90">Level {levelProgress.current + 1}</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div 
              className="bg-white rounded-full h-3 transition-all duration-500"
              style={{ width: `${levelProgress.progressPercentage}%` }}
            ></div>
          </div>
          <div className="text-center mt-2 text-white/80 text-sm">
            {500 - (levelProgress.currentPoints % 500)} points to next level
          </div>
        </div>
      </div>

      {/* Tabs */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="mb-8"
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Weekly Challenge */}
                <Card variant="simple" className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Weekly Challenge</h3>
                        <p className="text-sm text-purple-600">{weeklyChallenge.daysLeft} days left</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Reward</div>
                      <div className="text-lg font-bold text-purple-600">{weeklyChallenge.reward} pts</div>
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-gray-900 mb-2">{weeklyChallenge.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{weeklyChallenge.description}</p>
                  
                  <ProgressBar
                    value={weeklyChallenge.progress}
                    label="Progress"
                    showPercentage={true}
                    color="purple"
                  />
                </Card>

                {/* Monthly Goals */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Goals</h3>
                  <div className="space-y-4">
                    {monthlyGoals.map((goal) => (
                      <Card key={goal.id} variant="simple" className="border border-gray-200 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">{goal.title}</h4>
                          <span className="text-sm font-medium text-green-600">{goal.reward} pts</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <ProgressBar
                            value={goal.current}
                            max={goal.target}
                            className="flex-1"
                          />
                          <span className="text-sm text-gray-600 min-w-max">
                            {goal.current}/{goal.target}
                          </span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
                      <div className="text-xl">{activity.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 mb-1">{activity.action}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">{activity.time}</span>
                          <span className="font-medium text-green-600">+{activity.points} pts</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id} 
                  variant="simple"
                  className={`p-6 border-2 transition-all duration-300 ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-br from-green-50 to-blue-50 border-green-300 hover:shadow-lg' 
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="text-center">
                    <div className={`text-4xl mb-3 ${achievement.unlocked ? '' : 'grayscale'}`}>
                      {achievement.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        achievement.unlocked 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {achievement.category}
                      </span>
                      <span className="font-medium text-purple-600">
                        {achievement.points} pts
                      </span>
                    </div>

                    {achievement.unlocked && achievement.unlockedDate && (
                      <div className="mt-3 pt-3 border-t border-green-200">
                        <p className="text-xs text-green-600">
                          Unlocked {achievement.unlockedDate.toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Challenges Tab */}
          {activeTab === 'challenges' && (
            <div className="space-y-6">
              <Card variant="simple" className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">New Challenge Available!</h3>
                  <p className="text-gray-600">Complete this week's cultural exploration challenge</p>
                </div>

                <div className="bg-white rounded-xl p-4 mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{weeklyChallenge.title}</h4>
                  <p className="text-gray-600 text-sm mb-3">{weeklyChallenge.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-orange-600" />
                      <span className="text-sm text-orange-600">{weeklyChallenge.daysLeft} days left</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Gift className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-600">{weeklyChallenge.reward} points</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200">
                  Accept Challenge
                </button>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card variant="simple" className="border border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">🌱</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Eco Champion</h3>
                      <p className="text-sm text-gray-500">Monthly Challenge</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">Reduce your travel carbon footprint by 20% this month</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-600">Progress: 65%</span>
                    <span className="text-sm font-medium text-purple-600">500 pts</span>
                  </div>
                </Card>

                <Card variant="simple" className="border border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">👥</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Community Builder</h3>
                      <p className="text-sm text-gray-500">Social Challenge</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">Connect with 10 local guides and businesses</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-600">Progress: 30%</span>
                    <span className="text-sm font-medium text-purple-600">300 pts</span>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Leaderboard Tab */}
          {activeTab === 'leaderboard' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Sustainable Travelers Leaderboard</h3>
                <p className="text-gray-600">Top contributors to sustainable tourism in Tunisia</p>
              </div>

              <div className="space-y-3">
                {leaderboard.map((user) => (
                  <div 
                    key={user.rank} 
                    className={`flex items-center space-x-4 p-4 rounded-xl transition-all ${
                      user.isCurrentUser 
                        ? 'bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-300' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      user.rank === 1 ? 'bg-yellow-500 text-white' :
                      user.rank === 2 ? 'bg-gray-400 text-white' :
                      user.rank === 3 ? 'bg-amber-600 text-white' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      #{user.rank}
                    </div>

                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                    />

                    <div className="flex-1">
                      <h4 className={`font-medium ${user.isCurrentUser ? 'text-green-700' : 'text-gray-900'}`}>
                        {user.name} {user.isCurrentUser && '(You)'}
                      </h4>
                      <p className="text-sm text-gray-600">{user.points.toLocaleString()} points</p>
                    </div>

                    {user.rank <= 3 && (
                      <div className="text-2xl">
                        {user.rank === 1 ? '🏆' : user.rank === 2 ? '🥈' : '🥉'}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center mt-6">
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200">
                  View Full Leaderboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RewardsDashboard;