import { ChatResponse, HealthResponse, Movie } from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const api = {
  async checkHealth(): Promise<HealthResponse> {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    if (!response.ok) throw new Error('Health check failed');
    return response.json();
  },

  async getMovies(): Promise<Movie[]> {
    const response = await fetch(`${API_BASE_URL}/api/movies`);
    if (!response.ok) throw new Error('Failed to fetch movies');
    return response.json();
  },

  async sendMessage(message: string): Promise<ChatResponse> {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    if (!response.ok) throw new Error('Failed to send message');
    return response.json();
  },
};
