
import React from "react";

const Weather = props => {

  function maxminTemp(min, max) {
    if (max && min) {
      return (
        <h3>
          <span className="px-4">{min}&deg;</span>
          <span className="px-4">{max}&deg;</span>
        </h3>
      );
    }
  }

  return (
    <div className="container">
      <div className="Card">
        <h1 className="py-3">{props.city}</h1>
        <h5 className="py-4">
          <i className={`wi ${props.weatherIcon} display-1`} />
        </h5>
          <h1 className="py-2">{props.temp_fahrenheit}&deg;</h1>
        

        {/* show max and min temp */}
        {maxminTemp(props.min, props.max)}

        {/* Weather description */}
        <h4 className="py-3">
          {props.description.charAt(0).toUpperCase() +
            props.description.slice(1)}
        </h4>
      </div>
    </div>
  );
};

export default Weather;