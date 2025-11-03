import { useState, useRef, useEffect } from 'react';
import { Send, Film } from 'lucide-react';
import { ChatMessage } from '../types/api';

interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function ChatPanel({ messages, onSendMessage, isLoading }: ChatPanelProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="p-6 border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-red-600 to-red-700 rounded-lg shadow-lg">
            <Film className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Movie Booking Assistant</h1>
            <p className="text-sm text-slate-400">Ask me about movies, showtimes & bookings</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <div className="inline-block p-4 bg-slate-800/50 rounded-full">
                <Film className="w-12 h-12 text-red-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Welcome!</h2>
                <p className="text-slate-400 max-w-md">
                  Ask me about movies playing in your area, showtimes, or book tickets.
                </p>
              </div>
              <div className="space-y-2 text-sm text-slate-500">
                <p>Try asking:</p>
                <div className="space-y-1">
                  <p className="text-slate-400">"Show me movies in Coimbatore"</p>
                  <p className="text-slate-400">"Book tickets for Leo at 7 PM"</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-lg ${
                message.sender === 'user'
                  ? 'bg-gradient-to-br from-red-600 to-red-700 text-white'
                  : 'bg-slate-800/80 text-slate-100 border border-slate-700/50'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
              <p
                className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-red-200' : 'text-slate-500'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800/80 text-slate-100 rounded-2xl px-5 py-3 shadow-lg border border-slate-700/50">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce delay-200"></span>
                </div>
                <span className="text-sm text-slate-400">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-6 py-3 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-xl font-medium hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-red-500/30"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
