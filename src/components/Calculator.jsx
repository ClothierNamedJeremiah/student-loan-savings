import React from 'react';
import PropTypes from 'prop-types';

import CalcSwitch from './CalcSwitch';
import CalcForm from './CalcForm';

const Calculator = (props) => {
  const {
    handleSubmit,
    isCalcFormExpanded,
    setCalcExpanded,
    currentBalance,
    setCurrentBalance,
    annualInterestRate,
    setAnnualInterestRate,
    monthlyPayment,
    setMonthlyPayment,
    balErrorMsg,
    monthlyErrorMsg,
    aprErrorMsg,
  } = props;

  return (
    <div id="calc">
      <CalcSwitch
        isCalcFormExpanded={isCalcFormExpanded}
        setCalcExpanded={setCalcExpanded}
      />
      <CalcForm
        isCalcFormExpanded={isCalcFormExpanded}
        handleSubmit={handleSubmit}
        currentBalance={currentBalance}
        setCurrentBalance={setCurrentBalance}
        annualInterestRate={annualInterestRate}
        setAnnualInterestRate={setAnnualInterestRate}
        monthlyPayment={monthlyPayment}
        setMonthlyPayment={setMonthlyPayment}
        balErrorMsg={balErrorMsg}
        monthlyErrorMsg={monthlyErrorMsg}
        aprErrorMsg={aprErrorMsg}
      />
    </div>
  );
};

Calculator.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isCalcFormExpanded: PropTypes.bool.isRequired,
  setCalcExpanded: PropTypes.func.isRequired,
  currentBalance: PropTypes.string.isRequired,
  setCurrentBalance: PropTypes.func.isRequired,
  annualInterestRate: PropTypes.string.isRequired,
  setAnnualInterestRate: PropTypes.func.isRequired,
  monthlyPayment: PropTypes.string.isRequired,
  setMonthlyPayment: PropTypes.func.isRequired,
  balErrorMsg: PropTypes.string.isRequired,
  monthlyErrorMsg: PropTypes.string.isRequired,
  aprErrorMsg: PropTypes.string.isRequired,
};

export default Calculator;
