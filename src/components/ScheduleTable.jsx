// ScheduleTable.jsx
import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import '../styles/components/ScheduleTable.css';

const ScheduleTable = ({ scheduleData }) => {
  
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
    // current-test-time for development
    const currentTestTime = new Date();
    const minute = currentTestTime.getMinutes();
    const hour = currentTestTime.getHours();
    if(hour >= 1 && hour <=8){
      currentTestTime.setHours(hour + 7, minute, 0)
    }
    else if(hour >= 15 && hour <= 22){
      currentTestTime.setHours(hour - 7, minute, 0);
    }
    
    return currentTestTime;
  }

  function TimeToString(date){
    let hour = date.getHours();
    let minute = date.getMinutes();
    hour = (hour < 10) ? '0' + hour : hour.toString();
    minute = (minute < 10) ? '0' + minute : minute.toString();

    return hour + ':' + minute;
  }

  function getMinutesToGo(currentTime, endTime){
    const wholeTime = new Date();
    const [endHour, endMinute] = endTime.split(':');
    wholeTime.setHours(endHour, endMinute, 0);
    const timeToGo = wholeTime - currentTime;
    return Math.floor(timeToGo / 60000);
  }

  function getMinutesLeft(startTime, currentTime){
    const wholeTime = new Date();
    const [startHour, startMinute] = startTime.split(':');
    wholeTime.setHours(startHour, startMinute, 0);
    const timeLeft = currentTime - wholeTime;
    return Math.floor(timeLeft / 60000);
  }


  const selectedRow = findSelectedRow();
  return (
    <table>
      <thead>
        <tr><th colSpan="4">Tagesplan</th></tr>
        <tr>
          <th>Nr.</th>
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
                  <td>{TimeToString(chooseTestTimeOrCurrentTime())} Uhr | noch {getMinutesToGo(chooseTestTimeOrCurrentTime(), item.end)} Min. ({100 - getProgress(item.start, item.end)}%) | {getMinutesLeft(item.start, chooseTestTimeOrCurrentTime() )} Min. ({getProgress(item.start, item.end)}%) bereits geschafft</td>
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
