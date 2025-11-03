import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Clock, Film, DollarSign, Smartphone } from 'lucide-react';
import { MovieShowResult } from '../types/api';

export default function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const movie: MovieShowResult | null = location.state?.movie || null;

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-white">Movie Not Found</h1>
          <p className="text-slate-400">The movie data couldn't be loaded.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const posterUrl = movie.movie_poster_url || movie.movie_poster_local;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white truncate">{movie.movie_name}</h1>
            <p className="text-sm text-slate-400">{movie.theater_name}</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posterUrl && (
            <div className="md:col-span-1">
              <div className="sticky top-24">
                <img
                  src={posterUrl}
                  alt={movie.movie_name}
                  className="w-full h-auto rounded-2xl shadow-2xl object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                {!posterUrl && (
                  <div className="w-full aspect-[3/4] bg-slate-800 rounded-2xl flex items-center justify-center">
                    <Film className="w-16 h-16 text-slate-600" />
                  </div>
                )}
              </div>
            </div>
          )}

          <div className={posterUrl ? 'md:col-span-2' : 'md:col-span-3'}>
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white">{movie.movie_name}</h2>
                <div className="flex flex-wrap gap-3">
                  {movie.movie_language && (
                    <span className="px-4 py-2 bg-red-600/20 border border-red-500/50 text-red-300 rounded-full text-sm font-medium">
                      {movie.movie_language}
                    </span>
                  )}
                  {movie.movie_format && (
                    <span className="px-4 py-2 bg-slate-700/50 border border-slate-600 text-slate-300 rounded-full text-sm font-medium">
                      {movie.movie_format.trim()}
                    </span>
                  )}
                  {movie.screen_type && (
                    <span className="px-4 py-2 bg-slate-700/50 border border-slate-600 text-slate-300 rounded-full text-sm font-medium">
                      {movie.screen_type}
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 space-y-6">
                <div>
                  <div className="flex items-start gap-4 pb-6 border-b border-slate-700/50">
                    <MapPin className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-sm text-slate-400 mb-2">Theater</h3>
                      <p className="text-white font-semibold text-lg mb-2">{movie.theater_name}</p>
                      <p className="text-slate-400 text-sm leading-relaxed">{movie.theater_address}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-sm text-slate-400 mb-2">Showtime</h3>
                      <p className="text-white font-semibold text-lg">{movie.showtime}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <DollarSign className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-sm text-slate-400 mb-2">Price</h3>
                      <p className="text-white font-semibold text-lg">{movie.price}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-700/50">
                  <div>
                    <h3 className="text-sm text-slate-400 mb-3">Category</h3>
                    <span className="px-4 py-2 bg-slate-700/50 border border-slate-600 text-slate-300 rounded-lg inline-block font-medium">
                      {movie.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm text-slate-400 mb-3">Availability</h3>
                    <span
                      className={`px-4 py-2 rounded-lg inline-block font-medium border ${
                        movie.is_available
                          ? 'bg-green-600/20 border-green-500/50 text-green-300'
                          : 'bg-red-600/20 border-red-500/50 text-red-300'
                      }`}
                    >
                      {movie.availability}
                    </span>
                  </div>
                </div>
              </div>

              {movie.is_available && (
                <button className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-red-500/30 flex items-center justify-center gap-3 text-lg">
                  <Smartphone className="w-6 h-6" />
                  Book Tickets
                </button>
              )}

              {!movie.is_available && (
                <div className="w-full py-4 bg-slate-700/50 text-slate-300 font-semibold rounded-xl flex items-center justify-center">
                  Sold Out
                </div>
              )}

              {movie.movie_rating && (
                <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                  <h3 className="text-sm text-slate-400 mb-2">Rating</h3>
                  <p className="text-white font-semibold text-lg">{movie.movie_rating}</p>
                </div>
              )}

              {movie.movie_duration && (
                <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                  <h3 className="text-sm text-slate-400 mb-2">Duration</h3>
                  <p className="text-white font-semibold text-lg">{movie.movie_duration}</p>
                </div>
              )}

              {movie.movie_genre && (
                <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                  <h3 className="text-sm text-slate-400 mb-2">Genre</h3>
                  <p className="text-white font-semibold text-lg">{movie.movie_genre}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
