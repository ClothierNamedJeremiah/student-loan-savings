import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded';

const StyledArrowUp = withStyles({
  root: {
    transition: 'transform 0.2s',
  },
})(ArrowDropUpRoundedIcon);

const CalcSwitch = (props) => {
  const { isCalcFormExpanded, setCalcExpanded } = props;

  return (
    <button type="button" id="calc-switch" onClick={() => setCalcExpanded(!isCalcFormExpanded)}>
      <p id="calc-switch-text">Loan Information</p>
      <StyledArrowUp
        className={`${isCalcFormExpanded ? '' : 'tt-180'}`}
        style={{ fontSize: '60' }}
      />
    </button>
  );
};

CalcSwitch.propTypes = {
  isCalcFormExpanded: PropTypes.bool.isRequired,
  setCalcExpanded: PropTypes.func.isRequired,
};

export default CalcSwitch;
