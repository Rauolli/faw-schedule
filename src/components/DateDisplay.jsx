// DateDisplay component
import { useState, useEffect } from 'react';
import BCDCodeNumber from './BCDCodeDigit';
import '../styles/components/DateDisplay.css';

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
     <div className="date-display">
        <BCDCodeNumber number={day} /> 
        <span className="colon">.</span>
        <BCDCodeNumber number={month} />
        <span className="colon">.</span>
        <BCDCodeNumber number={year_20} />
        <BCDCodeNumber number={year} />
    </div>
    </>
  );
};

export default DateDisplay;