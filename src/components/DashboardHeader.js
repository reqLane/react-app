import React from "react";


function DashboardHeader({currentWeather}) {

    return (
        <div className="dashboard_header">
            <div className="city">
                <h1>Kyiv</h1>
            </div>
            <div className="time">
                <h1>Time: {currentWeather !== undefined ? currentWeather.time : "0:00"}</h1>
            </div>
            <div className="temp">
                <h1>Temperature: {currentWeather !== undefined ? currentWeather.temp : "0"}°C</h1>
            </div>
        </div>
    );
}

export default DashboardHeader;
