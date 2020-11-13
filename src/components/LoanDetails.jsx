import React from 'react';
import PropTypes from 'prop-types';

import { toCurrencyString } from '../helpers/math';
import toYearMonthString from '../helpers/formatter';

const LoanDetails = (props) => {
  const { loanDetails } = props;
  const { months, interestPaid } = loanDetails;

  const years = Math.floor(months / 12);

  const str = toYearMonthString(months);

  let payoffDesc = '';
  if (years === 0) {
    payoffDesc = `${str} from now`;
  } else {
    payoffDesc = `${str} (${months} months) from now`;
  }

  return (
    <div id="loan-details">
      <h2 id="title">Loan Details</h2>
      <h3 className="no-margin">PAYOFF DATE</h3>
      <h4 className="fs-medium">February, 2029</h4>
      <p className="no-margin fs-light">{payoffDesc}</p>
      <h3 className="top-margin">TOTAL INTEREST PAID</h3>
      <p className="no-margin">{toCurrencyString(interestPaid)}</p>
    </div>
  );
};

LoanDetails.propTypes = {
  loanDetails: PropTypes.shape({
    months: PropTypes.number.isRequired,
    interestPaid: PropTypes.number.isRequired,
  }).isRequired,
};

export default LoanDetails;
