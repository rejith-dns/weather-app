import React, { useState, useEffect } from "react";
import DailyWeather from "./DailyWeather";

function SearchBox() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<object>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [daily, setDailyData] = useState<object[]>([]);
  const [timezone, setTimezone] = useState<string>("");
  const [noData, setNoData] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
    setResults({});
    setTimezone("");
    setDailyData([]);
    setNoData(false);
  };

  useEffect(() => {
    setLoading(true);
  }, [daily.length > 0]);

  const getWeatherData = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();
    if (response.status === 200) {
      const weatherData = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );
      const dailyData = await weatherData.json();
      setResults(dailyData);
      setTimezone(dailyData.timezone);

      let fiveDayData = dailyData.daily.slice(0, 5);

      // Sell jacket
      let winterDays = fiveDayData.filter((day: any) => {
        if (day.temp.min < 25) {
          return day;
        }
      });

      if (winterDays.length > 0) {
        let lowestTemp = Math.min.apply(
          Math,
          winterDays.map(function (o: any) {
            return o.temp.min;
          })
        );
        let winterDayFilter = winterDays.filter((day:any)=>{
          if(day.temp.min === lowestTemp){
            return day;
          }
        })
        if(winterDayFilter.length ===5){
          fiveDayData[0].jacket = true;
          return setDailyData(fiveDayData);
        }
        else{
          fiveDayData = fiveDayData.map((day: any) => {
            if (day.temp.min === lowestTemp) {
              day.jacket = true;
              return day;
            }
            return day;
          });
        }
        
      }

      // Sell Umberall
      let rainyDays = fiveDayData.filter((day: any) => {
        if (day.weather[0].main == "Rain") {
          return day;
        }
      });

      let rainFilter = rainyDays[0].weather[0].description;
      let rainFilter2 = rainyDays.map((day: any) => {
        if (day.weather[0].description == rainFilter) {
          return day;
        }
      });
      if (rainyDays.length > 0) {
        if (rainyDays.length === 5 && rainFilter2.length === 5) {
          fiveDayData[0].umberalla = true;
          return setDailyData(fiveDayData);
        } else {
          let highestRain = Math.max.apply(
            Math,
            rainyDays.map(function (o: any) {
              return o.rain;
            })
          );
          fiveDayData = fiveDayData.map((day: any) => {
            if (day.rain === highestRain) {
              day.umberalla = true;
              return day;
            }
            return day;
          });
          return setDailyData(fiveDayData);
        }
      }
      setDailyData(fiveDayData);
    } else {
      setNoData(true);
    }
  };

  return (
    <>
      <div className="search">
        <input
          type="text"
          value={query}
          onChange={onChange}
          placeholder="Enter city name"
        />
        <button type="submit" onClick={getWeatherData}>
          Submit
        </button>
      </div>
      {loading && results && daily.length > 0 && timezone && (
        <DailyWeather dailyWeather={daily} timezone={timezone} />
      )}
      {noData && <h1 className="no-results">No Data Found</h1>}
    </>
  );
}

export default SearchBox;
