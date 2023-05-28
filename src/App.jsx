// App.jsx

import { useState, useEffect } from 'react';
import './App.css';
import DigitalClock from './components/DigitalClock';
import ScheduleTable from './components/ScheduleTable';
import scheduleData from './data/scheduleData';


const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="App">
      <DigitalClock currentTime={currentTime} />
      
      <h1>Tagesplan</h1>
      <ScheduleTable currentTime={currentTime} scheduleData={scheduleData} />
    </div>
  );
};

export default App;
