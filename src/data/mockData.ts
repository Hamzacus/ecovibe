import { User, Achievement, Destination, Story, LocalGuide, CommunityPost } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'Amina Ben Ahmed',
  email: 'amina.benahmed@email.tn',
  avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  points: 2850,
  level: 7,
  achievements: [],
  carbonSaved: 145.5,
  tripsCompleted: 8,
  preferences: {
    interests: ['culture', 'history', 'nature', 'local-cuisine'],
    budget: 'medium',
    travelStyle: 'authentic',
    groupSize: 2,
    languages: ['Arabic', 'French', 'English'],
    climatePreference: ['Mediterranean', 'Coastal']
  }
};

export const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Gardien du Patrimoine',
    description: 'Visited 5 UNESCO heritage sites in Tunisia',
    icon: '🏛️',
    points: 250,
    category: 'Cultural Heritage',
    unlocked: true,
    unlockedDate: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Éco-Voyageur Champion',
    description: 'Saved 100kg+ of CO2 through sustainable travel choices',
    icon: '🌱',
    points: 300,
    category: 'Environmental',
    unlocked: true,
    unlockedDate: new Date('2024-02-20')
  },
  {
    id: '3',
    title: 'Ambassadeur Berbère',
    description: 'Participated in 3 Berber cultural experiences',
    icon: '🏺',
    points: 200,
    category: 'Cultural Immersion',
    unlocked: false
  },
  {
    id: '4',
    title: 'Explorateur du Sahara',
    description: 'Completed a sustainable desert expedition',
    icon: '🐪',
    points: 400,
    category: 'Adventure',
    unlocked: true,
    unlockedDate: new Date('2024-03-10')
  },
  {
    id: '5',
    title: 'Protecteur des Océans',
    description: 'Participated in 5 marine conservation activities',
    icon: '🌊',
    points: 350,
    category: 'Marine Conservation',
    unlocked: false
  },
  {
    id: '6',
    title: 'Maître Artisan',
    description: 'Learned 3 traditional Tunisian crafts',
    icon: '🎨',
    points: 150,
    category: 'Traditional Arts',
    unlocked: false
  }
];

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Sidi Bou Said',
    nameArabic: 'سيدي بوسعيد',
    nameFrench: 'Sidi Bou Saïd',
    region: 'North',
    image: 'https://images.pexels.com/photos/12892812/pexels-photo-12892812.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Picturesque blue and white village overlooking the Mediterranean',
    sustainabilityScore: 85,
    crowdLevel: 'high',
    bestVisitTime: 'Spring & Fall',
    activities: ['walking-tours', 'artisan-visits', 'traditional-cafes'],
    culturalSignificance: 'Historic Andalusian architecture and artistic heritage',
    averageCost: 180,
    carbonImpact: 2.3,
    coordinates: [36.8703, 10.3472]
  },
  {
    id: '2',
    name: 'Matmata',
    nameArabic: 'مطماطة',
    nameFrench: 'Matmata',
    region: 'South',
    image: 'https://images.pexels.com/photos/11742091/pexels-photo-11742091.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Traditional Berber underground homes in the Saharan landscape',
    sustainabilityScore: 92,
    crowdLevel: 'low',
    bestVisitTime: 'Winter & Spring',
    activities: ['berber-culture', 'underground-houses', 'traditional-meals'],
    culturalSignificance: 'Ancient Berber architecture and desert lifestyle',
    averageCost: 220,
    carbonImpact: 1.8,
    coordinates: [33.5447, 9.9662]
  },
  {
    id: '3',
    name: 'Kairouan',
    nameArabic: 'القيروان',
    nameFrench: 'Kairouan',
    region: 'Center',
    image: 'https://images.pexels.com/photos/8294641/pexels-photo-8294641.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Holy city of Islam with magnificent mosques and carpets',
    sustainabilityScore: 88,
    crowdLevel: 'medium',
    bestVisitTime: 'Fall & Spring',
    activities: ['mosque-visits', 'carpet-weaving', 'islamic-heritage'],
    culturalSignificance: 'Fourth holiest city in Islam, UNESCO World Heritage',
    averageCost: 160,
    carbonImpact: 2.1,
    coordinates: [35.6811, 10.0963]
  },
  {
    id: '4',
    name: 'Djerba',
    nameArabic: 'جربة',
    nameFrench: 'Djerba',
    region: 'Coastal',
    image: 'https://images.pexels.com/photos/10312052/pexels-photo-10312052.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Island paradise with pristine beaches and rich Jewish heritage',
    sustainabilityScore: 78,
    crowdLevel: 'high',
    bestVisitTime: 'Year-round',
    activities: ['beach-conservation', 'pottery-making', 'cultural-diversity'],
    culturalSignificance: 'Ancient Jewish community and traditional pottery',
    averageCost: 280,
    carbonImpact: 3.2,
    coordinates: [33.8076, 10.8451]
  },
  {
    id: '5',
    name: 'Carthage',
    nameArabic: 'قرطاج',
    nameFrench: 'Carthage',
    region: 'North',
    image: 'https://images.pexels.com/photos/11041282/pexels-photo-11041282.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Ancient Phoenician city with remarkable archaeological remains',
    sustainabilityScore: 90,
    crowdLevel: 'medium',
    bestVisitTime: 'Spring & Fall',
    activities: ['archaeology', 'museum-visits', 'historical-tours'],
    culturalSignificance: 'Ancient Carthaginian empire, UNESCO World Heritage',
    averageCost: 120,
    carbonImpact: 1.5,
    coordinates: [36.8528, 10.3236]
  },
  {
    id: '6',
    name: 'La Medina de Tunis',
    nameArabic: 'المدينة العتيقة بتونس',
    nameFrench: 'La Médina de Tunis',
    region: 'North',
    image: 'https://images.pexels.com/photos/13455377/pexels-photo-13455377.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Historic medina with traditional souks and Islamic architecture',
    sustainabilityScore: 82,
    crowdLevel: 'high',
    bestVisitTime: 'Fall & Spring',
    activities: ['souk-exploration', 'artisan-workshops', 'traditional-architecture'],
    culturalSignificance: 'Medieval Islamic city, UNESCO World Heritage',
    averageCost: 95,
    carbonImpact: 1.2,
    coordinates: [36.7969, 10.1714]
  }
];

export const stories: Story[] = [
  {
    id: '1',
    title: 'The Guardian of Berber Traditions',
    titleArabic: 'حارس التقاليد البربرية',
    titleFrench: 'Gardien des Traditions Berbères',
    author: 'Fatma Bouazizi',
    location: 'Matmata',
    category: 'Cultural Heritage',
    image: 'https://images.pexels.com/photos/11742091/pexels-photo-11742091.jpeg?auto=compress&cs=tinysrgb&w=800',
    content: 'In the depths of Matmata\'s underground homes, Fatma preserves the ancient ways of her ancestors...',
    culturalContext: 'Berber traditions dating back over 1000 years',
    preservationImpact: 'Supporting 15 families in traditional crafts',
    readTime: '8 min',
    likes: 342,
    views: 1250
  },
  {
    id: '2',
    title: 'Songs of Tunis Medina',
    titleArabic: 'أغاني المدينة العتيقة',
    titleFrench: 'Chants de la Médina de Tunis',
    author: 'Ahmed Trabelsi',
    location: 'La Medina de Tunis',
    category: 'Music & Arts',
    image: 'https://images.pexels.com/photos/13455377/pexels-photo-13455377.jpeg?auto=compress&cs=tinysrgb&w=800',
    audioUrl: '#',
    content: 'Through the narrow streets of the medina, traditional malouf music echoes from generation to generation...',
    culturalContext: 'Andalusian musical heritage in Tunisia',
    preservationImpact: 'Training 25 young musicians in traditional arts',
    readTime: '12 min',
    likes: 189,
    views: 987
  },
  {
    id: '3',
    title: 'The Pottery Masters of Nabeul',
    titleArabic: 'أساتذة الفخار في نابل',
    titleFrench: 'Les Maîtres Potiers de Nabeul',
    author: 'Leila Trabelsi',
    location: 'Nabeul',
    category: 'Traditional Crafts',
    image: 'https://images.pexels.com/photos/1293120/pexels-photo-1293120.jpeg?auto=compress&cs=tinysrgb&w=800',
    content: 'The ancient art of pottery in Nabeul continues to flourish through dedicated craftsmen...',
    culturalContext: 'Traditional pottery techniques dating to Phoenician times',
    preservationImpact: 'Sustaining 40+ artisan families',
    readTime: '10 min',
    likes: 278,
    views: 1456
  }
];

export const localGuides: LocalGuide[] = [
  {
    id: '1',
    name: 'Youssef Khelifi',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    location: 'Sidi Bou Said',
    specialties: ['Cultural Tours', 'Photography', 'Local Cuisine'],
    rating: 4.9,
    reviewCount: 127,
    languages: ['Arabic', 'French', 'English', 'Spanish'],
    pricePerDay: 85,
    about: 'Passionate about sharing the beauty and history of Sidi Bou Said',
    aboutArabic: 'متحمس لمشاركة جمال وتاريخ سيدي بوسعيد',
    aboutFrench: 'Passionné par le partage de la beauté et de l\'histoire de Sidi Bou Saïd',
    verified: true,
    culturalExpertise: ['Andalusian Architecture', 'Traditional Arts', 'Local History']
  },
  {
    id: '2',
    name: 'Salma Jemli',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    location: 'Kairouan',
    specialties: ['Islamic Heritage', 'Carpet Weaving', 'Religious Sites'],
    rating: 4.8,
    reviewCount: 89,
    languages: ['Arabic', 'French', 'English'],
    pricePerDay: 75,
    about: 'Expert in Islamic culture and traditional carpet weaving techniques',
    aboutArabic: 'خبيرة في الثقافة الإسلامية وتقنيات نسج السجاد التقليدية',
    aboutFrench: 'Experte en culture islamique et techniques de tissage traditionnel',
    verified: true,
    culturalExpertise: ['Islamic History', 'Traditional Crafts', 'Religious Architecture']
  },
  {
    id: '3',
    name: 'Mehdi Gharbi',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    location: 'Matmata',
    specialties: ['Desert Adventures', 'Berber Culture', 'Sustainable Tourism'],
    rating: 4.9,
    reviewCount: 156,
    languages: ['Arabic', 'French', 'English', 'Berber'],
    pricePerDay: 95,
    about: 'Desert expert and guardian of Berber traditions in southern Tunisia',
    aboutArabic: 'خبير في الصحراء وحارس التقاليد البربرية في جنوب تونس',
    aboutFrench: 'Expert du désert et gardien des traditions berbères du sud tunisien',
    verified: true,
    culturalExpertise: ['Berber Traditions', 'Desert Ecology', 'Underground Architecture']
  }
];

export const communityPosts: CommunityPost[] = [
  {
    id: '1',
    author: {
      id: '2',
      name: 'Fatma Ben Ali',
      email: 'fatma@email.tn',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      points: 1850,
      level: 5,
      achievements: [],
      carbonSaved: 95.2,
      tripsCompleted: 5,
      preferences: {
        interests: [],
        budget: 'low',
        travelStyle: 'eco',
        groupSize: 1,
        languages: [],
        climatePreference: []
      }
    },
    content: 'Just completed an amazing pottery workshop in Nabeul! Learning traditional techniques from master craftsmen was incredibly rewarding. The sustainable tourism model here really supports local artisans. 🏺✨',
    images: ['https://images.pexels.com/photos/1293120/pexels-photo-1293120.jpeg?auto=compress&cs=tinysrgb&w=600'],
    location: 'Nabeul',
    timestamp: new Date('2024-01-20T10:30:00'),
    likes: 45,
    comments: [],
    tags: ['pottery', 'traditional-crafts', 'sustainable-tourism']
  },
  {
    id: '2',
    author: {
      id: '3',
      name: 'Ahmed Trabelsi',
      email: 'ahmed@email.tn',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      points: 2250,
      level: 6,
      achievements: [],
      carbonSaved: 125.8,
      tripsCompleted: 7,
      preferences: {
        interests: [],
        budget: 'medium',
        travelStyle: 'cultural',
        groupSize: 2,
        languages: [],
        climatePreference: []
      }
    },
    content: 'The sunrise at Carthage ruins was absolutely breathtaking! Our guide shared fascinating stories about the ancient Phoenician empire. Pro tip: visit early morning to avoid crowds and experience the site in peaceful tranquility. 🌅',
    images: ['https://images.pexels.com/photos/11041282/pexels-photo-11041282.jpeg?auto=compress&cs=tinysrgb&w=600'],
    location: 'Carthage',
    timestamp: new Date('2024-01-18T07:45:00'),
    likes: 72,
    comments: [],
    tags: ['carthage', 'history', 'early-morning', 'photography']
  }
];

export const analyticsData = {
  destinationTrends: [
    { destination: 'Sidi Bou Said', popularity: 85, growth: 12 },
    { destination: 'Djerba', popularity: 78, growth: 8 },
    { destination: 'Kairouan', popularity: 72, growth: 15 },
    { destination: 'Matmata', popularity: 65, growth: 22 },
    { destination: 'Carthage', popularity: 82, growth: 5 }
  ],
  crowdPredictions: [
    { destination: 'Sidi Bou Said', current: 'high', predicted: 'medium', timeframe: '2 hours' },
    { destination: 'La Medina', current: 'medium', predicted: 'high', timeframe: '1 hour' },
    { destination: 'Carthage', current: 'low', predicted: 'medium', timeframe: '3 hours' }
  ],
  sustainabilityMetrics: {
    totalCarbonSaved: 15420,
    treesPlanted: 1250,
    localBusinessesSupported: 340,
    culturalProjectsFunded: 25
  }
};