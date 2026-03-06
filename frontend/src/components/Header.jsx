import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; 
import { logoutUser } from '../api/authApi';
import { logout } from '../features/authSlice';

const Header = () => {
  
 const {user,isLoggedIn}=useSelector((state)=>state.auth);
 const dispatch=useDispatch();
 
  const logoutHandler=async()=>{
    try{
      console.log("logout handler called");
         await logoutUser();
         dispatch(logout());

    }
    catch(err){
      console.log(err,"error during logout");
      
    }
  }

  return (
    <header className="bg-blue-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
         
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              BookingApp
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            {isLoggedIn&&<Link to="/my-bookings" className="hover:text-blue-200 transition-colors font-medium">My Booking</Link>}
            
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity">
                  <img
                    src={`https://ui-avatars.com/api/?name=${user?.name}&background=0D8ABC&color=fff`}
                    alt="User Avatar"
                    className="h-9 w-9 rounded-full border-2 border-white"
                  />
                  <span className="font-medium text-sm">{user?.name}</span>
                </div>
                <button
                  onClick={logoutHandler}
                  className="px-4 py-2 border cursor-pointer border-white rounded-md text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="px-4 py-2 border border-white rounded-md text-sm font-medium hover:bg-white/10 transition-colors">
                  Register
                </Link>
             
           <Link to="/login" className="px-4 py-2 bg-white text-blue-800 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors">
                  Sign In
                </Link>
              </div>
            )}
          </div>

          
        </div>
      </div>

     
    </header>
  );
};

export default Header;