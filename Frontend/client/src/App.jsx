import React from 'react';
import Navbar from './components/Navbar';
import RoomCard from './components/RoomCard';
import Footer from './components/Footer';

const dummyRoom = {
  title: 'Cozy 1BHK in Jagatpura',
  description: 'Close to JECRC University, fully furnished',
  rent: 8000,
};

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="p-4">
        <RoomCard room={dummyRoom} />
      </div>
      <Footer />
    </div>
  );
}

export default App;