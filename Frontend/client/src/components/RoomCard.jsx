import React from 'react';

const RoomCard = ({ room }) => {
  return (
    <div className="p-4 m-2 border rounded-xl shadow-md bg-white">
      <h2 className="text-xl font-bold">{room.title}</h2>
      <p className="text-sm text-gray-600">{room.description}</p>
      <p className="text-green-600 font-semibold mt-2">₹{room.rent}/month</p>
    </div>
  );
};

export default RoomCard;