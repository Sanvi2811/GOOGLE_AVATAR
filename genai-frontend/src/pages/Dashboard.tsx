import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../stores/authStore'
import { FileText, Upload, MessageCircle, History, Download, Bot } from 'lucide-react'
import DocumentUpload from '../components/DocumentUpload'
import ChatInterface from '../components/ChatInterface'
import HistoryTab from '../components/HistoryTab'
import LawyerRecommendations from '../components/LawyerRecommendations'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('upload')
  const { user, logout } = useAuthStore()

  const tabs = [
    { id: 'upload', label: 'Upload Document', icon: Upload },
    { id: 'chat', label: 'AI Assistant', icon: MessageCircle },
    { id: 'history', label: 'History', icon: History }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">LegalAI</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
              <button
                onClick={logout}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{tab.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-sm"
            >
              {activeTab === 'upload' && <DocumentUpload />}
              {activeTab === 'chat' && <ChatInterface />}
              {activeTab === 'history' && <HistoryTab />}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Assistant Bot */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg p-6 text-white"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-white/20 rounded-full p-2">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Legal Assistant</h3>
                  <p className="text-blue-100 text-sm">Your personal lawyer bot</p>
                </div>
              </div>
              <p className="text-blue-100 text-sm mb-4">
                Ask questions about your documents, get explanations, and receive personalized legal advice.
              </p>
              <button
                onClick={() => setActiveTab('chat')}
                className="w-full bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
              >
                Start Conversation
              </button>
            </motion.div>

            {/* Lawyer Recommendations */}
            <LawyerRecommendations />

            {/* Risk Assessment */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-4">Risk Assessment</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Contract Risk Level</span>
                  <span className="text-sm font-medium text-red-600">High (75%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-xs text-gray-500">
                  This contract has several unfavorable terms that may put you at risk.
                </p>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <Download className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Download Summary</span>
                </button>
                <button className="w-full flex items-center space-x-3 text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <FileText className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Generate Report</span>
                </button>
                <button className="w-full flex items-center space-x-3 text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <MessageCircle className="h-5 w-5 text-purple-600" />
                  <span className="text-sm text-gray-700">Share with Lawyer</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
