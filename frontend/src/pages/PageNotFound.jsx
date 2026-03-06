import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="flex-grow flex items-center justify-center min-h-[70vh] px-4">
      <div className="text-center">
       
        <h1 className="text-9xl font-extrabold text-blue-800 tracking-widest">404</h1>
        
        <div className="bg-blue-100 text-blue-800 px-2 py-1 text-sm rounded rotate-12 absolute -mt-16 ml-24 font-semibold shadow-sm">
          Page Not Found
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4">
          Oops! You seem to be lost.
        </h2>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link 
          to="/" 
          className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-md hover:bg-blue-700 transition shadow-md"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;