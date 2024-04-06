// App.jsx

// import { useState, useEffect } from 'react';
import '../styles/pages/App.css';
import '../styles/base/reset.css';
import '../styles/base/typography.css';
import DigitalClock from '../components/DigitalClock';
import DateDisplay from '../components/DateDisplay';
import ScheduleTable from '../components/ScheduleTable';
import scheduleData from '../data/scheduleData';


const App = () => {
  return (
    <div className="App">
      <DateDisplay />
      <DigitalClock />
      <ScheduleTable scheduleData={scheduleData} />
    </div>
  );
};

export default App;
