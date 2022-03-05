import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DailyWeatherType } from '../types/DailyWeatherType';
import DailyWeather from './DailyWeather';

function SearchBox() {
  const { city } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>('');
  const [finalQuery, setFinalQuery] = useState<string>('');
  const [results, setResults] = useState<object>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [daily, setDailyData] = useState<DailyWeatherType[]>([]);
  const [timezone, setTimezone] = useState<string>('');
  const [noData, setNoData] = useState<boolean>(false);

  const getWeatherData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/weather?q=${query}&appid=${process.env.REACT_APP_API_KEY}`,
    );
    const data = await response.json();
    if (response.status === 200) {
      const weatherData = await fetch(
        `${process.env.REACT_APP_BASE_URL}/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly&appid=${process.env.REACT_APP_API_KEY}&units=metric`,
      );
      const dailyData = await weatherData.json();
      setResults(dailyData);
      setTimezone(dailyData.timezone);

      let fiveDayData = dailyData.daily.slice(0, 5);

      // Sell jacket
      const winterDays = fiveDayData.filter((day: any) => {
        if (day.temp.min < 25) {
          return day;
        }
        return false;
      });

      if (winterDays.length > 0) {
        const lowestTemp = Math.min(...winterDays.map((o: any) => o.temp.min));

        const winterDayFilter = winterDays.filter(
          (day: any) => day.temp.min === lowestTemp,
        );
        if (winterDayFilter.length === 5) {
          fiveDayData[0].jacket = true;
          return setDailyData(fiveDayData);
        }
        fiveDayData = fiveDayData.map((day: any) => {
          if (day.temp.min === lowestTemp) {
            day.jacket = true;
            return day;
          }
          return day;
        });
      }

      // Sell Umberall
      const rainyDays = fiveDayData.filter((day: any) => {
        if (day.weather[0].main === 'Rain') {
          return day;
        }
        return false;
      });

      const rainFilter = rainyDays[0].weather[0].description;
      const rainFilter2 = rainyDays.filter(
        (day: any) => day.weather[0].description === rainFilter,
      );
      if (rainyDays.length > 0) {
        if (rainyDays.length === 5 && rainFilter2.length === 5) {
          fiveDayData[0].umberalla = true;
          return setDailyData(fiveDayData);
        }
        const highestRain = Math.min(...rainyDays.map((o: any) => o.rain));
        fiveDayData = fiveDayData.map((day: any) => {
          if (day.rain === highestRain) {
            day.umberalla = true;
            return day;
          }
          return day;
        });
        return setDailyData(fiveDayData);
      }
      return setDailyData(fiveDayData);
    }
    return setNoData(true);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
    setResults({});
    setTimezone('');
    setDailyData([]);
    setNoData(false);
  };

  useEffect(() => {
    setLoading(true);
  }, [daily.length > 0]);

  useEffect(() => {
    if (city) {
      setFinalQuery(city.split('=')[1]);
      setQuery(city.split('=')[1]);
    }
  }, [city]);
  useEffect(() => {
    getWeatherData();
  }, [finalQuery]);

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    navigate(`/city=${query}`);
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <div className="search">
          <input
            type="text"
            value={query}
            onChange={onChange}
            placeholder="Enter city name"
          />
          <button type="submit" className="cursor-cls">
            Submit
          </button>
        </div>
      </form>
      {loading && results && daily.length > 0 && timezone && (
        <DailyWeather dailyWeather={daily} timezone={timezone} />
      )}
      {noData && <h1 className="no-results">No Data Found</h1>}
    </>
  );
}

export default SearchBox;
