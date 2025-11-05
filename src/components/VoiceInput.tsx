import { useState, useRef, useEffect } from "react";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  isLoading: boolean;
  hasChatHistory: boolean;
}

export default function VoiceInput({ onTranscript, isLoading, hasChatHistory }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech Recognition API not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      setShowPopup(true);
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += text + " ";
        else interimTranscript += text;
      }

      setTranscript(finalTranscript || interimTranscript);

      if (finalTranscript) {
        onTranscript(finalTranscript.trim());
        setTranscript("");
        setTimeout(() => {
          setShowPopup(false);
          setIsListening(false);
        }, 800);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      setShowPopup(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      setShowPopup(false);
    };

    recognitionRef.current = recognition;

    return () => recognition.abort();
  }, [onTranscript]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setShowPopup(false);
    } else {
      setTranscript("");
      recognitionRef.current.start();
    }
  };

  const handleSend = () => {
    const input = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (input && input.value.trim()) {
      onTranscript(input.value.trim());
      input.value = "";
    }
  };

  return (
    <>
      {/* Center Voice Button - Appears when no chat history */}
      {!hasChatHistory && (
        <div className="flex justify-center items-center">
          <button
            onClick={toggleListening}
            disabled={isLoading}
            className="border-none bg-transparent shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img
              src="https://assets-v2.lottiefiles.com/a/1d64f64e-dfe1-11ee-a390-a7bd47dd18d6/FTAiTAPwxd.gif"
              alt="Voice input"
              className="w-28 h-32 object-contain cursor-pointer hover:scale-110 transition-transform duration-300"
            />
          </button>
        </div>
      )}

      {/* Input Area with Send Button - Appears when chat history exists */}
      {hasChatHistory && (
        <div className="flex items-center gap-3 w-full">
          {/* Text Input Area */}
          <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2">
            <input
              type="text"
              placeholder="Type or use voice..."
              className="w-full bg-transparent outline-none text-gray-800"
              disabled={isLoading}
            />
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="border-none bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-6 py-2 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            Send
          </button>
        </div>
      )}

      {/* Listening Popup - Center of screen */}
      {showPopup && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center max-w-sm w-full mx-4">
            {/* Animated Voice GIF */}
            <img
              src="https://assets-v2.lottiefiles.com/a/1d64f64e-dfe1-11ee-a390-a7bd47dd18d6/FTAiTAPwxd.gif"
              alt="Listening"
              className="w-32 h-32 object-contain mb-4"
            />

            {/* Transcript Text */}
            <p className="text-center text-gray-800 font-medium text-lg min-h-6">
              {transcript ? (
                <span className="text-purple-600 font-semibold">{transcript}</span>
              ) : (
                <span className="text-gray-600 animate-pulse">Listening...</span>
              )}
            </p>

            {/* Cancel Button */}
            <button
              onClick={() => {
                recognitionRef.current?.stop();
                setShowPopup(false);
                setIsListening(false);
              }}
              className="mt-6 px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Usage Example:
// <VoiceInput 
//   onTranscript={(text) => handleSendMessage(text)} 
//   isLoading={false}
//   hasChatHistory={chatMessages.length > 0}
// />