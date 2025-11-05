import { useState, useRef, useEffect } from 'react';
import { Send, Film } from 'lucide-react';
import { ChatMessage } from '../types/api';
import VoiceInput from './VoiceInput';

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

  const handleVoiceInput = (text: string) => {
    if (text.trim() && !isLoading) {
      onSendMessage(text);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-3 border-b border-purple-300/50 bg-gradient-to-r from-purple-50 to-white">
        <div className="flex items-center gap-4">
          <div className="p-1 bg-gradient-to-br from-purple-600 to-purple-1 rounded-lg shadow-lg">
            <img
              src="https://static.vecteezy.com/system/resources/previews/002/700/746/non_2x/glowing-neon-movie-clapper-icon-isolated-on-brick-wall-background-film-clapper-board-icon-clapperboard-sign-cinema-production-or-media-industry-concept-illustration-vector.jpg"
              alt="Film Reel"
              className="w-10 h-10 object-cover rounded-md"
            />
          </div>


          <div>
            <h1 className="text-1xl text-gray-900">Book My Seat!</h1>
            <p className="text-sm text-gray-600">Vikas-x.com</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-6">
              <div className="inline-block p-4 bg-purple-100 rounded-full">
                <Film className="w-12 h-12 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome!</h2>
                <p className="text-gray-600 max-w-md">
                  Ask me about movies playing in your area, showtimes, or book tickets.
                </p>
              </div>
                <VoiceInput onTranscript={handleVoiceInput} isLoading={isLoading} />
              {/* </div> */}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
          >
            <div
              className={`max-w-[80%] rounded-xl p-4 shadow-md ${
                message.sender === 'user'
                  ? 'bg-gradient-to-br from-purple-600 to-purple-700 text-white'
                  : 'bg-white text-gray-900 border border-gray-200'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
              <p
                className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-purple-200' : 'text-gray-500'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-900 rounded-xl p-4 shadow-md border border-gray-200">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-200"></span>
                </div>
                <span className="text-sm text-gray-600">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 border-t border-purple-200/50 bg-gray-50">
        <form onSubmit={handleSubmit} className="flex gap-2 items-end">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 min-w-0 px-4 py-3 bg-white border border-purple-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-50 text-sm"
          />
          <div className="flex-shrink-0">
            {messages.length > 0 && (
              <VoiceInput onTranscript={handleVoiceInput} isLoading={isLoading} />
            )}
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0 px-4 py-3 bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-xl font-medium hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-purple-500/30"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}