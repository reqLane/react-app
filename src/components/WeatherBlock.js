import React from "react";

function WeatherBlock({weather}) {


    return (
        <div className="weather_block">
            <div className="block_section blue_text">
                <p>{weather.dayWord}</p>
            </div>
            <div className="block_section">
                <p>Weather code: {weather.weatherCode}</p>
            </div>
            <div className="block_section">
                <p>Max temperature: {weather.max_temp}°C</p>
            </div>
            <div className="block_section">
                <p>Min temperature: {weather.min_temp}°C</p>
            </div>
            <div className="block_section">
                <p>Sunrise: {weather.sunrise}</p>
            </div>
            <div className="block_section">
                <p>Sunset: {weather.sunset}</p>
            </div>
        </div>
    );
}

export default WeatherBlock;
