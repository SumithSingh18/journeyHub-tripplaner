import Link from 'next/link'

export function CTA() {
  return (
    <section className="bg-primary-600 rounded-2xl text-white text-center py-16 px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Start Your Next Adventure?
        </h2>
        <p className="text-xl text-primary-100">
          Join thousands of travelers who trust TripPlanner to create unforgettable experiences. 
          Start planning your perfect trip today - it's completely free!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link 
            href="/trips/new" 
            className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors text-lg"
          >
            Get Started Free
          </Link>
          <Link 
            href="/explore" 
            className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-colors text-lg"
          >
            Explore Destinations
          </Link>
        </div>
        <p className="text-sm text-primary-200 pt-4">
          No credit card required • Free forever plan available
        </p>
      </div>
    </section>
  )
}