import React from 'react';
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
    handleSubmit,
    height,
    currentBalance,
    setCurrentBalance,
    monthlyPayment,
    setMonthlyPayment,
    annualInterestRate,
    setAnnualInterestRate,
    balErrorMsg,
    monthlyErrorMsg,
    aprErrorMsg,
    isDisabled,
  } = props;

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
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
          disabled={isDisabled}
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </StyledButton>
      </form>
    </div>

  );
};

CalcForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  currentBalance: PropTypes.string.isRequired,
  setCurrentBalance: PropTypes.func.isRequired,
  monthlyPayment: PropTypes.string.isRequired,
  setMonthlyPayment: PropTypes.func.isRequired,
  annualInterestRate: PropTypes.string.isRequired,
  setAnnualInterestRate: PropTypes.func.isRequired,
  balErrorMsg: PropTypes.string.isRequired,
  monthlyErrorMsg: PropTypes.string.isRequired,
  aprErrorMsg: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

export default CalcForm;
