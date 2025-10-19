'use client'

import Link from 'next/link'
import { useState } from 'react'
import { MapPin, Menu, X } from 'lucide-react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">TripPlanner</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/trips" className="text-gray-600 hover:text-gray-900 transition-colors">
              My Trips
            </Link>
            <Link href="/explore" className="text-gray-600 hover:text-gray-900 transition-colors">
              Explore
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link href="/login" className="btn-secondary">
              Sign In
            </Link>
            <Link href="/register" className="btn-primary">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/trips" className="text-gray-600 hover:text-gray-900">
                My Trips
              </Link>
              <Link href="/explore" className="text-gray-600 hover:text-gray-900">
                Explore
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Link href="/login" className="btn-secondary text-center">
                  Sign In
                </Link>
                <Link href="/register" className="btn-primary text-center">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}