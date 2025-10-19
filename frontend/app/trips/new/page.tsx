'use client'

import { useState } from 'react'
import { MapPin, Calendar, Users, DollarSign, Heart, Plane, Car, Train, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const travelStyles = [
  { id: 'relaxed', name: 'Relaxed', icon: '🏖️', description: 'Take it slow and enjoy the moment' },
  { id: 'balanced', name: 'Balanced', icon: '⚖️', description: 'Mix of activities and downtime' },
  { id: 'packed', name: 'Packed', icon: '⚡', description: 'See and do as much as possible' }
]

const budgetRanges = [
  { id: 'budget', name: 'Budget', range: '$0 - $100/day', icon: '💰' },
  { id: 'mid', name: 'Mid-range', range: '$100 - $300/day', icon: '💳' },
  { id: 'luxury', name: 'Luxury', range: '$300+/day', icon: '💎' }
]

const interests = [
  { id: 'culture', name: 'Culture & History', icon: '🏛️' },
  { id: 'food', name: 'Food & Dining', icon: '🍽️' },
  { id: 'nature', name: 'Nature & Outdoors', icon: '🌲' },
  { id: 'adventure', name: 'Adventure Sports', icon: '🏔️' },
  { id: 'nightlife', name: 'Nightlife', icon: '🌃' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️' },
  { id: 'art', name: 'Art & Museums', icon: '🎨' },
  { id: 'beaches', name: 'Beaches', icon: '🏖️' }
]

export default function NewTripPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: '',
    travelStyle: '',
    interests: [] as string[],
    accommodation: '',
    transportation: ''
  })

  const handleInterestToggle = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }))
  }

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    console.log('Creating trip:', formData)
    // TODO: Submit to API
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.destination && formData.startDate && formData.endDate
      case 2:
        return formData.budget && formData.travelStyle
      case 3:
        return formData.interests.length > 0
      case 4:
        return true
      default:
        return false
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Plan Your Perfect Trip</h1>
        <p className="text-gray-600">Tell us about your travel preferences and we'll create a personalized itinerary</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3, 4].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                stepNum <= step 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNum}
              </div>
              {stepNum < 4 && (
                <div className={`w-16 h-1 mx-2 ${
                  stepNum < step ? 'bg-primary-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Destination</span>
          <span>Preferences</span>
          <span>Interests</span>
          <span>Review</span>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-sm border p-8">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Where would you like to go?</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="e.g., Tokyo, Japan"
                  className="input-field pl-10"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  className="input-field"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  className="input-field"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Travelers
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <select
                  className="input-field pl-10"
                  value={formData.travelers}
                  onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) })}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'traveler' : 'travelers'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">What's your travel style?</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Budget Range (per person)
              </label>
              <div className="grid md:grid-cols-3 gap-4">
                {budgetRanges.map((budget) => (
                  <button
                    key={budget.id}
                    onClick={() => setFormData({ ...formData, budget: budget.id })}
                    className={`p-4 rounded-lg border-2 text-left transition-colors ${
                      formData.budget === budget.id
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{budget.icon}</div>
                    <div className="font-medium text-gray-900">{budget.name}</div>
                    <div className="text-sm text-gray-600">{budget.range}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Travel Pace
              </label>
              <div className="grid md:grid-cols-3 gap-4">
                {travelStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setFormData({ ...formData, travelStyle: style.id })}
                    className={`p-4 rounded-lg border-2 text-left transition-colors ${
                      formData.travelStyle === style.id
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{style.icon}</div>
                    <div className="font-medium text-gray-900">{style.name}</div>
                    <div className="text-sm text-gray-600">{style.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">What interests you?</h2>
            <p className="text-gray-600 mb-6">Select all that apply to personalize your itinerary</p>
            
            <div className="grid md:grid-cols-4 gap-4">
              {interests.map((interest) => (
                <button
                  key={interest.id}
                  onClick={() => handleInterestToggle(interest.id)}
                  className={`p-4 rounded-lg border-2 text-center transition-colors ${
                    formData.interests.includes(interest.id)
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{interest.icon}</div>
                  <div className="text-sm font-medium text-gray-900">{interest.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Review Your Trip</h2>
            
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Destination:</span>
                <span className="text-gray-900">{formData.destination}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Dates:</span>
                <span className="text-gray-900">
                  {formData.startDate} to {formData.endDate}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Travelers:</span>
                <span className="text-gray-900">{formData.travelers}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Budget:</span>
                <span className="text-gray-900">
                  {budgetRanges.find(b => b.id === formData.budget)?.name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Travel Style:</span>
                <span className="text-gray-900">
                  {travelStyles.find(s => s.id === formData.travelStyle)?.name}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Interests:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.interests.map(interestId => {
                    const interest = interests.find(i => i.id === interestId)
                    return (
                      <span key={interestId} className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                        {interest?.name}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">🎉 Ready to create your itinerary!</h3>
              <p className="text-blue-700 text-sm">
                Our AI will analyze your preferences and create a personalized day-by-day itinerary with 
                recommendations for activities, restaurants, and accommodations.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <div>
          {step > 1 && (
            <button onClick={handleBack} className="btn-secondary">
              Back
            </button>
          )}
        </div>
        <div className="flex space-x-4">
          <Link href="/trips" className="btn-secondary">
            Cancel
          </Link>
          {step < 4 ? (
            <button 
              onClick={handleNext} 
              disabled={!isStepValid()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <span>Next</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn-primary">
              Create My Trip
            </button>
          )}
        </div>
      </div>
    </div>
  )
}