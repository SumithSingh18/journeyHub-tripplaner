import { Share2, FileText, Zap, Globe, Users, Shield } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Planning',
    description: 'Advanced algorithms create personalized itineraries based on your preferences and travel style.'
  },
  {
    icon: Globe,
    title: 'Global Destinations',
    description: 'Plan trips to any city or country with comprehensive attraction and activity databases.'
  },
  {
    icon: Share2,
    title: 'Easy Sharing',
    description: 'Share your itineraries with travel companions or export as PDF for offline access.'
  },
  {
    icon: FileText,
    title: 'Detailed Itineraries',
    description: 'Get complete day-by-day plans with activities, dining, and accommodation suggestions.'
  },
  {
    icon: Users,
    title: 'Collaborative Planning',
    description: 'Plan trips together with friends and family with real-time collaboration features.'
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your travel plans and personal data are protected with enterprise-grade security.'
  }
]

export function Features() {
  return (
    <section className="py-16">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Everything You Need to Plan Amazing Trips
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          From initial inspiration to detailed day-by-day plans, we've got you covered
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="card hover:shadow-lg transition-shadow">
            <div className="bg-primary-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <feature.icon className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}