import React from "react";
import './App.css';
import axios from 'axios'
import Weather from "./components/weather";
import Form from "./components/form";
import 'weather-icons/css/weather-icons.css'

import { Component } from 'react';

const API_key = "323d079b0cb75f916d34c0127aa14f0a"

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      city: undefined,
      icon: undefined,
      main: undefined,
      fahrenheit: undefined,
      max: undefined,
      min: undefined,
      description: "",
      error: false
    };
  
    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }


  calfahrenheit(temp){
    let farh = Math.floor((temp - 273.15) * 1.8 + 32);
    return farh;
  }

  get_WeatherIcon(icons, rangeId){
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }

getWeather = async e => {
  e.preventDefault();
  const city = e.target.elements.city.value;
if (city){
  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`)
      .then(res => {
        console.log(res.data)
        console.log(res.data.sys)
        this.setState({
          city: res.data.name,
          country: res.data.sys.country,
          fahrenheit: this.calfahrenheit(res.data.main.temp),
          max: this.calfahrenheit(res.data.main.temp_max),
          min: this.calfahrenheit(res.data.main.temp_min),
          description: res.data.weather[0].description,
          error: false
        });

        this.get_WeatherIcon(this.weatherIcon, res.data.weather.id)
        console.log( res.data.weather[0].id)
    })
    .catch(err => console.log("we got problem", err))
  } 
  else {
    this.setState({error: true})
  }
}

  render(){
    return ( 
      <div className="App m-5">
        <h2>Please input a city to get the weather</h2>
      <Form loadweather={this.getWeather} error={this.state.error}/>
      <Weather 
      city = {this.state.city} 
      temp_fahrenheit = {this.state.fahrenheit}
      max = {this.state.max}
      min = {this.state.min}
      description = {this.state.description}
      weatherIcon = {this.state.icon} 
      />
      </div>
    );
  }
}

export default App;
