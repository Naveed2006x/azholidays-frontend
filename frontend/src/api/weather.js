import { api } from './index';

const WEATHER_CURRENT_PATH = process.env.REACT_APP_BACKEND_WEATHER_CURRENT_PATH || '/weather/current';
const WEATHER_FORECAST_PATH = process.env.REACT_APP_BACKEND_WEATHER_FORECAST_PATH || '/weather/forecast';

export const weatherAPI = {
  getCurrent: (city, units = 'metric') =>
    api.get(WEATHER_CURRENT_PATH, {
      params: { city, units }
    }),

  getForecast: (city, units = 'metric') =>
    api.get(WEATHER_FORECAST_PATH, {
      params: { city, units }
    }),

  getCityWeather: async (city, units = 'metric') => {
    const [weatherData, forecastData] = await Promise.all([
      weatherAPI.getCurrent(city, units),
      weatherAPI.getForecast(city, units)
    ]);

    return { weatherData, forecastData };
  }
};

export default weatherAPI;
