import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, Film, DollarSign, Tag, Zap } from 'lucide-react';
import { MovieShowResult } from '../types/api';

interface OutputPanelProps {
  data: MovieShowResult[];
}

export default function OutputPanel({ data }: OutputPanelProps) {
  const navigate = useNavigate();

  if (data.length === 0) {
    return (
      <div className="h-full bg-gradient-to-br from-gray-50 to-purple-50 flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="inline-block p-4 bg-purple-100 rounded-full">
            <Film className="w-12 h-12 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Results Yet</h2>
            <p className="text-gray-600 max-w-md">
              Movie information will appear here when you start chatting with the assistant.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 to-purple-50 overflow-y-auto">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Shows</h2>
          <p className="text-gray-600 text-sm">
            {data.length} {data.length === 1 ? 'show' : 'shows'} found · Click to view details
          </p>
        </div>

        <div className="space-y-4">
          {data.map((movie, index) => {
            const posterUrl = movie.movie_poster_url || movie.movie_poster_local;

            return (
              <button
                key={index}
                onClick={() =>
                  navigate(`/movie/${index}`, {
                    state: { movie },
                  })
                }
                className="w-full text-left group"
              >
                <div className="bg-white rounded-2xl border border-purple-200 shadow-lg overflow-hidden hover:border-purple-400 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-300/30 hover:scale-[1.02]">
                  <div className="flex gap-4 p-4">
                    {posterUrl && (
                      <div className="flex-shrink-0 w-24 h-32 rounded-xl overflow-hidden bg-gray-200">
                        <img
                          src={posterUrl}
                          alt={movie.movie_name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 truncate group-hover:text-purple-600 transition-colors">
                        {movie.movie_name}
                      </h3>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 text-purple-600 flex-shrink-0" />
                          <span className="truncate">{movie.theater_name}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4 text-purple-600 flex-shrink-0" />
                          <span>{movie.showtime}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <DollarSign className="w-4 h-4 text-purple-600 flex-shrink-0" />
                          <span className="font-semibold">{movie.price}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                          {movie.movie_language}
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                          {movie.screen_type}
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                          {movie.category}
                        </span>

                        {movie.is_available && (
                          <span className="px-3 py-1 bg-green-100 border border-green-300 text-green-700 text-xs font-medium rounded-full flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            Available
                          </span>
                        )}

                        {!movie.is_available && (
                          <span className="px-3 py-1 bg-red-100 border border-red-300 text-red-700 text-xs font-medium rounded-full">
                            Sold Out
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex-shrink-0 flex items-center">
                      <div className="text-right space-y-1">
                        <div className="text-purple-600 font-bold text-lg">{movie.price}</div>
                        <Tag className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
