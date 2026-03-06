import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectRoute';
import Header from './components/Header';
import Home from './pages/Home';
import Auth from './pages/Auth';
import BookingPage from './pages/Booking';
import MyBookings from './pages/MyBooking';
import { PublicRoute } from './components/PublicRoutes';
import Footer from './components/Footer';
import PageNotFound from './pages/PageNotFound';
import { useEffect } from 'react';
import { getUser } from './api/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './features/authSlice';
import AddRoom from './pages/AddRoom';


const App = () => {

  const {isLoggedIn}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        
        const res = await getUser();
        if(res.data.data?.name)
        dispatch(login(res.data.data));
      }
      catch (err) {
        dispatch(logout());
        console.log(err);

      }
    }
    fetchUser();
  }, [isLoggedIn])

  return (
    <Router>
      <Header  />

      <main className="min-h-screen bg-gray-50">
        <Routes>

          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Auth  />
              </PublicRoute>
            }
          />
         

          <Route
            path="/book/:roomId"
            element={
              <ProtectedRoute>
                <BookingPage  />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-bookings"
            element={
             <ProtectedRoute>
              <MyBookings />
              </ProtectedRoute>

            }
          />
          <Route path="/add-room" element={<AddRoom/>}/>
          <Route path="*" element={<PageNotFound />} />
        </Routes>

      </main>
      <Footer />
    </Router>
  );
};

export default App;