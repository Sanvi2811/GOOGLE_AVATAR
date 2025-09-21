import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Eye, Trash2, Calendar, Clock } from 'lucide-react'

interface DocumentHistory {
  id: string
  name: string
  type: string
  uploadDate: Date
  status: 'completed' | 'processing' | 'failed'
  riskLevel: number
  summary: string
}

const HistoryTab = () => {
  const [documents] = useState<DocumentHistory[]>([
    {
      id: '1',
      name: 'Rental Agreement - 123 Main St.pdf',
      type: 'Rental Agreement',
      uploadDate: new Date('2024-01-15'),
      status: 'completed',
      riskLevel: 75,
      summary: '12-month lease agreement with high security deposit'
    },
    {
      id: '2',
      name: 'Employment Contract - Tech Corp.docx',
      type: 'Employment Contract',
      uploadDate: new Date('2024-01-10'),
      status: 'completed',
      riskLevel: 45,
      summary: 'Standard employment contract with standard terms'
    },
    {
      id: '3',
      name: 'Loan Agreement - Bank ABC.pdf',
      type: 'Loan Agreement',
      uploadDate: new Date('2024-01-08'),
      status: 'completed',
      riskLevel: 60,
      summary: 'Personal loan agreement with moderate interest rate'
    },
    {
      id: '4',
      name: 'Service Terms - App XYZ.pdf',
      type: 'Terms of Service',
      uploadDate: new Date('2024-01-05'),
      status: 'processing',
      riskLevel: 0,
      summary: 'Currently being processed...'
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskColor = (riskLevel: number) => {
    if (riskLevel >= 70) return 'text-red-600'
    if (riskLevel >= 40) return 'text-yellow-600'
    return 'text-green-600'
  }

  const getRiskLabel = (riskLevel: number) => {
    if (riskLevel >= 70) return 'High Risk'
    if (riskLevel >= 40) return 'Medium Risk'
    return 'Low Risk'
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Document History</h2>
        <p className="text-gray-600">View and manage your previously analyzed documents</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Documents</p>
              <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {documents.filter(doc => doc.status === 'completed').length}
              </p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="h-4 w-4 bg-green-600 rounded-full"></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Risk Level</p>
              <p className="text-2xl font-bold text-yellow-600">
                {Math.round(documents.filter(doc => doc.status === 'completed').reduce((acc, doc) => acc + doc.riskLevel, 0) / documents.filter(doc => doc.status === 'completed').length) || 0}%
              </p>
            </div>
            <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <div className="h-4 w-4 bg-yellow-600 rounded-full"></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {documents.map((doc, index) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{doc.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{doc.summary}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{doc.uploadDate.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{doc.uploadDate.toLocaleTimeString()}</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="font-medium">{doc.type}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {doc.status === 'completed' && (
                    <>
                      <div className="text-right mr-4">
                        <p className="text-sm text-gray-600">Risk Level</p>
                        <p className={`text-lg font-semibold ${getRiskColor(doc.riskLevel)}`}>
                          {doc.riskLevel}%
                        </p>
                        <p className="text-xs text-gray-500">{getRiskLabel(doc.riskLevel)}</p>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <button className="flex items-center space-x-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="h-4 w-4" />
                          <span className="text-sm">View</span>
                        </button>
                        <button className="flex items-center space-x-2 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Download className="h-4 w-4" />
                          <span className="text-sm">Download</span>
                        </button>
                        <button className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="h-4 w-4" />
                          <span className="text-sm">Delete</span>
                        </button>
                      </div>
                    </>
                  )}
                  
                  {doc.status === 'processing' && (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span className="text-sm text-gray-600">Processing...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {documents.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No documents yet</h3>
          <p className="text-gray-600 mb-6">Upload your first legal document to get started</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Upload Document
          </button>
        </motion.div>
      )}
    </div>
  )
}

export default HistoryTab
