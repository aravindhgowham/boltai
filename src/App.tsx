import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ChatPanel from './components/ChatPanel';
import OutputPanel from './components/OutputPanel';
import MovieDetailPage from './pages/MovieDetailPage';
import { api } from './services/api';
import { ChatMessage, MovieShowResult } from './types/api';
import { AlertCircle } from 'lucide-react';

function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [outputData, setOutputData] = useState<MovieShowResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [healthStatus, setHealthStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    try {
      await api.checkHealth();
      setHealthStatus('online');
    } catch (error) {
      setHealthStatus('offline');
      console.error('API health check failed:', error);
    }
  };

  const handleSendMessage = async (text: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await api.sendMessage(text);

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response.response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      if (response.data && response.data.results && response.data.results.length > 0) {
        setOutputData(response.data.results);
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please make sure the API is running and try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-900">
      {healthStatus === 'offline' && (
        <div className="bg-red-600/90 backdrop-blur-sm text-white px-4 py-3 flex items-center justify-center gap-2 text-sm border-b border-red-500/50">
          <AlertCircle className="w-4 h-4" />
          <span>
            API is offline. Please ensure your FastAPI server is running at{' '}
            {import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}
          </span>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        <div className="w-[60%] border-r border-slate-700/50">
          <ChatPanel
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        </div>

        <div className="w-[40%]">
          <OutputPanel data={outputData} />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<ChatInterface />} />
      <Route path="/movie/:id" element={<MovieDetailPage />} />
    </Routes>
  );
}

export default App;
