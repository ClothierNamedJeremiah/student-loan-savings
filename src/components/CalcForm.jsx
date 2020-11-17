import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  InputAdornment,
  FormHelperText,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { useDelayedFormValidator } from '../helpers/hooks';
import { calcLoanDetails, calcLoanSavings, convertCurrencyStringToFloat } from '../helpers/math';
import { isValidCurrency, isValidPercent } from '../helpers/validator';

const StyledButton = withStyles({
  containedPrimary: {
    'background-color': 'var(--color-dark-green)',
    '&:hover': {
      'background-color': 'var(--color-medium-dark-green)',
    },
  },
})(Button);

const CalcForm = (props) => {
  const {
    setLoanDetails,
    setLoanSavings,
    isCalcFormExpanded,
  } = props;

  const [currentBalance, setCurrentBalance] = useState('30000.00');
  const [monthlyPayment, setMonthlyPayment] = useState('393.60');
  const [annualInterestRate, setAnnualInterestRate] = useState('5.80');
  // const [currentBalance, setCurrentBalance] = useState('');
  // const [monthlyPayment, setMonthlyPayment] = useState('');
  // const [annualInterestRate, setAnnualInterestRate] = useState('');

  /* FORM VALIDATION FOR CALCULATOR */
  const [balErrorMsg, setBalErrorMsg] = useState('');
  const [monthlyErrorMsg, setMonthlyErrorMsg] = useState('');
  const [aprErrorMsg, setAprErrorMsg] = useState('');
  useDelayedFormValidator(isValidCurrency, currentBalance,
    'Please enter a valid U.S amount.', setBalErrorMsg);
  useDelayedFormValidator(isValidCurrency, monthlyPayment,
    'Please enter a valid U.S amount.', setMonthlyErrorMsg);
  useDelayedFormValidator(isValidPercent, annualInterestRate,
    'Please enter a valid percentage less than 35.', setAprErrorMsg);
  /* END */


  const [height, setHeight] = useState(0);
  const isAnyRequiredFieldEmpty = currentBalance === '' || annualInterestRate === '' || monthlyPayment === '';
  const isAnyErrorMsgDisplayed = balErrorMsg !== '' || monthlyErrorMsg !== '' || aprErrorMsg !== '';

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

    const loanDetails = calcLoanDetails(
      convertCurrencyStringToFloat(currentBalance),
      convertCurrencyStringToFloat(monthlyPayment),
      convertCurrencyStringToFloat(annualInterestRate) / 100,
    );

    const loanSavings = calcLoanSavings(
      convertCurrencyStringToFloat(currentBalance),
      convertCurrencyStringToFloat(monthlyPayment),
      convertCurrencyStringToFloat(annualInterestRate) / 100,
      convertCurrencyStringToFloat(loanDetails.totalInterestPaid),
    );

    setLoanDetails(loanDetails);
    setLoanSavings(loanSavings);
  }


  return (
    <div
      style={{ height }}
      className="expandable"
    >
      <form id="calc-form">
        <FormControl error={balErrorMsg !== ''} variant="outlined">
          <InputLabel htmlFor="current-balance">Current balance *</InputLabel>
          <OutlinedInput
            required
            id="current-balance"
            value={currentBalance}
            onChange={(e) => setCurrentBalance(e.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Current balance *"
            placeholder="0.00"
            autoComplete="off"
          />
          <FormHelperText className="error-text" variant="outlined" dense="normal">
            {balErrorMsg}
          </FormHelperText>
        </FormControl>
        <FormControl error={monthlyErrorMsg !== ''} variant="outlined">
          <InputLabel htmlFor="monthly-payment">Monthly payment *</InputLabel>
          <OutlinedInput
            required
            id="monthly-payment"
            value={monthlyPayment}
            onChange={(e) => setMonthlyPayment(e.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Monthly payment *"
            placeholder="0.00"
            autoComplete="off"
          />
          <FormHelperText className="error-text" variant="outlined" dense="normal">
            {monthlyErrorMsg}
          </FormHelperText>
        </FormControl>
        <FormControl error={aprErrorMsg !== ''} variant="outlined">
          <InputLabel htmlFor="apr">Annual interest rate *</InputLabel>
          <OutlinedInput
            required
            id="apr"
            value={annualInterestRate}
            onChange={(e) => setAnnualInterestRate(e.target.value)}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            label="Annual interest rate *"
            placeholder="0.00"
            autoComplete="off"
          />
          <FormHelperText className="error-text" variant="outlined" dense="normal">
            {aprErrorMsg}
          </FormHelperText>
        </FormControl>
        <StyledButton
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={isAnyRequiredFieldEmpty || isAnyErrorMsgDisplayed}
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </StyledButton>
      </form>
    </div>

  );
};

CalcForm.propTypes = {
  setLoanDetails: PropTypes.func.isRequired,
  setLoanSavings: PropTypes.func.isRequired,
  isCalcFormExpanded: PropTypes.bool.isRequired,
};

export default CalcForm;
