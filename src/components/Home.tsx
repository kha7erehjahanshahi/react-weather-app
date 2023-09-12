
import React from 'react';
import getWeather from '../utils/api';
import Header from './Header';
import styles from './Home.module.css';
import { useAtom } from 'jotai';
import { dataAtom, historyAtom, nameAtom, showSidebarAtom } from '../utils/atoms';
import { Search } from './Search';
import { Sidebar } from './Sidebar';
import { Weather } from './Weather';



interface WeatherData {
  celcius: number;
  name: string;
  humidity: number;
  speed: number;
  image: string;
}

function Home() {
  const [data, setData] = useAtom(dataAtom);
  const [, setHistory] = useAtom(historyAtom);
  const [name, setName] = useAtom(nameAtom);
  const [showSidebar] = useAtom(showSidebarAtom);
  

  
  

  const getData = (
    cityName: string,
    setData: React.Dispatch<React.SetStateAction<WeatherData>>,
    setHistory: React.Dispatch<React.SetStateAction<string[]>>,
    setName: React.Dispatch<React.SetStateAction<string>>
    ) => {
      
    getWeather(cityName)
      .then((weatherData: WeatherData) => {
        setData({
          ...data,
          celcius:  weatherData.celcius,
          name: weatherData.name,
          humidity: weatherData.humidity,
          speed: weatherData.speed,
          image: weatherData.image,
        });
        if (!history.includes(weatherData.name)) {
          setHistory((prev: any) => [...prev, weatherData.name]);
        }
        setName('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = () => {
    if (name === '') {
      return;
    }

    getData(name, setData, setHistory, setName);
  };

  const loadCity = (city: string) => {
    setName('');
    getData(city, setData, setHistory, setName);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.app}>
          <div className={styles.weather}>
            <Header />
            <Search name={name} setName={setName} onSubmit={handleClick} />
            <Weather data={data} />
          </div>
          {showSidebar && <Sidebar onClick={loadCity} />}
        </div>
      </div>
    </>
  );
}

export default Home;
