import React, {useState, useEffect} from "react";
import {Navigate} from "react-router";
import axios from "axios";
import WeatherBlock from "./WeatherBlock";
import Loader from "./Loader";

function DashBoard({authorized}) {
    if(!authorized) return (<Navigate to="/login" />);

    const url = "https://api.open-meteo.com/v1/forecast?latitude=50.45&longitude=30.52&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=Europe%2FBerlin";
    const [weatherList, setWeatherList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(url)
            .then(response => {
            setWeatherList(response.data);
        })
        setLoading(false);
    },[]);

    console.log(weatherList);

    return (
        <div className="weather">
            {(loading === true) ? (
                <Loader />
            ) : (
                [0,1,2,3].map(weather =>
                    <WeatherBlock key={weather}/>
                )
            )}
        </div>
    );
}

export default DashBoard;
