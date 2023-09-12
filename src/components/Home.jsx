import getWeather from '../utils/api';
import Header from './Header';
import styles from './Home.module.css';
import { useAtom } from 'jotai';
import { dataAtom, historyAtom, nameAtom, showSidebarAtom } from '../utils/atoms';
import { Search } from './Search';
import { Sidebar } from './Sidebar';
import { Weather } from './Weather';

function Home() {
  const [data, setData] = useAtom(dataAtom);
  const [history, setHistory] = useAtom(historyAtom);
  const [name, setName] = useAtom(nameAtom);
  const [showSidebar] = useAtom(showSidebarAtom);

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

    getData(name);
  };

  const loadCity = (city) => {
    setName('');
    getData(city);
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
