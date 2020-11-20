import React from 'react';
import PropTypes from 'prop-types';

import {
  toYearMonthString,
  toCurrencyString,
} from '../../helpers/formatter';

import LoanDetails from './LoanDetails';

const LoanDetailsContainer = (props) => {
  const { loanDetails } = props;
  const { monthsTillPayoffDate, totalInterestPaid } = loanDetails;

  const years = Math.floor(monthsTillPayoffDate / 12);

  const str = toYearMonthString(monthsTillPayoffDate);

  let timeUntilPayoffStr = '';
  if (years === 0) {
    timeUntilPayoffStr = `${str} from now`;
  } else {
    timeUntilPayoffStr = `${str} (${monthsTillPayoffDate} months) from now`;
  }

  return (
    <LoanDetails
      timeUntilPayoffStr={timeUntilPayoffStr}
      totalInterestPaidStr={toCurrencyString(totalInterestPaid)}
    />
  );
};

LoanDetailsContainer.propTypes = {
  loanDetails: PropTypes.shape({
    monthsTillPayoffDate: PropTypes.number.isRequired,
    totalInterestPaid: PropTypes.number.isRequired,
  }).isRequired,
};

export default LoanDetailsContainer;
