import React, { useState } from "react";
import Header from "./Header";
import styles from "./Home.module.css";
import getWeather from "./api";

function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: "Germany",
    humidity: 10,
    speed: 2,
    image: "clouds",
  });

  const [name, setName] = useState("");

  const handleClick = () => {
    if (name === "") {
      return;
    }

    getWeather(name)
      .then((weatherData) => {
        setData({
          ...data,
          celcius: weatherData.main.temp,
          name: weatherData.name,
          humidity: weatherData.main.humidity,
          speed: weatherData.wind.speed,
          image: weatherData.weather[0].main.toLowerCase(),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.weather}>
          <Header />
          <div className={styles.search}>
            <input
              type="text"
              placeholder="Enter City Name"
              onChange={(e) => setName(e.target.value)}
            />
            <button>
              <img
                src="/react-weather-app/Images/search.png"
                onClick={handleClick}
                alt=""
              />
            </button>
          </div>
          <div className={styles.weather_info}>
            <img
              className={styles.icon}
              src={`/react-weather-app/Images/${data.image}.png`}
              alt=""
            />
            <h1>{Math.round(data.celcius)}°C</h1>
            <h2>{data.name}</h2>
            <div className={styles.details}>
            <div className={styles.col}>
                <img src="/react-weather-app/Images/humidity.png" alt="" />
                <div className={styles.humidity}>
                  <p>{Math.round(data.humidity)}%</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className={styles.col}>
                <img src="/react-weather-app/Images/wind.png" alt="" />
                <div className={styles.wind}>
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
