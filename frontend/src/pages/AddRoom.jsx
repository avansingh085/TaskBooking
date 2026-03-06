import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRoom } from '../api/roomApi';
import Loader from '../components/Loader';

const AddRoom = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    price_per_night: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      
      await createRoom({
        name: formData.name,
        price_per_night: Number(formData.price_per_night)
      });
      
      navigate('/'); 
    } catch (err) {
      setError(err.message || "Failed to create the room. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 mt-10 rounded-lg shadow-md border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Add New Room</h2>
        <button 
          onClick={() => navigate('/')}
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Cancel
        </button>
      </div>

      {error && (
        <p className="text-red-500 mb-4 bg-red-50 p-3 rounded border border-red-200">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Room Name
          </label>
          <input 
            type="text" 
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2.5 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="e.g. Deluxe Ocean View"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Per Night ($)
          </label>
          <input 
            type="number" 
            name="price_per_night"
            min="1"
            required
            value={formData.price_per_night}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2.5 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="e.g. 150"
          />
        </div>

        <button 
          type="submit"
          disabled={loading || !formData.name || !formData.price_per_night}
          className="w-full bg-blue-600 text-white py-2.5 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition font-medium mt-4 shadow-sm"
        >
          {loading ? <Loader text="Saving Room..." isLoading={true} /> : "Add Room"}
        </button>
      </form>
    </div>
  );
};

export default AddRoom;