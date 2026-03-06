import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white pt-10 pb-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
         
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-bold tracking-tight mb-4 block">BookingApp</span>
            <p className="text-blue-200 text-sm">
              Your trusted platform for finding the perfect stay. Book rooms with ease.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="#" className="hover:text-white transition">Stays</a></li>
              <li><a href="#" className="hover:text-white transition">Flights</a></li>
              <li><a href="#" className="hover:text-white transition">Car Rentals</a></li>
            </ul>
          </div>

        
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><a href="#" className="hover:text-white transition">Customer Service</a></li>
              <li><a href="#" className="hover:text-white transition">FAQs</a></li>
              <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-blue-200 mb-4">Subscribe for the latest deals and offers.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="px-3 py-2 w-full rounded-l-md text-gray-800 focus:outline-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 pt-6 text-center text-sm text-blue-300">
          <p>&copy; {new Date().getFullYear()} BookingApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;