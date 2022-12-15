import React, {useState, useEffect} from "react";
import {Navigate} from "react-router";
import axios from "axios";
import WeatherBlock from "./WeatherBlock";
import Loader from "./Loader";
import DashboardHeader from "./DashboardHeader";
import dayjs from "dayjs";
import {useGeolocated} from "react-geolocated";
import DaysContainer from "./DaysContainer";


function Dashboard({authorized}) {
    if(!authorized) return (<Navigate to="/login" />);

    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(true);
    const {coords, isGeolocationAvailable, isGeolocationEnabled} =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });
    const url1 = "https://api.open-meteo.com/v1/forecast?latitude=";
    const url2 = "50.45&longitude=30.52";
    const url3 = "&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=Europe%2FBerlin";
    let url;
    if(isGeolocationAvailable && isGeolocationEnabled && coords) {
        url = url1 + coords.latitude + "&longtitude=" + coords.longitude + url3;
    }
    else {
        url = url1 + url2 + url3;
    }

    useEffect(() => {
        axios
            .get(url)
            .then(response => {
            setWeatherData(response.data);
            setLoading(false);
        })
    },[]);

    let daysWeather = [];
    let currentWeather;
    if(!loading) {
        currentWeather = {
            temp: weatherData.current_weather.temperature,
            time: weatherData.current_weather.time.split("T")[1]
        };
        for (let i = 0; i < 5; i++) {
            let day;
            if(i === 0) day = "Today";
            else if(i === 1) day = "Tomorrow";
            else {
                let words = dayjs(weatherData.daily.time[i]).toString().split(" ");
                day = words[0] + " " + words[1] + " " + words[2];
            }
            let weather = {
                dayWord: day,
                weatherCode: weatherData.daily.weathercode[i],
                max_temp: weatherData.daily.temperature_2m_max[i],
                min_temp: weatherData.daily.temperature_2m_min[i],
                sunrise: weatherData.daily.sunrise[i].split("T")[1],
                sunset: weatherData.daily.sunset[i].split("T")[1]
            };
            daysWeather.push(weather);
        }
    }

    return (
        <div className="dashboard">
            {(loading === true) ? (
                <Loader />
            ) : (
                <>
                    <DashboardHeader currentWeather={currentWeather} coords={coords}/>
                    <hr/>
                    <div className="daysContainer">
                        <DaysContainer daysWeather={daysWeather} />
                    </div>
                    <hr/>
                </>
            )}
        </div>
    );
}

export default Dashboard;
