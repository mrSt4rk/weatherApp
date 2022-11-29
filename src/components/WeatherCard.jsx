import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherForecast from './WeatherForecast';
import moment from 'jalali-moment';
import '../App.scss';
import WeatherIcon from './WeatherIcon';


const WeatherCard = () => {
    const [forecastData, setForecastData] = useState();
    const [weatherData, setWeatherData] = useState(undefined);

    const getWeather = async (cityName) => {
        await axios.get(`${process.env.REACT_APP_API_URL}/weather/?q=${cityName}&units=metric&lang=fa&APPID=${process.env.REACT_APP_API_KEY}`)
            .then(res => {
                const mappedData = mapDataToWeatherInterface(res.data);
                setWeatherData(mappedData)
            })
    }



    const mapDataToWeatherInterface = (data) => {
        const mapped = {
            dayDate: data?.dt,
            date: moment(data.dt_txt).locale('fa').format('YYYY/MM/DD'),
            day: moment(data.dt_txt).locale('fa').format('dddd'),
            description: data?.weather[0].main,
            temperature: Math.round(data?.main.temp),
            name: data.name,
            humidity: data?.main.humidity,
            windSpeed: Math.round((data?.wind.speed / 1000) * 3600),
            highTemp: Math.round(data?.main.temp_max),
            lowTemp: Math.round(data?.main.temp_min),
        };


        return mapped;
    }

    const getForecast = (cityName) => {
        return axios.get(`${process.env.REACT_APP_API_URL}/forecast/?q=${cityName}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
            .then(forecastData => {
                return forecastData?.data?.list
                    .filter(forecast => forecast.dt_txt.match(/09:00:00/))
                    .map(mapDataToWeatherInterface);
            })
    }



    useEffect(() => {
        getWeather('Tehran');
        const interval = setInterval(() => { setWeatherData({}); getWeather('Tehran'); }, 30000)
        return () => {
            clearInterval(interval);
        }


    }, []);

    useEffect(() => {
        weatherData && getForecast('Tehran')
            .then(forecast => {
                setForecastData(forecast.slice(0, -1));
            })
    }, [weatherData])

    return (


        <div className={weatherData ? "container" : "container overlay"} id="wrapper">
            <div className="container-fluid" id="current-weather">
                <div className="row d-flex flex-row justify-conten-center align-items-center">

                    <div className="col-md-3 col-sm-5">
                        <h5><span id="cityName">{weatherData?.name}</span></h5>
                        <h6><span id="cityName">{weatherData?.day}</span></h6>
                        <h6 id="localDate"><span>{weatherData?.date}</span></h6>
                        <h5 id="localTime"><span></span></h5>
                    </div>

                    <div className="col-md-5 col-sm-7 d-flex flex-row justify-content-center align-items-center" style={{ margin: '10px auto', padding: '0' }}>
                        <WeatherIcon data={weatherData && weatherData} size={'large'} />
                        <span id="mainTemperature">{weatherData?.temperature}</span>
                        <p id="tempDescription"></p>
                        <p style={{ fontSize: '1.5rem' }}>°C</p>
                    </div>

                    <div className="col-xs-12 col-sm-12 col-md-3 row" style={{ textAlign: 'right' }}>
                        <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                            <h6>Humidity: <span id="humidity">{weatherData?.humidity}</span>%</h6>
                        </div>
                        <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                            <h6>Wind: <span id="wind">{weatherData?.windSpeed}</span> km/hr</h6>
                        </div>
                        <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                            <h6>High: <span id="mainTempHot">{weatherData?.highTemp}</span>°</h6>
                        </div>
                        <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                            <h6>Low: <span id="mainTempLow">{weatherData?.lowTemp}</span>°</h6>
                        </div>
                    </div>




                </div>
            </div>
            <WeatherForecast forecast={forecastData} />
        </div>




    );
}

export default WeatherCard;
