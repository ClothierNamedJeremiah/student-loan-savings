import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import SavingsTable from './SavingsTable';

const StyledButton = withStyles({
  root: {
    'text-align': 'center',
    flex: 1,
  },
  containedPrimary: {
    'background-color': '#1976d2',
    'border-radius': '4px 4px 0 0',
    '&:hover': {
      'background-color': '#115293',
    },
  },
  outlinedPrimary: {
    color: '#1976d2',
    'border-radius': '4px 4px 0 0',
    '&:hover': {
      border: '1px solid #1976d2',
      'background-color': 'rgba(25, 118, 210, 0.04)',
    },
  },
})(Button);

const Savings = (props) => {
  const { loanSavings } = props;
  const { additionalMonthlyPayment, lowerInterestRate } = loanSavings;
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div id="savings">
      <h2 className="bot-margin" id="title">Loan Savings</h2>
      <p>
        Toggle between
        <strong> additional monthly payment </strong>
        and
        <strong> lower interest rate </strong>
        to see how much you could be saving using one of the two methods.
      </p>
      <div style={{ display: 'flex', width: '100%', minWidth: 300}}>
        <StyledButton
          variant={value === 0 ? 'contained' : 'outlined'}
          color="primary"
          onClick={(e) => handleChange(e, 0)}
        >
          Additional Monthly Payment
        </StyledButton>
        <StyledButton
          variant={value === 1 ? 'contained' : 'outlined'}
          color="primary"
          onClick={(e) => handleChange(e, 1)}
        >
          Lower Interest Rate
        </StyledButton>
      </div>

      {value === 0
        ? (
          <SavingsTable
            loanSavings={additionalMonthlyPayment}
            tableType="additionalMonthlyPayment"
          />
        )
        : (
          <SavingsTable
            loanSavings={lowerInterestRate}
            tableType="lowerInterestRate"
          />
        )
      }
    </div>
  );
};

Savings.propTypes = {
  loanSavings: PropTypes.shape({
    additionalMonthlyPayment: PropTypes.arrayOf(PropTypes.array).isRequired,
    lowerInterestRate: PropTypes.arrayOf(PropTypes.array).isRequired,
  }).isRequired,
};

export default memo(Savings);
