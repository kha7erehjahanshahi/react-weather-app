import { useAtom } from 'jotai';
import { favoritesAtom } from '../utils/atoms';
import styles from './Weather.module.css';

export function Weather({ data }) {
  const [favorites, setFavorites] = useAtom(favoritesAtom);

  return (
    <div className={styles.weather_info}>
      <img className={styles.icon} src={`/react-weather-app/Images/${data.image}.png`} alt="" />
      <h1>{Math.round(data.celcius)}°C</h1>
      <h2>{data.name}</h2>
      <button
        type="button"
        onClick={() => setFavorites((prev) => [...prev, data.name])}
        className={styles.favorite_button}
        disabled={favorites.includes(data.name)}
      >
        Add to Favorites
      </button>
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
  );
}
