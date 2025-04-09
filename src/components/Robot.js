// src/components/Robot.js

import React from 'react';
import roboGif from '../assets/robo.gif';

const Robot = () => {
  return (
    <img
      src={roboGif}
      alt="Mindful Robot"
      style={{
        width: '80px',
        height: '80px',
        borderRadius: '60%', // 👈 makes it a perfect circle
        objectFit: 'cover',  // 👈 ensures the image fills the circle nicely
        border: '2px solid #fff', // optional: white border
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)', // optional: slight shadow
      }}
    />
  );
};

export default Robot;
