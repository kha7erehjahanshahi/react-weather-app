import React, { useState } from "react";
import Header from "./Header";
import "./Home.css";
import getWeather from "./api";



function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: "Germany",
    humidity: 10,
    speed: 2,
    image: "/Images/clouds.png",
  });

  const [name, setName] = useState("");

  const handleClick = () => {
    if (name === "") {
      return
    }

    getWeather(name).then(weatherData => {
      setData({
        ...data,
        celcius: weatherData.main.temp,
        name: weatherData.name,
        humidity: weatherData.main.humidity,
        speed: weatherData.wind.speed,
        image: weatherData.weather[0].main.toLowerCase(),
      });
    }).catch(error => {
      console.log(error);
    });
  };

  return (
    <>
      <div className="container">
        <div className="weather">
          <Header />
          <div className="search">
            <input
              type="text"
              placeholder="Enter City Name"
              onChange={(e) => setName(e.target.value)}
            />
            <button>
              <img src="/Images/search.png" onClick={handleClick} alt="" />
            </button>
          </div>
          <div className="weather-info">
            <img className="icon" src={`/Images/${data.image}.png`} alt="" />
            <h1>{Math.round(data.celcius)}°C</h1>
            <h2>{data.name}</h2>
            <div className="details">
              <div className="col">
                <img src="./Images/humidity.png" alt="" />
                <div className="humidity">
                  <p>{Math.round(data.humidity)}%</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="col">
                <img src="/react-weather-app/Images/wind.png" alt="" />
                <div className="wind">
                  <p>{Math.round(data.speed)} km/h</p>
                  <p>Wind</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
