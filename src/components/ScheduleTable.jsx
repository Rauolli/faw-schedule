// ScheduleTable.jsx

import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';

const ScheduleTable = ({ currentTime, scheduleData }) => {
  const findSelectedRow = () => {
    const currentHour = currentTime.getHours();

    for (let i = 0; i < scheduleData.length; i++) {
      const item = scheduleData[i];
      const [hour, minute] = item.time.split(':');
      const itemTime = new Date();
      itemTime.setHours(hour, minute, 0);

      if (itemTime.getHours() === currentHour) {
        return i;
      }
    }

    return -1;
  };

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
                <td>{item.time}</td>
                <td>{item.activity}</td>
              </tr>
              {selectedRow === index && (
                <tr className="progress-row">
                  <td colSpan="2">
                    <ProgressBar currentTime={currentTime} startTime={itemTime} endTime={scheduleData[index + 1]?.time} />
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
