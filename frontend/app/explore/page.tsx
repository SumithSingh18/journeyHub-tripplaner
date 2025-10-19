'use client'

import { useState } from 'react'
import { Search, MapPin, Star, Clock, DollarSign, Filter, Heart } from 'lucide-react'

// Mock destination data
const destinations = [
  {
    id: 1,
    name: 'Tokyo, Japan',
    country: 'Japan',
    rating: 4.8,
    reviews: 2847,
    priceLevel: 3,
    duration: '5-7 days',
    highlights: ['Shibuya Crossing', 'Tokyo Tower', 'Senso-ji Temple'],
    image: 'tokyo',
    description: 'A vibrant metropolis blending traditional culture with cutting-edge technology.'
  },
  {
    id: 2,
    name: 'Paris, France',
    country: 'France',
    rating: 4.9,
    reviews: 3521,
    priceLevel: 4,
    duration: '4-6 days',
    highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame'],
    image: 'paris',
    description: 'The City of Light, famous for its art, fashion, and romantic atmosphere.'
  },
  {
    id: 3,
    name: 'Bali, Indonesia',
    country: 'Indonesia',
    rating: 4.7,
    reviews: 1923,
    priceLevel: 2,
    duration: '7-10 days',
    highlights: ['Ubud Rice Terraces', 'Tanah Lot Temple', 'Seminyak Beach'],
    image: 'bali',
    description: 'Tropical paradise with stunning beaches, temples, and lush landscapes.'
  },
  {
    id: 4,
    name: 'New York City, USA',
    country: 'United States',
    rating: 4.6,
    reviews: 4102,
    priceLevel: 4,
    duration: '4-5 days',
    highlights: ['Central Park', 'Times Square', 'Statue of Liberty'],
    image: 'nyc',
    description: 'The city that never sleeps, offering world-class culture and entertainment.'
  },
  {
    id: 5,
    name: 'Santorini, Greece',
    country: 'Greece',
    rating: 4.8,
    reviews: 1654,
    priceLevel: 3,
    duration: '3-5 days',
    highlights: ['Oia Sunset', 'Blue Domes', 'Red Beach'],
    image: 'santorini',
    description: 'Iconic Greek island known for its white-washed buildings and stunning sunsets.'
  },
  {
    id: 6,
    name: 'Dubai, UAE',
    country: 'United Arab Emirates',
    rating: 4.5,
    reviews: 2234,
    priceLevel: 4,
    duration: '3-4 days',
    highlights: ['Burj Khalifa', 'Dubai Mall', 'Palm Jumeirah'],
    image: 'dubai',
    description: 'Futuristic city with luxury shopping, modern architecture, and desert adventures.'
  }
]

const categories = [
  { id: 'all', name: 'All Destinations', count: destinations.length },
  { id: 'beach', name: 'Beach & Islands', count: 2 },
  { id: 'city', name: 'City Breaks', count: 3 },
  { id: 'culture', name: 'Culture & History', count: 4 },
  { id: 'adventure', name: 'Adventure', count: 1 }
]

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    )
  }

  const getPriceSymbol = (level: number) => {
    return '$'.repeat(level)
  }

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dest.country.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPrice = priceFilter === 'all' || dest.priceLevel.toString() === priceFilter
    return matchesSearch && matchesPrice
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Destinations</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover amazing places around the world and start planning your next adventure
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search destinations..."
              className="input-field pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Price Filter */}
          <div className="relative">
            <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <select
              className="input-field pl-10 pr-8"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="all">All Budgets</option>
              <option value="1">Budget ($)</option>
              <option value="2">Mid-range ($$)</option>
              <option value="3">Expensive ($$$)</option>
              <option value="4">Luxury ($$$$)</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDestinations.map((destination) => (
          <div key={destination.id} className="card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="relative">
              <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 rounded-t-lg flex items-center justify-center">
                <MapPin className="h-12 w-12 text-white" />
              </div>
              <button
                onClick={() => toggleFavorite(destination.id)}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
              >
                <Heart 
                  className={`h-5 w-5 ${
                    favorites.includes(destination.id) 
                      ? 'text-red-500 fill-current' 
                      : 'text-gray-400'
                  }`} 
                />
              </button>
              <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded-full text-sm font-medium">
                {getPriceSymbol(destination.priceLevel)}
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{destination.name}</h3>
                  <p className="text-sm text-gray-600">{destination.country}</p>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium ml-1">{destination.rating}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-3">{destination.description}</p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{destination.duration}</span>
                </div>
                <span>{destination.reviews} reviews</span>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Top Highlights:</p>
                <div className="flex flex-wrap gap-1">
                  {destination.highlights.slice(0, 2).map((highlight, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                      {highlight}
                    </span>
                  ))}
                  {destination.highlights.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                      +{destination.highlights.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              <button className="btn-primary w-full">
                Plan Trip to {destination.name.split(',')[0]}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDestinations.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No destinations found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Popular Categories */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.slice(1).map((category) => (
            <div key={category.id} className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-medium text-gray-900">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.count} destinations</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}