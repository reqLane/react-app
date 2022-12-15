import React from "react";
import WeatherBlock from "./WeatherBlock";


function DaysContainer({daysWeather}) {

    return (
            daysWeather.map((weather, i) =>
                <WeatherBlock key={i} weather={weather}/>)
    );
}

export default DaysContainer;
