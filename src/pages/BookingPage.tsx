import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface BookingState {
  movieName: string;
  theater: string;
  showtime: string;
  price: number;
}

export default function BookingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = (location.state as BookingState) || {
    movieName: 'Movie',
    theater: 'Theater',
    showtime: '7:00 PM',
    price: 250,
  };

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [step, setStep] = useState<'seats' | 'payment'>('seats');
  const [paymentData, setPaymentData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seatsPerRow = 10;
  const bookedSeats = ['A3', 'A4', 'B5', 'C1', 'C2', 'D7'];

  const toggleSeat = (seatId: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]
    );
  };

  const totalPrice = selectedSeats.length * bookingData.price;

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    setStep('payment');
  };

  const handlePayment = () => {
    if (!paymentData.cardName || !paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv) {
      alert('Please fill in all payment details');
      return;
    }
    alert(`Booking confirmed! ${selectedSeats.length} seats booked for ${bookingData.movieName}`);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Chat
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{bookingData.movieName}</h1>
            <p className="text-gray-600">
              {bookingData.theater} • {bookingData.showtime}
            </p>
          </div>

          {step === 'seats' ? (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Your Seats</h2>

              <div className="flex justify-center mb-8">
                <div className="bg-purple-200 text-purple-900 px-6 py-2 rounded-full text-sm font-medium">
                  Screen
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {rows.map((row) => (
                  <div key={row} className="flex items-center gap-4 justify-center">
                    <span className="w-8 text-center font-semibold text-gray-700">{row}</span>
                    <div className="flex gap-2">
                      {Array.from({ length: seatsPerRow }).map((_, i) => {
                        const seatId = `${row}${i + 1}`;
                        const isBooked = bookedSeats.includes(seatId);
                        const isSelected = selectedSeats.includes(seatId);

                        return (
                          <button
                            key={seatId}
                            onClick={() => !isBooked && toggleSeat(seatId)}
                            disabled={isBooked}
                            className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
                              isBooked
                                ? 'bg-gray-400 text-gray-500 cursor-not-allowed'
                                : isSelected
                                  ? 'bg-purple-600 text-white shadow-lg scale-105'
                                  : 'bg-gray-200 text-gray-700 hover:bg-purple-200'
                            }`}
                          >
                            {isSelected && <Check className="w-5 h-5 mx-auto" />}
                            {!isSelected && !isBooked && i + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-6 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <span className="text-gray-600">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-600 rounded"></div>
                  <span className="text-gray-600">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-400 rounded"></div>
                  <span className="text-gray-600">Booked</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">
                      {selectedSeats.length} {selectedSeats.length === 1 ? 'Seat' : 'Seats'} Selected
                    </p>
                    <p className="text-sm text-gray-600">Seats: {selectedSeats.join(', ') || 'None'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 text-sm mb-1">Total Price</p>
                    <p className="text-3xl font-bold text-purple-600">₹{totalPrice}</p>
                  </div>
                </div>

                <button
                  onClick={handleBooking}
                  disabled={selectedSeats.length === 0}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Details</h2>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-8">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Seats</p>
                    <p className="font-semibold text-gray-900">{selectedSeats.join(', ')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600">Amount</p>
                    <p className="font-semibold text-gray-900">₹{totalPrice}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    name="cardName"
                    value={paymentData.cardName}
                    onChange={handlePaymentChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handlePaymentChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={paymentData.expiryDate}
                      onChange={handlePaymentChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={paymentData.cvv}
                      onChange={handlePaymentChange}
                      placeholder="123"
                      maxLength="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep('seats')}
                  className="flex-1 py-3 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handlePayment}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg"
                >
                  Pay ₹{totalPrice}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
