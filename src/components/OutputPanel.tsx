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
      <div className="h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="inline-block p-4 bg-slate-800/50 rounded-full">
            <Film className="w-12 h-12 text-slate-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">No Results Yet</h2>
            <p className="text-slate-400 max-w-md">
              Movie information will appear here when you start chatting with the assistant.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-y-auto">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Available Shows</h2>
          <p className="text-slate-400 text-sm">
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
                <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden hover:border-red-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20 hover:scale-[1.02]">
                  <div className="flex gap-4 p-4">
                    {posterUrl && (
                      <div className="flex-shrink-0 w-24 h-32 rounded-xl overflow-hidden bg-slate-700">
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
                      <h3 className="text-lg font-bold text-white mb-2 truncate group-hover:text-red-400 transition-colors">
                        {movie.movie_name}
                      </h3>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                          <span className="truncate">{movie.theater_name}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <Clock className="w-4 h-4 text-red-500 flex-shrink-0" />
                          <span>{movie.showtime}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <DollarSign className="w-4 h-4 text-red-500 flex-shrink-0" />
                          <span className="font-semibold">{movie.price}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1 bg-slate-700/50 text-slate-300 text-xs font-medium rounded-full">
                          {movie.movie_language}
                        </span>
                        <span className="px-3 py-1 bg-slate-700/50 text-slate-300 text-xs font-medium rounded-full">
                          {movie.screen_type}
                        </span>
                        <span className="px-3 py-1 bg-slate-700/50 text-slate-300 text-xs font-medium rounded-full">
                          {movie.category}
                        </span>

                        {movie.is_available && (
                          <span className="px-3 py-1 bg-green-600/20 border border-green-500/50 text-green-300 text-xs font-medium rounded-full flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            Available
                          </span>
                        )}

                        {!movie.is_available && (
                          <span className="px-3 py-1 bg-red-600/20 border border-red-500/50 text-red-300 text-xs font-medium rounded-full">
                            Sold Out
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex-shrink-0 flex items-center">
                      <div className="text-right space-y-1">
                        <div className="text-red-400 font-bold text-lg">{movie.price}</div>
                        <Tag className="w-5 h-5 text-slate-600 group-hover:text-red-500 transition-colors" />
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
