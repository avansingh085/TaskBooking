import React from 'react';

const RoomCard = ({ room, onSelectRoom }) => {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-4 flex flex-col">
      <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
      <p className="text-gray-600 mb-4 text-lg font-bold">
        ${room.price_per_night} <span className="text-sm font-normal">/ night</span>
      </p>
      <button 
        onClick={() => onSelectRoom(room.id)}
        className="mt-auto w-full cursor-pointer bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Book Now
      </button>
    </div>
  );
};

export default RoomCard;