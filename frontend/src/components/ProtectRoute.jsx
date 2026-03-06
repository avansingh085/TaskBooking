 import React from 'react';
 import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
 export const ProtectedRoute = ({ children }) => {
  const {isLoggedIn}=useSelector((state)=>state.auth)
    if (!isLoggedIn) {
    
      return <Navigate to="/login" replace />;
    }
    return children;
  };
