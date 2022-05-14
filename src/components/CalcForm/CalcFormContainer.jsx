import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useFormValidator } from '../../helpers/hooks';
import { calcLoanDetails, calcLoanSavings, convertCurrencyStringToFloat } from '../../helpers/math';
import { isValidCurrency, isValidPercent } from '../../helpers/validator';

import CalcForm from './CalcForm';

const CalcFormContainer = (props) => {
  const {
    setLoanDetails,
    setLoanSavings,
    isCalcFormExpanded,
    setCalcExpanded,
  } = props;

  const [height, setHeight] = useState(0);
  // const [currentBalance, setCurrentBalance] = useState('30000.00');
  // const [monthlyPayment, setMonthlyPayment] = useState('393.60');
  // const [annualInterestRate, setAnnualInterestRate] = useState('5.80');
  const [currentBalance, setCurrentBalance] = useState(
    window.sessionStorage.getItem('sls-currentBalance')
    || ''
  );
  const [monthlyPayment, setMonthlyPayment] = useState(
    window.sessionStorage.getItem('sls-monthlyPayment')
    || ''
  );
  const [annualInterestRate, setAnnualInterestRate] = useState(
    window.sessionStorage.getItem('sls-annualInterestRate')
    || ''
  );

  const balErrorMsg = useFormValidator(isValidCurrency, currentBalance,
    'Please enter a valid U.S amount.');
  const monthlyErrorMsg = useFormValidator(isValidCurrency, monthlyPayment,
    'Please enter a valid U.S amount.');
  const aprErrorMsg = useFormValidator(isValidPercent, annualInterestRate,
    'Please enter a valid percentage less than 35.');

  const isAnyRequiredFieldEmpty = (
    currentBalance === ''
    || annualInterestRate === ''
    || monthlyPayment === ''
  );

  const isAnyErrorMsgDisplayed = (
    balErrorMsg !== ''
    || monthlyErrorMsg !== ''
    || aprErrorMsg !== ''
  );

  useEffect(() => {
    if (isCalcFormExpanded) {
      const formHeight = document.getElementsByTagName('form')[0].clientHeight;
      setHeight(formHeight);
    } else {
      setHeight(0);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    window.sessionStorage.setItem('sls-currentBalance', currentBalance);
    window.sessionStorage.setItem('sls-monthlyPayment', monthlyPayment);
    window.sessionStorage.setItem('sls-annualInterestRate', annualInterestRate);

    /*
      Blur the input field after form submission.
      This will hide the keyboard on mobile after a user
      has submitted the form.
    */
    document.activeElement.blur();

    const loanDetails = calcLoanDetails(
      convertCurrencyStringToFloat(currentBalance),
      convertCurrencyStringToFloat(monthlyPayment),
      convertCurrencyStringToFloat(annualInterestRate) / 100,
    );

    const loanSavings = calcLoanSavings(
      convertCurrencyStringToFloat(currentBalance),
      convertCurrencyStringToFloat(monthlyPayment),
      convertCurrencyStringToFloat(annualInterestRate) / 100,
      loanDetails.totalInterestPaid,
      loanDetails.monthsTillPayoffDate,
    );

    setLoanDetails(loanDetails);
    setLoanSavings(loanSavings);

    setCalcExpanded(false);
  };

  return (
    <CalcForm
      handleSubmit={handleSubmit}
      height={height}
      currentBalance={currentBalance}
      setCurrentBalance={setCurrentBalance}
      monthlyPayment={monthlyPayment}
      setMonthlyPayment={setMonthlyPayment}
      annualInterestRate={annualInterestRate}
      setAnnualInterestRate={setAnnualInterestRate}
      balErrorMsg={balErrorMsg}
      monthlyErrorMsg={monthlyErrorMsg}
      aprErrorMsg={aprErrorMsg}
      isDisabled={isAnyRequiredFieldEmpty || isAnyErrorMsgDisplayed}
    />
  );
};

CalcFormContainer.propTypes = {
  setLoanDetails: PropTypes.func.isRequired,
  setLoanSavings: PropTypes.func.isRequired,
  isCalcFormExpanded: PropTypes.bool.isRequired,
  setCalcExpanded: PropTypes.func.isRequired,
};

export default CalcFormContainer;
