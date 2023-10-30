import React from 'react';
import './animation.css';

const Toggle = () => {
  return (
    <label className="switch">
      <input type="checkbox" className="input" />
      <span className="slider"></span>
    </label>
  );
};

export default Toggle;
