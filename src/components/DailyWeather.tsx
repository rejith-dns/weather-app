import React from 'react';
import moment from 'moment-timezone';
import { DailyWeatherProps } from '../types/DailyWeatherProps';

const DailyWeather: React.FC<DailyWeatherProps> = ({
  dailyWeather,
  timezone,
}) => (
  <div className="weekly">
    <h3 className="weekly__title">
      Daily
      <span>Weather</span>
    </h3>

    {dailyWeather.length > 0
      && dailyWeather.map((weather: any) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div className="weekly__card" key={weather.dt}>
            <div className="weekly__inner">
              <div className="weekly__left-content">
                <div>
                  <h3>{moment.unix(weather.dt).tz(timezone).format('dddd')}</h3>

                  <h4>
                    <span>
                      {weather.temp.max.toFixed(0)}
                      &deg;C
                    </span>
                    <span>
                      {weather.temp.min.toFixed(0)}
                      &deg;C
                    </span>
                  </h4>
                </div>

                <div className="weekly__sun-times">
                  <div>
                    <span>Sunrise</span>
                    <span>
                      {moment.unix(weather.sunrise).tz(timezone).format('LT')}
                    </span>
                  </div>

                  <div>
                    <span>Sunset</span>
                    <span>
                      {moment.unix(weather.sunset).tz(timezone).format('LT')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="weekly__right-content">
                <div className="weekly__icon-wrapper">
                  <div>
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt="Weather Icon"
                    />
                  </div>
                </div>

                <h5>{weather.weather[0].description}</h5>
              </div>
            </div>
          </div>
          {weather?.umberalla && (
            <div className="hourly">
              <div className="hourly__inner">
                <div className="hourly__box-wrapper">
                  <div className="hourly__box">
                    <img
                      src="https://www.svgrepo.com/show/260146/umbrella.svg"
                      className="umberalla"
                      alt="umberalla"
                    />
                    <span>Best to sell Umberalla</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {weather?.jacket && (
            <div className="hourly">
              <div className="hourly__inner">
                <div className="hourly__box-wrapper">
                  <div className="hourly__box">
                    <img
                      src="https://www.svgrepo.com/show/51305/jacket.svg"
                      className="umberalla"
                      alt="jackets"
                    />
                    <span>Best to sell Jacket</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
  </div>
);

export default DailyWeather;
