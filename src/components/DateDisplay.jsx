// DateDisplay component
import { useState, useEffect } from 'react';
import BCDCodeNumber from './BCDCodeDigit';
import './DigitalClock.css';

const DateDisplay = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDigit = (digit) => {
    if (digit < 10) {
      return '0' + digit;
    }
    return digit.toString();
  };

  const day = formatDigit(date.getDate());
  const month = formatDigit(date.getMonth() + 1);
  const year_20 = "20";
  const year = formatDigit(date.getFullYear() - 2000);

  return (
    <>
     <div className="digital-clock">
        <BCDCodeNumber number={day} /> 
        <div className="colon">.</div>
        <BCDCodeNumber number={month} />
        <div className="colon">.</div>
        <BCDCodeNumber number={year_20} />
        <BCDCodeNumber number={year} />
    </div>
    </>
  );
};

export default DateDisplay;