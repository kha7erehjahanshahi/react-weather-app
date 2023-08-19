import React, {  useState } from "react";
import Header from "./Header";
import "./Home.css";
import axios from "axios";

function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: "Germany",
    humidity: 10,
    speed: 2,
    image: "/Images/clouds.png",
  });

  const [name, setName] = useState ('');

  const handleClick = () => {
    if(name !== "") {
        const apiUrl =
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=c5a89a3f2cd388b1a69f4ae082e36e52&units=metric`;
    axios
      .get(apiUrl)
      .then(res => {
        let imagePath = '';
        if(res.data.weather[0].main === "Clouds") {
            imagePath = "/Images/clouds.png"
        } else if(res.data.weather[0].main === "Clear") {  
            imagePath = "/Images/clouds.png"
        } else if(res.data.weather[0].main === "Rain") {
            imagePath = "/Images/rain.png"
        } else if(res.data.weather[0].main === "Drizzle") {
            imagePath = "/Images/drizzle.png"
        } else if(res.data.weather[0].main === "Mist") {
            imagePath = "/Images/mist.png"
        } else {
            imagePath = "/Images/clouds.png"
        }
        console.log(res.data);

        setData({
          ...data,
          celcius: res.data.main.temp,
          name: res.data.name,
          humidity: res.data.main.humidity,
          speed: res.data.wind.speed,
          image: imagePath,
        });
      })
      .catch((err) => console(err));

    }
   }
   
  return (
    <>
    <div className="container">     
      <div className="weather">
      <Header />
        <div className="search">
          <input type="text" placeholder="Enter City Name" onChange={e => setName(e.target.value)}/>
          <button>
            <img src="/Images/search.png" onClick={handleClick} alt="" />
          </button>
        </div>
        <div className="weather-info">
          <img className="icon" src={data.image} alt="" />
          <h1>{Math.round(data.celcius)}°C</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src="/Images/Humidity.png" alt="" />
              <div className="humidity">
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src="/Images/wind.png" alt="" />
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
