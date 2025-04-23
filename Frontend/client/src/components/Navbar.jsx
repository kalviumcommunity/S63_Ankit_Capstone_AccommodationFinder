import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-lg font-bold">StudentHousing</h1>
      <div>
        <a href="/" className="mx-2">Home</a>
        <a href="/rooms" className="mx-2">Rooms</a>
        <a href="/about" className="mx-2">About</a>
      </div>
    </nav>
  );
};

export default Navbar;