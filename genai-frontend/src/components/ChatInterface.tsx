import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Bot, User, FileText, AlertCircle, CheckCircle } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  type?: 'text' | 'analysis' | 'warning' | 'success'
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Legal Assistant. I can help you understand your legal documents, explain complex terms, and provide personalized advice. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputText)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        type: botResponse.type
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (userInput: string): { text: string; type: 'text' | 'analysis' | 'warning' | 'success' } => {
    const input = userInput.toLowerCase()
    
    if (input.includes('rental') || input.includes('lease')) {
      return {
        text: "I can see you're asking about rental agreements. Based on your uploaded document, here are the key points:\n\n• Lease Term: 12 months\n• Monthly Rent: $2,500\n• Security Deposit: $5,000\n• Notice Period: 30 days\n\n⚠️ Warning: The security deposit is quite high (2 months rent). Consider negotiating this down to 1 month's rent.\n\n✅ Recommendation: Ask for clarification on maintenance responsibilities and pet policies before signing.",
        type: 'analysis'
      }
    } else if (input.includes('risk') || input.includes('dangerous')) {
      return {
        text: "Based on my analysis, this contract has a 75% risk level. Here are the main concerns:\n\n🚨 High Risk Factors:\n• Unclear maintenance responsibilities\n• No early termination clause\n• High security deposit\n• Missing pet policy details\n\nI recommend consulting with a local lawyer before signing this agreement.",
        type: 'warning'
      }
    } else if (input.includes('good') || input.includes('positive')) {
      return {
        text: "Great question! Here are the positive aspects of this contract:\n\n✅ Good Terms:\n• Clear rent amount and due date\n• Reasonable notice period (30 days)\n• Standard lease duration (12 months)\n• Professional formatting\n\nThis shows the landlord is organized and follows standard practices.",
        type: 'success'
      }
    } else if (input.includes('help') || input.includes('explain')) {
      return {
        text: "I'm here to help! I can assist you with:\n\n• Explaining legal terms in plain language\n• Identifying potential risks in contracts\n• Comparing different clauses\n• Suggesting negotiation points\n• Recommending local lawyers\n\nWhat specific part of your document would you like me to explain?",
        type: 'text'
      }
    } else {
      return {
        text: "I understand you're asking about legal matters. To provide the most accurate advice, I'd need to analyze your specific document. Please upload your legal document first, and I'll be able to give you detailed, personalized guidance.\n\nIn the meantime, I can help explain general legal concepts or answer questions about common contract terms.",
        type: 'text'
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'analysis':
        return <FileText className="h-5 w-5 text-blue-500" />
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Bot className="h-5 w-5 text-blue-500" />
    }
  }

  const getMessageBgColor = (type: string) => {
    switch (type) {
      case 'analysis':
        return 'bg-blue-50 border-blue-200'
      case 'warning':
        return 'bg-red-50 border-red-200'
      case 'success':
        return 'bg-green-50 border-green-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="flex flex-col h-[600px]">
      {/* Chat Header */}
      <div className="flex items-center space-x-3 p-4 border-b border-gray-200">
        <div className="bg-blue-100 rounded-full p-2">
          <Bot className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">AI Legal Assistant</h3>
          <p className="text-sm text-gray-500">Online • Ready to help</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`flex-shrink-0 ${message.sender === 'user' ? 'hidden' : ''}`}>
                {message.sender === 'bot' ? (
                  <div className="bg-blue-100 rounded-full p-2">
                    {getMessageIcon(message.type || 'text')}
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-full p-2">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                )}
              </div>
              
              <div className={`rounded-lg p-4 ${message.sender === 'user' ? 'bg-blue-600 text-white' : getMessageBgColor(message.type || 'text')}`}>
                <div className="whitespace-pre-wrap text-sm">
                  {message.text}
                </div>
                <div className={`text-xs mt-2 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 rounded-full p-2">
                <Bot className="h-5 w-5 text-blue-500" />
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-3">
          <div className="flex-1">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your legal documents..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={2}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface
