import React, {useState, useEffect} from "react";
import {Navigate} from "react-router";
import axios from "axios";
import WeatherBlock from "./WeatherBlock";
import Loader from "./Loader";
import dayjs from "dayjs";


function Dashboard({authorized}) {
    if(!authorized) return (<Navigate to="/login" />);

    const url = "https://api.open-meteo.com/v1/forecast?latitude=50.45&longitude=30.52&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=Europe%2FBerlin";
    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(url)
            .then(response => {
            setWeatherData(response.data);
            setLoading(false);
        })
    },[]);

    let daysWeather = [];
    if(!loading) {
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

    console.log(weatherData);

    return (
        <div className="weather">
            {(loading === true) ? (
                <Loader />
            ) : (
                daysWeather.map((weather, i) =>
                    <WeatherBlock key={i} weather={weather}/>
                )
            )}
        </div>
    );
}

export default Dashboard;
