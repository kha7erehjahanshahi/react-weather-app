import axios from "axios";

async function getWeather(cityName: string) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=c5a89a3f2cd388b1a69f4ae082e36e52&units=metric`;
    return axios.get(apiUrl).then((res) => res.data);
  }
  export default getWeather
