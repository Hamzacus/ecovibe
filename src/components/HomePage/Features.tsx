import React from 'react';
import { Brain, Trophy, BarChart3, BookOpen, Users, Leaf, Heart, Shield } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Itineraries',
    titleAr: 'مسارات مدعومة بالذكاء الاصطناعي',
    titleFr: 'Itinéraires alimentés par l\'IA',
    description: 'Personalized travel plans based on your preferences, budget, and sustainability goals.',
    descriptionAr: 'خطط سفر مخصصة تعتمد على تفضيلاتك وميزانيتك وأهدافك البيئية.',
    descriptionFr: 'Plans de voyage personnalisés basés sur vos préférences, budget et objectifs durables.',
    color: 'from-purple-500 to-blue-600',
    bgColor: 'bg-purple-50'
  },
  {
    icon: Trophy,
    title: 'Reward System',
    titleAr: 'نظام المكافآت',
    titleFr: 'Système de récompenses',
    description: 'Earn points and unlock achievements for sustainable travel choices and cultural engagement.',
    descriptionAr: 'اكسب النقاط وحقق الإنجازات من خلال الخيارات السياحية المستدامة والمشاركة الثقافية.',
    descriptionFr: 'Gagnez des points et débloquez des récompenses pour vos choix durables et engagement culturel.',
    color: 'from-yellow-500 to-orange-600',
    bgColor: 'bg-yellow-50'
  },
  {
    icon: BarChart3,
    title: 'Predictive Analytics',
    titleAr: 'التحليلات التنبؤية',
    titleFr: 'Analyses prédictives',
    description: 'Real-time crowd predictions and destination recommendations powered by advanced analytics.',
    descriptionAr: 'توقعات الحشود في الوقت الفعلي وتوصيات الوجهات بقوة التحليلات المتقدمة.',
    descriptionFr: 'Prédictions en temps réel des foules et recommandations basées sur des analyses avancées.',
    color: 'from-green-500 to-teal-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: BookOpen,
    title: 'Cultural Stories',
    titleAr: 'القصص الثقافية',
    titleFr: 'Histoires culturelles',
    description: 'Immersive storytelling platform featuring authentic local voices and cultural heritage.',
    descriptionAr: 'منصة سرد غامرة تضم أصواتاً محلية أصيلة والتراث الثقافي.',
    descriptionFr: 'Plateforme narrative immersive avec des voix locales authentiques et le patrimoine culturel.',
    color: 'from-indigo-500 to-purple-600',
    bgColor: 'bg-indigo-50'
  },
  {
    icon: Users,
    title: 'Community Hub',
    titleAr: 'مركز المجتمع',
    titleFr: 'Hub communautaire',
    description: 'Connect with local guides, fellow travelers, and sustainable businesses in Tunisia.',
    descriptionAr: 'تواصل مع المرشدين المحليين والمسافرين الآخرين والشركات المستدامة في تونس.',
    descriptionFr: 'Connectez-vous avec des guides locaux, voyageurs et entreprises durables en Tunisie.',
    color: 'from-pink-500 to-red-600',
    bgColor: 'bg-pink-50'
  },
  {
    icon: Leaf,
    title: 'Impact Tracking',
    titleAr: 'تتبع التأثير',
    titleFr: 'Suivi d\'impact',
    description: 'Monitor your environmental footprint and contribution to local communities.',
    descriptionAr: 'راقب أثرك البيئي ومساهمتك في المجتمعات المحلية.',
    descriptionFr: 'Surveillez votre empreinte environnementale et contribution aux communautés locales.',
    color: 'from-emerald-500 to-green-600',
    bgColor: 'bg-emerald-50'
  },
  {
    icon: Heart,
    title: 'Heritage Preservation',
    titleAr: 'الحفاظ على التراث',
    titleFr: 'Préservation du patrimoine',
    description: 'Support cultural preservation projects and traditional crafts through your travels.',
    descriptionAr: 'ادعم مشاريع الحفاظ على الثقافة والحرف التقليدية من خلال رحلاتك.',
    descriptionFr: 'Soutenez les projets de préservation culturelle et artisanat traditionnel.',
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-50'
  },
  {
    icon: Shield,
    title: 'Safe & Verified',
    titleAr: 'آمن ومعتمد',
    titleFr: 'Sûr et vérifié',
    description: 'All guides and businesses are verified for quality, safety, and sustainability standards.',
    descriptionAr: 'جميع المرشدين والشركات معتمدة لمعايير الجودة والأمان والاستدامة.',
    descriptionFr: 'Tous les guides et entreprises sont vérifiés pour qualité, sécurité et durabilité.',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50'
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> Sustainable Travel</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover Tunisia's hidden gems while making a positive impact on local communities and the environment through our comprehensive platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group relative bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:-translate-y-2"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 ${feature.bgColor} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center justify-center space-x-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">2,850+</div>
              <div className="text-sm text-gray-500">Active Users</div>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">145.5kg</div>
              <div className="text-sm text-gray-500">CO₂ Saved/User</div>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">4.9/5</div>
              <div className="text-sm text-gray-500">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;