'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, MapPin, Calendar, Users, MoreVertical, Search, Filter } from 'lucide-react'

// Mock data - will be replaced with API calls
const mockTrips = [
  {
    id: 1,
    title: 'Tokyo Adventure',
    destination: 'Tokyo, Japan',
    startDate: '2024-03-15',
    endDate: '2024-03-22',
    days: 7,
    travelers: 2,
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=200&fit=crop'
  },
  {
    id: 2,
    title: 'European Getaway',
    destination: 'Paris, France',
    startDate: '2024-02-10',
    endDate: '2024-02-17',
    days: 7,
    travelers: 1,
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=200&fit=crop'
  },
  {
    id: 3,
    title: 'NYC Business Trip',
    destination: 'New York, USA',
    startDate: '2024-01-20',
    endDate: '2024-01-25',
    days: 5,
    travelers: 1,
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=200&fit=crop'
  }
]

export default function TripsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredTrips = mockTrips.filter(trip => {
    const matchesSearch = trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.destination.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || trip.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
          <p className="text-gray-600 mt-1">Plan, organize, and track your adventures</p>
        </div>
        <Link href="/trips/new" className="btn-primary flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>New Trip</span>
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search trips..."
            className="input-field pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <select
            className="input-field pl-10 pr-8"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Trips</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Trips Grid */}
      {filteredTrips.length === 0 ? (
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No trips found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Start planning your first adventure!'
            }
          </p>
          <Link href="/trips/new" className="btn-primary">
            Create Your First Trip
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <div key={trip.id} className="card hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative">
                <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <button className="p-1 bg-white rounded-full shadow-sm hover:shadow-md">
                    <MoreVertical className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    trip.status === 'upcoming' 
                      ? 'bg-green-100 text-green-800'
                      : trip.status === 'completed'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{trip.title}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{trip.destination}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="text-sm">{trip.travelers} traveler{trip.travelers > 1 ? 's' : ''}</span>
                  </div>
                  <span className="text-sm text-gray-500">{trip.days} days</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/trips/new" className="flex items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
            <Plus className="h-8 w-8 text-primary-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Plan New Trip</h3>
              <p className="text-sm text-gray-600">Start planning your next adventure</p>
            </div>
          </Link>
          <Link href="/explore" className="flex items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
            <MapPin className="h-8 w-8 text-primary-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Explore Destinations</h3>
              <p className="text-sm text-gray-600">Discover amazing places to visit</p>
            </div>
          </Link>
          <Link href="/trips/templates" className="flex items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
            <Calendar className="h-8 w-8 text-primary-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Trip Templates</h3>
              <p className="text-sm text-gray-600">Use pre-made itineraries</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}