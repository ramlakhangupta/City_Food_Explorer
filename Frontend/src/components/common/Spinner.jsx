import React from "react";
import "./Spinner.css";

const Spinner = ({ color = '#f9d3b2', size = 15, speed = 1.3 }) => {
  const loaderStyle = {
    color: color,
    fontSize: `${size}px`,
    animationDuration: `${speed}s`
  };

  return (
    <div className="loader" style={loaderStyle}></div>
  );
};

export default Spinner;
