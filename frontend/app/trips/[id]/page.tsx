'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { MapPin, Calendar, Users, Clock, DollarSign, ArrowLeft, Edit, Share } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'

interface Trip {
    id: number
    title: string
    destination: string
    start_date: string
    end_date: string
    budget?: number
    interests: string[]
    status: string
    created_at: string
}

interface ItineraryDay {
    id: number
    day_number: number
    date: string
    title: string
    description: string
    activities: any[]
    estimated_cost?: number
}

export default function TripDetailPage() {
    const params = useParams()
    const router = useRouter()
    const { token } = useAuth()
    const [trip, setTrip] = useState<Trip | null>(null)
    const [itinerary, setItinerary] = useState<ItineraryDay[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        if (token && params.id) {
            fetchTripDetails()
        }
    }, [token, params.id])

    const fetchTripDetails = async () => {
        try {
            const [tripResponse, itineraryResponse] = await Promise.all([
                fetch(`http://localhost:8000/api/v1/trips/${params.id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }),
                fetch(`http://localhost:8000/api/v1/trips/${params.id}/itinerary`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            ])

            if (tripResponse.ok) {
                const tripData = await tripResponse.json()
                setTrip(tripData)
            }

            if (itineraryResponse.ok) {
                const itineraryData = await itineraryResponse.json()
                setItinerary(itineraryData)
            }
        } catch (err) {
            setError('Failed to load trip details')
        } finally {
            setIsLoading(false)
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-32 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    if (error || !trip) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Trip Not Found</h1>
                    <p className="text-gray-600 mb-6">{error || 'The trip you\'re looking for doesn\'t exist.'}</p>
                    <Link href="/trips" className="btn-primary">
                        Back to Trips
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{trip.title}</h1>
                        <div className="flex items-center space-x-4 mt-2 text-gray-600">
                            <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{trip.destination}</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>{formatDate(trip.start_date)} - {formatDate(trip.end_date)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button className="btn-secondary flex items-center space-x-2">
                        <Share className="h-4 w-4" />
                        <span>Share</span>
                    </button>
                    <button className="btn-primary flex items-center space-x-2">
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                    </button>
                </div>
            </div>

            {/* Trip Info */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="flex items-center">
                        <Calendar className="h-8 w-8 text-primary-600 mr-3" />
                        <div>
                            <h3 className="font-medium text-gray-900">Duration</h3>
                            <p className="text-gray-600">
                                {Math.ceil((new Date(trip.end_date).getTime() - new Date(trip.start_date).getTime()) / (1000 * 60 * 60 * 24))} days
                            </p>
                        </div>
                    </div>
                    {trip.budget && (
                        <div className="flex items-center">
                            <DollarSign className="h-8 w-8 text-primary-600 mr-3" />
                            <div>
                                <h3 className="font-medium text-gray-900">Budget</h3>
                                <p className="text-gray-600">${trip.budget}/day</p>
                            </div>
                        </div>
                    )}
                    <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center ${trip.status === 'planning' ? 'bg-yellow-100' :
                                trip.status === 'confirmed' ? 'bg-green-100' :
                                    'bg-gray-100'
                            }`}>
                            <div className={`w-3 h-3 rounded-full ${trip.status === 'planning' ? 'bg-yellow-500' :
                                    trip.status === 'confirmed' ? 'bg-green-500' :
                                        'bg-gray-500'
                                }`}></div>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Status</h3>
                            <p className="text-gray-600 capitalize">{trip.status}</p>
                        </div>
                    </div>
                </div>

                {trip.interests && trip.interests.length > 0 && (
                    <div className="mt-6 pt-6 border-t">
                        <h3 className="font-medium text-gray-900 mb-3">Interests</h3>
                        <div className="flex flex-wrap gap-2">
                            {trip.interests.map((interest, index) => (
                                <span key={index} className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm capitalize">
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Itinerary */}
            <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">Itinerary</h2>

                {itinerary.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
                        <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No itinerary yet</h3>
                        <p className="text-gray-600 mb-6">Your personalized itinerary is being generated.</p>
                        <button className="btn-primary">Generate Itinerary</button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {itinerary.map((day) => (
                            <div key={day.id} className="bg-white rounded-lg shadow-sm border p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{day.title}</h3>
                                        <p className="text-gray-600">{formatDate(day.date)}</p>
                                    </div>
                                    {day.estimated_cost && (
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">Estimated cost</p>
                                            <p className="font-medium text-gray-900">${day.estimated_cost}</p>
                                        </div>
                                    )}
                                </div>

                                {day.description && (
                                    <p className="text-gray-600 mb-4">{day.description}</p>
                                )}

                                {day.activities && day.activities.length > 0 && (
                                    <div className="space-y-3">
                                        <h4 className="font-medium text-gray-900">Activities</h4>
                                        <div className="space-y-2">
                                            {day.activities.map((activity, index) => (
                                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <div>
                                                        <h5 className="font-medium text-gray-900">{activity.name}</h5>
                                                        <p className="text-sm text-gray-600 capitalize">{activity.type}</p>
                                                    </div>
                                                    <span className="text-sm text-gray-500">{activity.duration}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}