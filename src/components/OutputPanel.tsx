import { Clock, MapPin, Calendar, DollarSign, Users, Film } from 'lucide-react';
import { MovieInfo } from '../types/api';

interface OutputPanelProps {
  data: MovieInfo[];
}

export default function OutputPanel({ data }: OutputPanelProps) {
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
          <h2 className="text-2xl font-bold text-white mb-2">Movie Details</h2>
          <p className="text-slate-400 text-sm">
            Showing {data.length} {data.length === 1 ? 'result' : 'results'}
          </p>
        </div>

        <div className="space-y-4">
          {data.map((movie, index) => (
            <div
              key={index}
              className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden hover:border-red-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/10"
            >
              <div className="p-6 space-y-4">
                {movie.movie_name && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gradient-to-br from-red-600 to-red-700 rounded-lg shadow-lg flex-shrink-0">
                      <Film className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{movie.movie_name}</h3>
                      {movie.language && (
                        <span className="inline-block px-3 py-1 bg-slate-700/50 text-slate-300 text-xs font-medium rounded-full">
                          {movie.language}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {movie.theater_name && (
                  <div className="flex items-start gap-3 pl-1">
                    <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-400 mb-1">Theater</p>
                      <p className="text-white font-medium">{movie.theater_name}</p>
                    </div>
                  </div>
                )}

                {movie.date && (
                  <div className="flex items-start gap-3 pl-1">
                    <Calendar className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-400 mb-1">Date</p>
                      <p className="text-white font-medium">{movie.date}</p>
                    </div>
                  </div>
                )}

                {movie.showtimes && movie.showtimes.length > 0 && (
                  <div className="flex items-start gap-3 pl-1">
                    <Clock className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-slate-400 mb-2">Showtimes</p>
                      <div className="flex flex-wrap gap-2">
                        {movie.showtimes.map((time, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-2 bg-slate-700/50 border border-slate-600 text-white text-sm font-medium rounded-lg hover:bg-red-600/20 hover:border-red-500 transition-all cursor-pointer"
                          >
                            {time}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {movie.seat_types && movie.seat_types.length > 0 && (
                  <div className="flex items-start gap-3 pl-1">
                    <Users className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-slate-400 mb-2">Seat Types</p>
                      <div className="flex flex-wrap gap-2">
                        {movie.seat_types.map((seat, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-slate-700/50 border border-slate-600 text-slate-300 text-xs font-medium rounded-lg"
                          >
                            {seat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {movie.prices && Object.keys(movie.prices).length > 0 && (
                  <div className="flex items-start gap-3 pl-1">
                    <DollarSign className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-slate-400 mb-2">Pricing</p>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(movie.prices).map(([type, price]) => (
                          <div
                            key={type}
                            className="px-3 py-2 bg-slate-700/30 border border-slate-600 rounded-lg"
                          >
                            <p className="text-xs text-slate-400">{type}</p>
                            <p className="text-white font-semibold">₹{price}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {movie.available_seats !== undefined && (
                  <div className="flex items-center gap-3 pl-1 pt-2 border-t border-slate-700/50">
                    <Users className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-400">Available Seats</p>
                      <p className="text-white font-semibold text-lg">{movie.available_seats}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
