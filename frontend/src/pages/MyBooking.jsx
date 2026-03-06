import React, { useEffect, useState } from 'react';
import { getUserBookings } from '../api/bookingApi';




const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await getUserBookings();
        console.log(data)
        setBookings(data.data.data || []);
      } catch (err) {

        console.warn("Failed to fetch bookings. Using default data instead.", err.message);
       
      } finally {
        setLoading(false);
      }
    };

    
      fetchBookings();
   
    
    
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading your bookings...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Bookings</h2>
      
      {bookings.length === 0 ? (
        <p className="text-gray-600 bg-white p-6 rounded-md shadow-sm border text-center">
          You have no upcoming bookings.
        </p>
      ) : (
        <ul className="divide-y divide-gray-200 bg-white shadow rounded-md border">
          {bookings.map((booking) => (
            <li key={booking.id} className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 hover:bg-gray-50 transition">
              <div>
                <h4 className="text-lg font-bold text-blue-800">
                  {booking.room_name || `Room #${booking.room_id}`}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium text-gray-800">Check-in:</span> {new Date(booking.start_date).toLocaleDateString()} <br className="sm:hidden" />
                  <span className="sm:mx-2 hidden sm:inline">|</span>
                  <span className="font-medium text-gray-800">Check-out:</span> {new Date(booking.end_date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                  Confirmed
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;