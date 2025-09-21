import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, Image, File, X, Download } from 'lucide-react'

interface UploadedFile {
  id: string
  name: string
  type: string
  size: number
  url: string
}

const DocumentUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleFiles(files)
  }

  const handleFiles = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file)
    }))
    setUploadedFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id))
  }

  const processDocuments = async () => {
    if (uploadedFiles.length === 0) return
    
    setIsProcessing(true)
    
    // Simulate API call to process documents
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Mock analysis result
    setAnalysisResult({
      summary: "This is a rental agreement for a 2-bedroom apartment. Key terms include a 12-month lease, monthly rent of $2,500, and a security deposit of $5,000. The tenant is responsible for utilities and must give 30 days notice before moving out.",
      riskLevel: 75,
      keyPoints: [
        "12-month lease term",
        "Monthly rent: $2,500",
        "Security deposit: $5,000",
        "Tenant responsible for utilities",
        "30-day notice required for termination"
      ],
      concerns: [
        "High security deposit (2 months rent)",
        "No pet policy mentioned",
        "Maintenance responsibilities unclear",
        "Early termination penalty not specified"
      ],
      recommendations: [
        "Negotiate lower security deposit",
        "Clarify pet policy in writing",
        "Define maintenance responsibilities",
        "Add early termination clause"
      ]
    })
    
    setIsProcessing(false)
  }

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return <Image className="h-8 w-8 text-blue-500" />
    if (type.includes('pdf')) return <FileText className="h-8 w-8 text-red-500" />
    return <File className="h-8 w-8 text-gray-500" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Legal Documents</h2>
        <p className="text-gray-600">Upload your legal documents for AI analysis and explanation</p>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Drop your documents here
        </h3>
        <p className="text-gray-600 mb-4">
          Supports PDF, DOC, DOCX, and image files
        </p>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Choose Files
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={handleFileInput}
          className="hidden"
        />
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Files</h3>
          <div className="space-y-3">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(file.type)}
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(file.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
          
          <button
            onClick={processDocuments}
            disabled={isProcessing}
            className="mt-4 w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing Documents...' : 'Analyze Documents'}
          </button>
        </motion.div>
      )}

      {/* Analysis Results */}
      {analysisResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 space-y-6"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">Analysis Results</h3>
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </button>
          </div>

          {/* Summary */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-3">Document Summary</h4>
            <p className="text-blue-800">{analysisResult.summary}</p>
          </div>

          {/* Key Points */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="font-semibold text-green-900 mb-3">Key Points</h4>
              <ul className="space-y-2">
                {analysisResult.keyPoints.map((point: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2 text-green-800">
                    <span className="text-green-600 mt-1">•</span>
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 rounded-lg p-6">
              <h4 className="font-semibold text-red-900 mb-3">Concerns</h4>
              <ul className="space-y-2">
                {analysisResult.concerns.map((concern: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2 text-red-800">
                    <span className="text-red-600 mt-1">•</span>
                    <span className="text-sm">{concern}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-yellow-50 rounded-lg p-6">
            <h4 className="font-semibold text-yellow-900 mb-3">Recommendations</h4>
            <ul className="space-y-2">
              {analysisResult.recommendations.map((rec: string, index: number) => (
                <li key={index} className="flex items-start space-x-2 text-yellow-800">
                  <span className="text-yellow-600 mt-1">•</span>
                  <span className="text-sm">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default DocumentUpload
