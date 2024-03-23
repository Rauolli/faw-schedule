// App.jsx

// import { useState, useEffect } from 'react';
import './App.css';
import DigitalClock from './components/DigitalClock';
import DateDisplay from './components/DateDisplay';
// import moment from 'moment';
import ScheduleTable from './components/ScheduleTable';
import scheduleData from './data/scheduleData';


const App = () => {
  const currentTime = new Date();
  return (
    <div className="App">
      <DateDisplay />
      <DigitalClock />
      <h1>Tagesplan</h1>
      <ScheduleTable currentTime={currentTime} scheduleData={scheduleData} />
    </div>
  );
};

export default App;
