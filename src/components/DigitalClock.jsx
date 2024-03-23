// DigitalClock.jsx

import { useState, useEffect } from 'react';
import BCDCodeNumber from './BCDCodeDigit';
import './DigitalClock.css';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDigit = (digit) => {
    if (digit < 10) {
      return '0' + digit;
    }
    return digit.toString();
  };

  const hours = formatDigit(time.getHours());
  const minutes = formatDigit(time.getMinutes());
  const seconds = formatDigit(time.getSeconds());

  return (
    <>
     <div className="digital-clock">
        <BCDCodeNumber number={hours} /> 
        <div className="colon">:</div>
        <BCDCodeNumber number={minutes} />
        <div className="colon">:</div>
        <BCDCodeNumber number={seconds} />
    </div>
    </>
  );
};

export default DigitalClock;
