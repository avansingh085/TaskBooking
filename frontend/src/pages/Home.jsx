import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllRooms } from '../api/roomApi';
import RoomCard from '../components/RoomCard';

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
          const result = await getAllRooms();
         
          setRooms(result.data.data);
      } catch (err) {
        console.error("Failed to fetch rooms, using default data:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading available rooms...</div>;
  }

  const handleRoomClick = (roomId) => {
    navigate(`/book/${roomId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
     
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Available Rooms</h1>
        
       
        <button 
          onClick={() => navigate('/add-room')}
          className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-green-700 transition shadow-sm font-medium"
        >
          + Add New Room
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {rooms.map(room => (
          <RoomCard 
            key={room.id} 
            room={room} 
            onSelectRoom={() => handleRoomClick(room.id)} 
          />
        ))}
        
       
        {rooms.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-10">
            No rooms available yet. Click "Add New Room" to get started!
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;