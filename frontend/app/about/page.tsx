import { MapPin, Users, Globe, Zap, Heart, Shield } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Planning',
    description: 'Our advanced algorithms create personalized itineraries based on your preferences, budget, and travel style.'
  },
  {
    icon: Globe,
    title: 'Global Coverage',
    description: 'Plan trips to any destination worldwide with our comprehensive database of attractions and activities.'
  },
  {
    icon: Users,
    title: 'Collaborative Planning',
    description: 'Plan trips together with friends and family using our real-time collaboration features.'
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your travel plans and personal data are protected with enterprise-grade security measures.'
  }
]

const team = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Co-founder',
    bio: 'Former travel industry executive with 15+ years of experience in hospitality and technology.',
    image: 'sarah'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'CTO & Co-founder',
    bio: 'AI and machine learning expert who previously led engineering teams at major tech companies.',
    image: 'marcus'
  },
  {
    name: 'Emily Johnson',
    role: 'Head of Product',
    bio: 'Product strategist passionate about creating intuitive travel experiences for modern explorers.',
    image: 'emily'
  },
  {
    name: 'David Kim',
    role: 'Head of Engineering',
    bio: 'Full-stack developer and travel enthusiast who has visited over 50 countries.',
    image: 'david'
  }
]

const stats = [
  { label: 'Happy Travelers', value: '50,000+' },
  { label: 'Trips Planned', value: '125,000+' },
  { label: 'Countries Covered', value: '195' },
  { label: 'Partner Hotels', value: '10,000+' }
]

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          About TripPlanner
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          We're on a mission to make travel planning effortless and enjoyable for everyone. 
          Our AI-powered platform helps you create perfect itineraries tailored to your unique preferences.
        </p>
        <div className="flex justify-center">
          <Link href="/register" className="btn-primary text-lg px-8 py-3">
            Start Planning Today
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
              {stat.value}
            </div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Our Story */}
      <div className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                TripPlanner was born from a simple frustration: planning the perfect trip shouldn't take weeks of research. 
                Our founders, avid travelers themselves, experienced firsthand the overwhelming process of coordinating 
                destinations, activities, accommodations, and logistics.
              </p>
              <p>
                In 2023, we set out to solve this problem by combining artificial intelligence with deep travel expertise. 
                Our platform learns from millions of successful trips to suggest personalized itineraries that match your 
                interests, budget, and travel style.
              </p>
              <p>
                Today, we're proud to help thousands of travelers discover amazing destinations and create unforgettable 
                memories with less stress and more joy.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg p-8 text-white">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <MapPin className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Making Travel Simple</h3>
                <p className="text-primary-100">
                  From dream to departure, we handle the details so you can focus on the adventure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Why Choose TripPlanner?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Meet Our Team
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-primary-600 font-medium mb-3">{member.role}</p>
              <p className="text-sm text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center mb-16">
        <Heart className="h-12 w-12 text-primary-600 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          To democratize travel by making personalized trip planning accessible, affordable, and enjoyable for everyone, 
          regardless of their experience or budget.
        </p>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Accessibility</h3>
            <p className="text-gray-600">Making travel planning simple for everyone, from first-time travelers to seasoned explorers.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Innovation</h3>
            <p className="text-gray-600">Continuously improving our AI to provide better, more personalized recommendations.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
            <p className="text-gray-600">Building a global community of travelers who share experiences and inspire each other.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of travelers who trust TripPlanner to create amazing experiences.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register" className="btn-primary text-lg px-8 py-3">
            Get Started Free
          </Link>
          <Link href="/explore" className="btn-secondary text-lg px-8 py-3">
            Explore Destinations
          </Link>
        </div>
      </div>
    </div>
  )
}