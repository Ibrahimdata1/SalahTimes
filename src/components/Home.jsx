import React, { useEffect, useState } from "react";
import SingleCard from "./SingleCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = ({ isAuthenticated, setIsAuthenticated }) => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [cards, setCards] = useState([]);
  const [city, setCity] = useState("Bangkok");
  const [country, setCountry] = useState("Thailand");
  const [apiCountries, setApiCountries] = useState([]);
  const [apiCities, setApiCities] = useState([]);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const respondTime = await axios.get(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`
        );
        const respondCountry = await axios.get(
          `https://restcountries.com/v3.1/all`
        );
        const respondCity = await axios.post(
          `https://countriesnow.space/api/v0.1/countries/cities`,
          {
            country: country,
          }
        );
        setApiCountries(respondCountry.data);
        setApiCities(respondCity.data.data);
        setPrayerTimes(respondTime.data.data.timings);
        const respond = await axios.get(`http://localhost:5000/api/`);
        setCards(respond.data.data);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    };
    fetchPrayerTimes();
  }, [city, country]);

  const prayerCards = cards.map((card) => ({
    id: card.id,
    name: card.title,
    time: prayerTimes[card.title],
    icon: card.image,
  }));

  if (!prayerTimes) {
    return <div>Loading...</div>;
  }
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setCity(""); // รีเซ็ตค่า city เมื่อเปลี่ยนประเทศ
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-screen-lg bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-semibold mb-4 text-center">
          Prayer Times for {city}, {country}
        </h1>
        {isAuthenticated && (
          <div className="flex justify-end">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            Select City:
          </label>
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
          >
            {apiCities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country:
          </label>
          <select
            id="country"
            value={country}
            onChange={handleCountryChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
          >
            {apiCountries.map((countryData) => (
              <option key={countryData.cca2} value={countryData.name.common}>
                {countryData.name.common}
              </option>
            ))}
          </select>
        </div>

        <h2 className="font-medium text-lg">Prayer Times</h2>

        {/* การ์ดเวลาละหมาด */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-4">
          {prayerCards.map((prayerCard) => (
            <SingleCard
              key={prayerCard.id}
              prayerName={prayerCard.name}
              prayerTime={prayerCard.time}
              icon={prayerCard.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
