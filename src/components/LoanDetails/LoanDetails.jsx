import React from 'react';
import PropTypes from 'prop-types';

const LoanDetails = (props) => {
  const { timeUntilPayoffStr, totalInterestPaidStr } = props;

  return (
    <div id="loan-details">
      <h2 id="title">Loan Details</h2>
      <h3 className="no-margin">PAYOFF DATE</h3>
      <h4 className="fs-medium">February, 2029</h4>
      <p className="no-margin fs-light">{timeUntilPayoffStr}</p>
      <h3 className="top-margin">TOTAL INTEREST PAID</h3>
      <p className="no-margin">{totalInterestPaidStr}</p>
    </div>
  );
};

LoanDetails.propTypes = {
  timeUntilPayoffStr: PropTypes.string.isRequired,
  totalInterestPaidStr: PropTypes.string.isRequired,
};

export default LoanDetails;
