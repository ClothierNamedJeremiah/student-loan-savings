import React from 'react';
import PropTypes from 'prop-types';

import { addMonthsToNow } from '../../helpers/math';
import {
  toYearMonthString,
  toCurrencyString,
} from '../../helpers/formatter';

import LoanSummary from './LoanSummary';

const LoanSummaryContainer = (props) => {
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
    <LoanSummary
      error={monthsTillPayoffDate === 361}
      payoffDateEstimate={addMonthsToNow(monthsTillPayoffDate)}
      timeUntilPayoffStr={timeUntilPayoffStr}
      totalInterestPaidStr={toCurrencyString(totalInterestPaid, 2, ' ')}
    />
  );
};

LoanSummaryContainer.propTypes = {
  loanDetails: PropTypes.shape({
    monthsTillPayoffDate: PropTypes.number.isRequired,
    totalInterestPaid: PropTypes.number.isRequired,
  }).isRequired,
};

export default LoanSummaryContainer;
