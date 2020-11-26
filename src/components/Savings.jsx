import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import SavingsTable from './SavingsTable';

const TOOLTIP_HIGHER_MONTHLY_PAYMENT = 'See how much you\'d save by increasing your monthly payment';
const TOOLTIP_LOWER_INTEREST_RATE = 'See how much you\'d save by decreasing your interest rate';

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
  const { higherMonthlyPayment, lowerInterestRate } = loanSavings;
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div id="savings">
      <h2 className="bot-margin" id="title">Loan Savings</h2>
      <p>
        Toggle between
        <strong> increasing monthly payment </strong>
        and
        <strong> decreasing interest rate </strong>
        to see different loan savings tables
      </p>
      <div style={{ display: 'flex', width: '100%', minWidth: 250 }}>
        <Tooltip title={TOOLTIP_HIGHER_MONTHLY_PAYMENT} placement="top">
          <StyledButton
            variant={value === 0 ? 'contained' : 'outlined'}
            color="primary"
            onClick={(e) => handleChange(e, 0)}
          >
            Increasing Monthly Payment
          </StyledButton>
        </Tooltip>
        <Tooltip title={TOOLTIP_LOWER_INTEREST_RATE} placement="top">
          <StyledButton
            variant={value === 1 ? 'contained' : 'outlined'}
            color="primary"
            onClick={(e) => handleChange(e, 1)}
          >
            Decreasing Interest Rate
          </StyledButton>
        </Tooltip>
      </div>

      {value === 0
        ? (
          <SavingsTable
            loanSavings={higherMonthlyPayment}
            tableType="higherMonthlyPayment"
          />
        )
        : (
          <SavingsTable
            loanSavings={lowerInterestRate}
            tableType="lowerInterestRate"
          />
        )
      }

      <p>
        <em>
          Note: the data displayed in the table above assumes interest compounds
          monthly and the interest rate is fixed.
        </em>
      </p>
    </div>
  );
};

Savings.propTypes = {
  loanSavings: PropTypes.shape({
    higherMonthlyPayment: PropTypes.arrayOf(PropTypes.array).isRequired,
    lowerInterestRate: PropTypes.arrayOf(PropTypes.array).isRequired,
  }).isRequired,
};

export default memo(Savings);
