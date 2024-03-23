// ScheduleTable.jsx

import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';

const ScheduleTable = ({ currentTime, scheduleData }) => {
  // current-test-time for development
  const currentTestTimeString = "14:00";
  const [hour, minute] = currentTestTimeString.split(':');
  const currentTestTime = new Date();
  currentTestTime.setHours(hour, minute, 0);
  // for development only

  const findSelectedRow = () => {
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    
    for (let i = 0; i < scheduleData.length; i++) {
      const item = scheduleData[i];
      const [hour, minute] = item.time.split(':');
      const itemTime = new Date();
      itemTime.setHours(hour, minute, 0);
      // itemTime.setMinutes(itemTime.getMinutes() - 5);
      if (itemTime.getHours() === currentHour && itemTime.getMinutes() >= currentMinute){
        return i;
      }else if (itemTime.getHours() > currentHour){
        return i;
      }
    }

    return -1;
  };

  function getProgress (startTime, endTime){ 
    const [startHour, startMinute] = startTime.split(':');
    const startTimeAsDate = new Date();
    startTimeAsDate.setHours(startHour, startMinute, 0);
    const [endHour, endMinute] = endTime.split(':');
    const endTimeAsDate = new Date();
    endTimeAsDate.setHours(endHour, endMinute, 0);
    const wholeTime = endTimeAsDate - startTimeAsDate;
    const elapsedTime = currentTestTime - startTimeAsDate;

    return Math.floor((elapsedTime / wholeTime) * 100).toString();
  }

  const selectedRow = findSelectedRow();
  return (
    <table>
      <thead>
        <tr>
          <th>Zeit</th>
          <th>Aktivität</th>
        </tr>
      </thead>
      <tbody>
        {scheduleData.map((item, index) => {
          const [hour, minute] = item.time.split(':');
          const itemTime = new Date();
          itemTime.setHours(hour, minute, 0);

          let rowClassName = '';
          if (selectedRow === index) {
            rowClassName = 'active';
          } else if (itemTime < currentTime) {
            rowClassName = 'past';
          }

          return (
            <React.Fragment key={index}>
              <tr className={rowClassName}>
                <td>{index}</td>
                <td>{item.time}</td>
                <td>{item.activity}</td>
                <td>{currentTestTimeString}</td>
              </tr>
              {index > 0 && (
              <tr>
                <td >Start:{scheduleData[index-1]?.time}</td>
                <td >End:{scheduleData[index]?.time}</td>
                <td >akt. Zeit:{currentTestTimeString}</td>
               <td>Progress:{getProgress(scheduleData[index-1]?.time, currentTestTimeString)}</td>
              </tr>)}
              {selectedRow === index && (
                <tr className="progress-row">
                  <td colSpan="4">
                    <ProgressBar progress={getProgress(scheduleData[index-1]?.time, currentTestTimeString)} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

ScheduleTable.propTypes = {
  currentTime: PropTypes.instanceOf(Date).isRequired,
  scheduleData: PropTypes.array.isRequired,
};

export default ScheduleTable;
