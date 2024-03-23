// ProgressBar.jsx
import PropTypes from 'prop-types';

const ProgressBar = ({ progress }) => {

  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.string.isRequired
};

export default ProgressBar;
