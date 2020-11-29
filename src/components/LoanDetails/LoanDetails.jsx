import React from 'react';
import PropTypes from 'prop-types';

const LoanDetails = (props) => {
  const { payoffDateEstimate, timeUntilPayoffStr, totalInterestPaidStr } = props;

  return (
    <article>
      <article>
        <h3>PAYOFF DATE</h3>
        <h4 className="font-weight--500">{payoffDateEstimate}</h4>
        <em>{timeUntilPayoffStr}</em>
      </article>
      <article>
        <h3>TOTAL INTEREST PAID</h3>
        <p>{totalInterestPaidStr}</p>
      </article>
    </article>
  );
};

LoanDetails.propTypes = {
  payoffDateEstimate: PropTypes.string.isRequired,
  timeUntilPayoffStr: PropTypes.string.isRequired,
  totalInterestPaidStr: PropTypes.string.isRequired,
};

export default LoanDetails;
