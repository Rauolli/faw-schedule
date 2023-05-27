// ProgressBar.jsx
import PropTypes from 'prop-types';

const ProgressBar = ({ currentTime, startTime, endTime }) => {
  const startHour = startTime.getHours();
  const startMinute = startTime.getMinutes();
  const endHour = endTime ? parseInt(endTime.split(':')[0]) : 24;
  const endMinute = endTime ? parseInt(endTime.split(':')[1]) : 0;
  const totalMinutes = (endHour - startHour) * 60 + (endMinute - startMinute);
  const elapsedMinutes = ((currentTime.getHours() - startHour) * 60 + (currentTime.getMinutes() - startMinute)/2);
  const progress = (elapsedMinutes / totalMinutes) * 100;

  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

ProgressBar.propTypes = {
  currentTime: PropTypes.instanceOf(Date).isRequired,
  startTime: PropTypes.instanceOf(Date).isRequired,
  endTime: PropTypes.string,
};

export default ProgressBar;
