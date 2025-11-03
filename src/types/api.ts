export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface MovieShowResult {
  theater_name: string;
  theater_address: string;
  movie_name: string;
  movie_language: string;
  movie_format: string;
  movie_poster_url: string | null;
  movie_poster_local: string | null;
  movie_rating: string | null;
  movie_duration: string | null;
  movie_genre: string | null;
  showtime: string;
  screen_type: string;
  category: string;
  price: string;
  availability: string;
  is_available: boolean;
}

export interface ChatResponseData {
  count: number;
  date: string;
  data_updated: string;
  results: MovieShowResult[];
}

export interface ChatResponse {
  user_query: string;
  response: string;
  data?: ChatResponseData;
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
