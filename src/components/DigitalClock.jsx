// DigitalClock.jsx

import { useEffect, useState } from 'react';

const DigitalClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (time) => {
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="digital-clock">
      <span className="hours">{formatTime(currentTime).slice(0, 2)}</span>
      <span className="separator">:</span>
      <span className="minutes">{formatTime(currentTime).slice(3, 5)}</span>
      <span className="separator">:</span>
      <span className="seconds">{formatTime(currentTime).slice(6, 8)}</span>
    </div>
  );
};

export default DigitalClock;
