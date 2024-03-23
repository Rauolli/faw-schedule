import PropTypes from 'prop-types';
import { ReactComponent as Segment0 } from '../assets/7Segment0.svg';
import { ReactComponent as Segment1 } from '../assets/7Segment1.svg';
import { ReactComponent as Segment2 } from '../assets/7Segment2.svg';
import { ReactComponent as Segment3 } from '../assets/7Segment3.svg';
import { ReactComponent as Segment4 } from '../assets/7Segment4.svg';
import { ReactComponent as Segment5 } from '../assets/7Segment5.svg';
import { ReactComponent as Segment6 } from '../assets/7Segment6.svg';
import { ReactComponent as Segment7 } from '../assets/7Segment7.svg';
import { ReactComponent as Segment8 } from '../assets/7Segment8.svg';
import { ReactComponent as Segment9 } from '../assets/7Segment9.svg';

const BCDCodeDigit = ({ digit }) => {
  const digit0 = parseInt(digit[0]);
  const digit1 = parseInt(digit[1]);
  const bcdDigits = [
    Segment0 , // 0
    Segment1, // 1
    Segment2, // 2
    Segment3, // 3
    Segment4, // 4
    Segment5, // 5
    Segment6, // 6
    Segment7, // 7
    Segment8, // 8
    Segment9 // 9
  ];
  
 const SegmentComponent1 = bcdDigits[digit0]; 
 const SegmentComponent2 = bcdDigits[digit1];
 
  return (
    <>   
      <SegmentComponent1 className="segment"/>
      <SegmentComponent2 className="segment" />
    </>
  );
};

const BCDCodeNumber = ({ number }) => {

    return (
      <>    
        <BCDCodeDigit digit={number} /> 
      </>           
    );
  };

BCDCodeDigit.propTypes = {
    digit: PropTypes.number.isRequired,
};

BCDCodeNumber.propTypes = {
    number: PropTypes.number.isRequired,
};

export default BCDCodeNumber;