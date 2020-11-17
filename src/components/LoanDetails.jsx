import React from 'react';
import PropTypes from 'prop-types';

import {
  toYearMonthString,
  toCurrencyString,
} from '../helpers/formatter';

const LoanDetails = (props) => {
  const { loanDetails } = props;
  const { monthsTillPayoffDate, totalInterestPaid } = loanDetails;

  const years = Math.floor(monthsTillPayoffDate / 12);

  const str = toYearMonthString(monthsTillPayoffDate);

  let payoffDesc = '';
  if (years === 0) {
    payoffDesc = `${str} from now`;
  } else {
    payoffDesc = `${str} (${monthsTillPayoffDate} months) from now`;
  }

  return (
    <div id="loan-details">
      <h2 id="title">Loan Details</h2>
      <h3 className="no-margin">PAYOFF DATE</h3>
      <h4 className="fs-medium">February, 2029</h4>
      <p className="no-margin fs-light">{payoffDesc}</p>
      <h3 className="top-margin">TOTAL INTEREST PAID</h3>
      <p className="no-margin">{toCurrencyString(totalInterestPaid)}</p>
    </div>
  );
};

LoanDetails.propTypes = {
  loanDetails: PropTypes.shape({
    monthsTillPayoffDate: PropTypes.number.isRequired,
    totalInterestPaid: PropTypes.number.isRequired,
  }).isRequired,
};

export default LoanDetails;
