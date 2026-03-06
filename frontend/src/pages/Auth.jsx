import React, { useState } from 'react';
import { loginUser, registerUser } from '../api/authApi';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';

const Auth = ({ }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
   const dispatch=useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const data = isLogin 
        ? await loginUser({ email: formData.email, password: formData.password }) 
        : await registerUser(formData);
        
      if(isLogin)
      {
        dispatch(login());
      }
      else
      {
        setIsLogin(true);
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
          {isLogin ? 'Sign In' : 'Create Account'}
        </h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text" placeholder="Full Name" required
              className="w-full px-4 py-2 border rounded-md"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          )}
          <input
            type="email" placeholder="Email Address" required
            className="w-full px-4 py-2 border rounded-md"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input
            type="password" placeholder="Password" required
            className="w-full px-4 py-2 border rounded-md"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <button type="submit" className="w-full bg-blue-800 text-white py-2 rounded-md">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 hover:underline">
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;