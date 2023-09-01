import React, { useState } from "react";
import Header from "./Header";
import styles from "./Home.module.css";
import getWeather from "./api";
import { atomWithToggleAndStorage } from "../utils";
import { useAtom, atom } from "jotai";

const favoritesAtom = atomWithToggleAndStorage("favorites", []);
const historyAtom = atomWithToggleAndStorage("history", []);
const nameAtom = atom("")
const dataAtom = atom({
  celcius: 10,
  name: "Germany",
  humidity: 10,
  speed: 2,
  image: "clouds",
});

function Home() {
  const [data, setData] = useAtom(dataAtom)
  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const [history, setHistory] = useAtom(historyAtom);
  const [name, setName] = useAtom(nameAtom);

  const addFavorite = () => {
    if (favorites.includes(data.name)) {
      return;
    }
    setFavorites((prev) => [...prev, data.name]);
  }

  const removeFavorite = (favorite) => {
    setFavorites((prev) => prev.filter((item) => item !== favorite));
  }

  const getData = (cityName) => {
    getWeather(cityName)
      .then((weatherData) => {
        setData({
          ...data,
          celcius: weatherData.main.temp,
          name: weatherData.name,
          humidity: weatherData.main.humidity,
          speed: weatherData.wind.speed,
          image: weatherData.weather[0].main.toLowerCase(),
        });
        if (!history.includes(weatherData.name)) {
          setHistory((prev) => [...prev, weatherData.name]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleClick = () => {
    if (name === "") {
      return;
    }

    getData(name);
  };

  const loadCity = (city) => {
    setName('')
    getData(city)
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.app}>
          <div className={styles.weather}>
            <Header />
            <div className={styles.search}>
              <input
                type="text"
                placeholder="Enter City Name"
                value={name}
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
              <button type="button" onClick={addFavorite} className={styles.favorite_button} disabled={favorites.includes(data.name)}>Add to Favorites</button>
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
          <div className={styles.sidebar}>
            <div className={styles.sidebar_box}>
              <h4>Favorites:</h4>
              {favorites.length > 0 ? (
                <ul>
                  {favorites.map((favorite, i) => (
                    <li key={`favorite-${i}`}>
                      <button onClick={() => loadCity(favorite)}>{favorite}</button>
                      <button type="button" onClick={() => removeFavorite(favorite)}>remove</button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No favorites yet</p>
              )}
            </div>
            <div className={styles.sidebar_box}>
              <h4>History:</h4>
              {history.length > 0 ? (
                <ul>
                  {history.map((item, i) => (
                    <li key={`history-${i}`}>
                      <button onClick={() => loadCity(item)}>{item}</button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No history yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
