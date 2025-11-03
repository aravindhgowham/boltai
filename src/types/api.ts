export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface MovieInfo {
  movie_name?: string;
  theater_name?: string;
  showtimes?: string[];
  date?: string;
  language?: string;
  seat_types?: string[];
  prices?: Record<string, number>;
  available_seats?: number;
}

export interface ChatResponse {
  response: string;
  data?: MovieInfo[];
}

export interface HealthResponse {
  status: string;
  message?: string;
}

export interface Movie {
  id: string;
  name: string;
  theaters?: string[];
}
