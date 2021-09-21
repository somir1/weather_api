import React from "react";

const Form = props => {
  return (
    <div className="container h-150">
      <form onSubmit={props.loadweather} className = "form-group">
        <div>{props.error ? error() : ""}</div>
        <div className=" container input">
          <div className="container input">
            <input
              type="text"
              className="in form-control"
              placeholder="City"
              name="city"
            />
          </div>
            <button className="btn btn-warning">Get Weather</button>
        </div>
      </form>
    </div>
  );
};

const error = props => {
  return (
    <div className="container alert alert-danger" role="alert">
      Please Enter City and Country...!
    </div>
  );
};

export default Form;