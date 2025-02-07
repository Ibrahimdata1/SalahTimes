import React from "react";

const SingleCard = ({ prayerName, prayerTime, icon }) => {
  return (
    <div className="flex flex-col items-center max-w-xs w-full rounded-lg overflow-hidden shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-xl">
      {/* Icon or image section */}
      <div className="w-full h-48">
        <img
          className="w-full h-full object-cover"
          src={icon}
          alt={prayerName}
        />
      </div>

      {/* Prayer Name and Time */}
      <div className="px-6 py-4 text-center">
        <h2 className="font-semibold text-xl text-gray-800 mb-2">
          {prayerName}
        </h2>
        <p className="text-2xl font-bold text-blue-600">{prayerTime}</p>
      </div>

      {/* Button */}
      <div className="px-6 py-3 w-full">
        <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200">
          Set Reminder
        </button>
      </div>
    </div>
  );
};

export default SingleCard;
