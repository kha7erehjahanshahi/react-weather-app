import { useAtom } from 'jotai';
import { favoritesAtom } from '../utils/atoms';
import './Weather.css';

export function Weather({ data }) {
  const [favorites, setFavorites] = useAtom(favoritesAtom);

  return (
    <div className={`weather_info`}>
      <img className={`icon`} src={`/Images/${data.image}.png`} alt="" />
      <h1>{Math.round(data.celcius)}°C</h1>
      <h2>{data.name}</h2>
      <button
        type="button"
        onClick={() => setFavorites((prev) => [...prev, data.name])}
        className={`favorite_button`}
        disabled={favorites.includes(data.name)}
      >
        Add to Favorites
      </button>
      <div className={`details`}>
        <div className={`col`}>
          <img src="/Images/humidity.png" alt="" />
          <div className={`humidity`}>
            <p>{Math.round(data.humidity)}%</p>
            <p>Humidity</p>
          </div>
        </div>
        <div className={`col`}>
          <img src="/Images/wind.png" alt="" />
          <div className={`wind`}>
            <p>{Math.round(data.speed)} km/h</p>
            <p>Wind</p>
          </div>
        </div>
      </div>
    </div>
  );
}
