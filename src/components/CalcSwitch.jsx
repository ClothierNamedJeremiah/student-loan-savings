import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded';

const StyledArrowUp = withStyles({
  root: {
    transition: 'transform 0.2s',
    fontSize: 60,
    position: 'absolute',
  },
})(ArrowDropUpRoundedIcon);

/* TODO: convert IDS to classes for reusability */
const CalcSwitch = (props) => {
  const { isCalcFormExpanded, setCalcExpanded } = props;

  return (
    <button
      id="calc-switch"
      className="button-base text-align--left padding--8x16 padding-right--4"
      type="button"
      onClick={() => setCalcExpanded(!isCalcFormExpanded)}
    >
      <p id="calc-switch-text">Student Loan</p>
      <StyledArrowUp className={`${isCalcFormExpanded ? '' : 'transform--rotate180'}`} />
    </button>
  );
};

CalcSwitch.propTypes = {
  isCalcFormExpanded: PropTypes.bool.isRequired,
  setCalcExpanded: PropTypes.func.isRequired,
};

export default CalcSwitch;
