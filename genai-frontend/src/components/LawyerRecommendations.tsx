import { motion } from 'framer-motion'
import { Phone, MapPin, Star, ExternalLink } from 'lucide-react'

interface Lawyer {
  id: string
  name: string
  firm: string
  location: string
  phone: string
  rating: number
  specialties: string[]
  experience: string
  consultationFee: string
}

const LawyerRecommendations = () => {
  const lawyers: Lawyer[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      firm: 'Johnson & Associates',
      location: 'Downtown Legal District',
      phone: '+1 (555) 123-4567',
      rating: 4.8,
      specialties: ['Contract Law', 'Real Estate', 'Business Law'],
      experience: '12 years',
      consultationFee: '$200/hour'
    },
    {
      id: '2',
      name: 'Michael Chen',
      firm: 'Chen Legal Group',
      location: 'Midtown Plaza',
      phone: '+1 (555) 234-5678',
      rating: 4.9,
      specialties: ['Employment Law', 'Contract Disputes', 'Corporate Law'],
      experience: '15 years',
      consultationFee: '$250/hour'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      firm: 'Rodriguez Law Firm',
      location: 'Business Center',
      phone: '+1 (555) 345-6789',
      rating: 4.7,
      specialties: ['Real Estate', 'Property Law', 'Contract Law'],
      experience: '10 years',
      consultationFee: '$180/hour'
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-900">Recommended Lawyers</h3>
        <span className="text-xs text-gray-500">Based on your location</span>
      </div>

      <div className="space-y-4">
        {lawyers.map((lawyer, index) => (
          <motion.div
            key={lawyer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{lawyer.name}</h4>
                <p className="text-sm text-gray-600">{lawyer.firm}</p>
              </div>
              <div className="flex items-center space-x-1">
                {renderStars(lawyer.rating)}
                <span className="text-sm text-gray-600 ml-1">({lawyer.rating})</span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{lawyer.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{lawyer.phone}</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Specialties:</p>
              <div className="flex flex-wrap gap-2">
                {lawyer.specialties.map((specialty, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{lawyer.experience}</span> experience
                <span className="mx-2">•</span>
                <span className="font-medium text-green-600">{lawyer.consultationFee}</span>
              </div>
              <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                <span>Contact</span>
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          💡 <span className="font-medium">Pro Tip:</span> These lawyers are recommended based on your document type and location. 
          Consultation fees may vary.
        </p>
      </div>
    </motion.div>
  )
}

export default LawyerRecommendations
