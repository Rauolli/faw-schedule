// ScheduleTable.jsx
import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';

const ScheduleTable = ({ scheduleData }) => {
  // current-test-time for development
  const testHour = 4;
  const currentTestTime = new Date();
  const minute = currentTestTime.getMinutes();
  // Beginnend um 8:00 Uhr + der zu bestimmenden testHour
  currentTestTime.setHours(8 + testHour, minute, 0);
  // for development only

  const [currentTime, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const findSelectedRow = () => {
    for (let i = 0; i < scheduleData.length; i++) {
      const itemStart = new Date();
      const itemEnd = new Date();
      const item = scheduleData[i];
      const [startHour, startMinute] = item.start.split(':');
      itemStart.setHours(startHour, startMinute, 0);
      const [endHour, endMinute] = item.end.split(':');
      itemEnd.setHours(endHour, endMinute, 0);

      if (chooseTestTimeOrCurrentTime() >= itemStart && chooseTestTimeOrCurrentTime() <= itemEnd) {
        return i;
      }
    }
  };

  function getProgress (startTime, endTime){ 
    const startTimeAsDate = new Date();
    const endTimeAsDate = new Date();
    const [startHour, startMinute] = startTime.split(':');
    startTimeAsDate.setHours(startHour, startMinute, 0);
    const [endHour, endMinute] = endTime.split(':');
    endTimeAsDate.setHours(endHour, endMinute, 0);
    const wholeTime = endTimeAsDate - startTimeAsDate;
    const elapsedTime = chooseTestTimeOrCurrentTime() - startTimeAsDate;

    return Math.floor((elapsedTime / wholeTime) * 100).toString();
  }

  function chooseTestTimeOrCurrentTime(){
    return currentTime <= currentTestTime ? currentTime : currentTestTime;
  }

  function TimeToString(date){
    const hour = date.getHours();
    const minute = date.getMinutes();
    hour < 10 ? '0' + hour : hour;
    minute < 10 ? '0' + minute : minute;
    return hour + ':' + minute;
  }

  const selectedRow = findSelectedRow();
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>von</th>
          <th>bis</th>
          <th>Aktivität</th>
        </tr>
      </thead>
      <tbody>
        {scheduleData.map((item, index) => {
          const [hour, minute] = item.start.split(':');
          const itemTime = new Date();
          itemTime.setHours(hour, minute, 0);

          let rowClassName = '';
          if (selectedRow === index) {
            rowClassName = 'active';
          } else if (index < selectedRow) {
            rowClassName = 'past';
          }else{
            rowClassName = 'future';
          }

          return (
            <React.Fragment key={index}>
              <tr className={rowClassName}>
                <td>{index + 1}.</td>
                <td>{item.start}</td>
                <td>{item.end}</td>
                <td>{item.activity}</td>
              </tr>
              {selectedRow === index && (
                <tr className="progress-row">
                  <td>{TimeToString(chooseTestTimeOrCurrentTime())} Uhr {getProgress(item.start, item.end)}%</td>
                  <td colSpan="3">
                    <ProgressBar progress={getProgress(item.start, item.end)} />
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
