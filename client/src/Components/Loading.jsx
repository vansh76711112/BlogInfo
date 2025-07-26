import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Loading = () => {
  return (
    <div>
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 px-4 text-center space-y-6">
        <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl text-white">
          404 - This is not the web page you are looking for.
        </h1>

        <h2 className="text-green-200 text-lg sm:text-xl">
          Please provide the correct URL.
        </h2>

        <img
          src="https://png.pngtree.com/png-clipart/20220306/original/pngtree-confused-girl-concept-png-image_7418851.png"
          className="w-32 sm:w-44 md:w-56"
          alt="Confused Girl"
        />
      </div>

      <Footer />
    </div>
  );
};

export default Loading;
