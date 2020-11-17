import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Paper,
  Tabs,
  Tab,
} from '@material-ui/core';

import TabPanel from './TabPanel';
import SavingsTable from './SavingsTable';

const StyledTabs = withStyles({
  indicator: {
    backgroundColor: 'var(--color-dark-green)',
  },
})(Tabs);

const StyledTab = withStyles({
  root: {
    color: 'var(--color-dark-green)',
    '&:hover': {
      color: 'var(--color-medium-dark-green)',
      opacity: 1,
    },
    '&$selected': {
      color: 'var(--color-medium-dark-green)',
      fontWeight: 600,
    },
    '&:focus': {
      color: 'var(--color-medium-dark-green)',
    },
  },
  selected: {},
})(Tab);

const Savings = (props) => {
  const { savingsData } = props;
  const { additionalMonthlyPayment, lowerInterestRate } = savingsData;
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
      <Paper square>
        <StyledTabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="disabled tabs example"
          centered
        >
          <StyledTab label="Additional Monthly Payment" />
          <StyledTab label="Lower Interest Rate" />
        </StyledTabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <SavingsTable
          savingsData={additionalMonthlyPayment}
          tableType="additionalMonthlyPayment"
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SavingsTable
          savingsData={lowerInterestRate}
          tableType="lowerInterestRate"
        />
      </TabPanel>
    </div>
  );
};

Savings.propTypes = {
  savingsData: PropTypes.shape({
    additionalMonthlyPayment: PropTypes.arrayOf(PropTypes.array).isRequired,
    lowerInterestRate: PropTypes.arrayOf(PropTypes.array).isRequired,
  }).isRequired,
};

export default memo(Savings);