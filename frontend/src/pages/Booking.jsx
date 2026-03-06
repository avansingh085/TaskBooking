import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { checkRoomAvailability, createBooking } from '../api/bookingApi';
import Loader from '../components/Loader';

const BookingPage = ({ userId }) => {
  
  const { roomId } = useParams(); 
  const navigate = useNavigate();

  const [dates, setDates] = useState({ start_date: '', end_date: '' });
  const [status, setStatus] = useState(''); 
  const [error, setError] = useState('');
  const [loading,setLoading]=useState(false);
  const handleCheck = async () => {
    setStatus('checking');
    setError('');
    setLoading(true);
    try {
      let data = await checkRoomAvailability(roomId, dates.start_date, dates.end_date);
    
      data=data.data;
     
      setStatus(data.message);
    } catch (err) {
      setError(err.message);
      setStatus('');
    }finally{
    setLoading(false);
  }
  };

  const handleBook = async () => {
    try {
      await createBooking({
        user_id: userId,
        room_id: roomId,
        start_date: dates.start_date,
        end_date: dates.end_date
      });
     
      navigate('/my-bookings'); 
    } catch (err) {
      setError(err.message);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-lg mx-auto bg-white p-6 mt-10 rounded-lg shadow-md border">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Book Room #{roomId}</h2>
      {error && <p className="text-red-500 mb-4 bg-red-50 p-2 rounded">{error}</p>}
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Check-in Date</label>
          <input 
            type="date" 
            min={today} 
            className="w-full border p-2 rounded mt-1 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => {
              setDates({...dates, start_date: e.target.value});
              setStatus(''); 
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Check-out Date</label>
          <input 
            type="date" 
            min={dates.start_date || today} 
            className="w-full border p-2 rounded mt-1 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => {
              setDates({...dates, end_date: e.target.value});
              setStatus(''); 
            }}
          />
        </div>

        <button 
          onClick={handleCheck}
          disabled={!dates.start_date || !dates.end_date || status === 'checking'}
          className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {status === 'checking' ? 'Checking...' : 'Check Availability'}
        </button>

        {status === 'unavailable' && (
          <p className="text-red-600 font-medium text-center bg-red-50 p-2 rounded">
            Dates are unavailable. Try another date range.
          </p>
        )}
        
        {status === 'available' && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 mb-3 text-center font-medium">Room is available!</p>
            <button 
              onClick={handleBook} 
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition shadow-sm"
            >
              <Loader text={"Confirm Booking"} isLoading={loading}/>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;