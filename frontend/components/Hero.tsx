import Link from 'next/link'
import { MapPin, Calendar, Route } from 'lucide-react'

export function Hero() {
  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Plan Your Perfect
          <span className="text-primary-600 block">Multi-Day Trip</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          AI-powered trip planning with day-by-day itineraries, personalized recommendations, 
          and optimized routes. Turn your travel dreams into reality.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/register" className="btn-primary text-lg px-8 py-3">
          Start Planning Free
        </Link>
        <Link href="/explore" className="btn-secondary text-lg px-8 py-3">
          Explore Destinations
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
        <div className="text-center space-y-4">
          <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <Calendar className="h-8 w-8 text-primary-600" />
          </div>
          <h3 className="text-xl font-semibold">Day-by-Day Planning</h3>
          <p className="text-gray-600">
            Get detailed itineraries with activities, meals, and accommodations for each day
          </p>
        </div>

        <div className="text-center space-y-4">
          <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <MapPin className="h-8 w-8 text-primary-600" />
          </div>
          <h3 className="text-xl font-semibold">Smart Recommendations</h3>
          <p className="text-gray-600">
            AI-powered suggestions based on your interests, budget, and travel style
          </p>
        </div>

        <div className="text-center space-y-4">
          <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <Route className="h-8 w-8 text-primary-600" />
          </div>
          <h3 className="text-xl font-semibold">Route Optimization</h3>
          <p className="text-gray-600">
            Optimized routes and timing to make the most of your travel time
          </p>
        </div>
      </div>
    </div>
  )
}