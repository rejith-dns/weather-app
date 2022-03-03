import React from "react";
import moment from "moment-timezone";

const DailyWeather: React.FC<any> = ({ dailyWeather, timezone }) => {
  return (
    <div className="weekly">
      <h3 className="weekly__title">
        Daily <span>Weather</span>
      </h3>

      {dailyWeather.length > 0 &&
        dailyWeather.map((weather: any, index: number) => {
          return (
            <div className="weekly__card" key={weather.dt}>
              <div className="weekly__inner">
                <div className="weekly__left-content">
                  <div>
                    <h3>
                      {moment.unix(weather.dt).tz(timezone).format("dddd")}
                    </h3>

                    <h4>
                      <span>{weather.temp.max.toFixed(0)}&deg;C</span>
                      <span>{weather.temp.min.toFixed(0)}&deg;C</span>
                    </h4>
                  </div>

                  <div className="weekly__sun-times">
                    <div>
                      <span>Sunrise</span>
                      <span>
                        {moment.unix(weather.sunrise).tz(timezone).format("LT")}
                      </span>
                    </div>

                    <div>
                      <span>Sunset</span>
                      <span>
                        {moment.unix(weather.sunset).tz(timezone).format("LT")}
                      </span>
                    </div>
                  </div>
                </div>
                {weather?.umberalla && (
                  <div className="weekly__right-content">
                    <div className="weekly__icon-wrapper">
                      <div>
                        <img
                          src="https://www.svgrepo.com/show/260146/umbrella.svg"
                          alt="umberalla"
                          className="umberalla"
                        />
                      </div>
                    </div>

                    <h5>Best day to sell umberalla</h5>
                  </div>
                )}
                {weather?.jacket && (
                  <div className="weekly__right-content" >
                    <div className="weekly__icon-wrapper">
                      <div>
                        <img
                          src="https://www.svgrepo.com/show/51305/jacket.svg"
                          alt="umberalla"
                          className="umberalla"
                        />
                      </div>
                    </div>

                    <h5>Best day to sell jacket</h5>
                  </div>
                )}
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
          );
        })}
    </div>
  );
};

export default DailyWeather;
