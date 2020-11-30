import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CalcSwitch from './CalcSwitch';
import CalcFormContainer from './CalcForm/CalcFormContainer';

const Calculator = (props) => {
  const {
    setLoanDetails,
    setLoanSavings,
  } = props;

  const [isCalcFormExpanded, setCalcExpanded] = useState(true);

  return (
    <div id="calc" className="max-width--240">
      <CalcSwitch
        isCalcFormExpanded={isCalcFormExpanded}
        setCalcExpanded={setCalcExpanded}
      />
      <CalcFormContainer
        isCalcFormExpanded={isCalcFormExpanded}
        setCalcExpanded={setCalcExpanded}
        setLoanDetails={setLoanDetails}
        setLoanSavings={setLoanSavings}
      />
    </div>
  );
};

Calculator.propTypes = {
  setLoanDetails: PropTypes.func.isRequired,
  setLoanSavings: PropTypes.func.isRequired,
};

export default Calculator;
