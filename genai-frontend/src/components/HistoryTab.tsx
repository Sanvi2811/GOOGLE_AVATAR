import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Trash2, Calendar, Clock } from 'lucide-react'

interface DocumentHistory {
  id: string
  name: string
  type: string
  size: number
  uploadedAt: Date
  summary?: string
  downloadLink?: string
}

const HistoryTab = () => {
  const [documents, setDocuments] = useState<DocumentHistory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading documents from backend
    // In a real app, this would fetch from the backend
    setTimeout(() => {
      setDocuments([
        {
          id: '1',
          name: 'Rental Agreement.pdf',
          type: 'application/pdf',
          size: 1024000,
          uploadedAt: new Date('2024-01-15'),
          summary: 'This is a rental agreement for a 2-bedroom apartment...',
          downloadLink: '/api/user/download/rental_agreement_summary.pdf'
        },
        {
          id: '2',
          name: 'Employment Contract.pdf',
          type: 'application/pdf',
          size: 2048000,
          uploadedAt: new Date('2024-01-10'),
          summary: 'Employment contract with standard terms and conditions...',
          downloadLink: '/api/user/download/employment_contract_summary.pdf'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleDownload = async (document: DocumentHistory) => {
    if (!document.downloadLink) return
    
    try {
      // In a real app, this would call the download API
      console.log('Downloading:', document.downloadLink)
      // Simulate download
      alert('Download started!')
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  const handleDelete = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id))
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Document History</h2>
        <p className="text-gray-600">View and manage your previously analyzed documents</p>
      </div>

      {documents.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents yet</h3>
          <p className="text-gray-500">Upload your first document to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {documents.map((document) => (
            <motion.div
              key={document.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="bg-red-100 rounded-lg p-3">
                    <FileText className="h-6 w-6 text-red-600" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {document.name}
                    </h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(document.uploadedAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{document.uploadedAt.toLocaleTimeString()}</span>
                      </div>
                      <span>{formatFileSize(document.size)}</span>
                    </div>
                    
                    {document.summary && (
                      <p className="mt-3 text-gray-600 text-sm line-clamp-2">
                        {document.summary}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  {document.downloadLink && (
                    <button
                      onClick={() => handleDownload(document)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Download summary"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(document.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete document"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default HistoryTab
