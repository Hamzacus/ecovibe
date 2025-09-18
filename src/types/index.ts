export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  points: number;
  level: number;
  achievements: Achievement[];
  carbonSaved: number;
  tripsCompleted: number;
  preferences: UserPreferences;
}

export interface UserPreferences {
  interests: string[];
  budget: string;
  travelStyle: string;
  groupSize: number;
  languages: string[];
  climatePreference: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  category: string;
  unlocked: boolean;
  unlockedDate?: Date;
}

export interface Destination {
  id: string;
  name: string;
  nameArabic: string;
  nameFrench: string;
  region: string;
  image: string;
  description: string;
  sustainabilityScore: number;
  crowdLevel: 'low' | 'medium' | 'high';
  bestVisitTime: string;
  activities: string[];
  culturalSignificance: string;
  averageCost: number;
  carbonImpact: number;
  coordinates: [number, number];
}

export interface ItineraryDay {
  day: number;
  destination: string;
  activities: Activity[];
  accommodation: string;
  meals: string[];
  transportation: string;
  carbonImpact: number;
  cost: number;
}

export interface Activity {
  id: string;
  name: string;
  type: string;
  duration: string;
  cost: number;
  sustainabilityImpact: number;
  localCommunityBenefit: number;
  description: string;
}

export interface Story {
  id: string;
  title: string;
  titleArabic: string;
  titleFrench: string;
  author: string;
  location: string;
  category: string;
  image: string;
  audioUrl?: string;
  content: string;
  culturalContext: string;
  preservationImpact: string;
  readTime: string;
  likes: number;
  views: number;
}

export interface LocalGuide {
  id: string;
  name: string;
  avatar: string;
  location: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  languages: string[];
  pricePerDay: number;
  aboutArabic: string;
  aboutFrench: string;
  about: string;
  verified: boolean;
  culturalExpertise: string[];
}

export interface CommunityPost {
  id: string;
  author: User;
  content: string;
  images: string[];
  location: string;
  timestamp: Date;
  likes: number;
  comments: Comment[];
  tags: string[];
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  timestamp: Date;
  likes: number;
}