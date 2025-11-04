import { useState, useRef, useEffect } from 'react';
import Lottie from 'lottie-react';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  isLoading: boolean;
}

export default function VoiceInput({ onTranscript, isLoading }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    const SpeechRecognition = window.webkitSpeechRecognition || (window as any).SpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('Speech Recognition API not supported');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      fetchAnimationData();
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(finalTranscript || interimTranscript);

      if (finalTranscript) {
        onTranscript(finalTranscript.trim());
        setTranscript('');
        setIsListening(false);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
    };
  }, [onTranscript]);

  const fetchAnimationData = async () => {
    try {
      const response = await fetch(
        'https://assets-v2.lottiefiles.com/a/1d64f64e-dfe1-11ee-a390-a7bd47dd18d6/FTAiTAPwxd.json'
      );
      const data = await response.json();
      setAnimationData(data);
    } catch (error) {
      console.error('Failed to load animation:', error);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      recognitionRef.current.start();
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={toggleListening}
        disabled={isLoading}
        className={`relative w-16 h-16 rounded-full transition-all duration-300 flex items-center justify-center shadow-lg ${
          isListening
            ? 'bg-purple-600 hover:bg-purple-700 scale-110'
            : 'bg-purple-500 hover:bg-purple-600'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isListening && animationData ? (
          <div className="w-12 h-12">
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        ) : (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3z" />
            <path d="M17.991 17.409a7.003 7.003 0 0 1-13.982 0H2a9 9 0 0 0 18 0z" />
          </svg>
        )}
      </button>
      {isListening && (
        <p className="text-sm text-purple-600 font-medium animate-pulse">
          {transcript || 'Listening...'}
        </p>
      )}
    </div>
  );
}
