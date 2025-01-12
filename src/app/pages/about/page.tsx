import Image from 'next/image'
import { ChevronRight, Search, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Global Banner */}
      <div className="bg-[#f5f5f7] text-sm py-3 px-4 text-center">
        <p>Choose another country or region to see content specific to your location</p>
      </div>

      {/* Navigation */}
      <nav className="bg-[rgba(255,255,255,0.8)] backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[980px] mx-auto px-4 h-[44px] flex items-center justify-between">
          <Link href="/" className="opacity-80 hover:opacity-100 transition-opacity">
            <Image
              src="https://sjc.microlink.io/7MJDJ0tLfbH4RyjWyxYnncchNvkBklzie4mBAnBCy9ZdEgEdNxWRaRZFROZg31nX7IXnr-urE-jMVfuAtOw9EQ.jpeg"
              alt="Logo"
              width={14}
              height={14}
              className="w-3.5 h-4"
            />
            <span className="sr-only">Home</span>
          </Link>
          
          <div className="hidden md:flex space-x-8 text-sm">
            <Link href="/" className="text-gray-900 hover:text-gray-600">Home</Link>
            <Link href="#" className="text-gray-900 hover:text-gray-600">Solutions</Link>
            <Link href="#" className="text-gray-900 hover:text-gray-600">Services</Link>
            <Link href="#" className="text-gray-900 hover:text-gray-600">Support</Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="opacity-80 hover:opacity-100 transition-opacity">
              <Search className="w-4 h-4" />
              <span className="sr-only">Search</span>
            </button>
            <button className="opacity-80 hover:opacity-100 transition-opacity">
              <ShoppingBag className="w-4 h-4" />
              <span className="sr-only">Shopping Bag</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-[980px] mx-auto text-center">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">About Us</h2>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 tracking-tight">
            Innovation is in 
            <br />
            our DNA.
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            We believe in challenging the status quo and thinking differently. 
            Our mission is to bring the best user experience through innovative hardware, 
            software, and services.
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 px-4">
        <div className="max-w-[980px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900">Our Story</h3>
              <p className="text-gray-500 leading-relaxed">
                Founded in a garage in 1976, our company has grown to become one of 
                the world's most valuable technology companies. We're committed to 
                bringing the best user experience to our customers through innovative 
                hardware, software, and services.
              </p>
              <Link 
                href="#" 
                className="inline-flex items-center text-blue-600 hover:underline"
              >
                Learn more about our history
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900">Our Values</h3>
              <p className="text-gray-500 leading-relaxed">
                We believe that technology should be accessible to everyone and that 
                the best products come from the intersection of technology and liberal 
                arts. Our commitment to environmental responsibility drives us to 
                innovate in sustainable ways.
              </p>
              <Link 
                href="#" 
                className="inline-flex items-center text-blue-600 hover:underline"
              >
                Discover our environmental initiatives
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-[#f5f5f7]">
        <div className="max-w-[980px] mx-auto text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <h4 className="text-4xl font-semibold text-gray-900">100K+</h4>
              <p className="text-gray-500">Employees Worldwide</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-4xl font-semibold text-gray-900">50+</h4>
              <p className="text-gray-500">Countries</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-4xl font-semibold text-gray-900">1B+</h4>
              <p className="text-gray-500">Active Devices</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-200">
        <div className="max-w-[980px] mx-auto text-sm text-gray-500">
          <p>Copyright © 2024 Company, Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

