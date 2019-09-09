import React from 'react';
import './InfoBox.css';


const InfoBox = ({ text, isError }) => {

  if(text === null) {
    return null;
  }
  
  const successClass = () => {
    if (isError) return 'info-box error-box'
    return 'info-box success-box'
  }

  return(
    <div className={successClass()}>
      {text}
    </div>
  );
};

export default InfoBox;