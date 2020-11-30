import React from 'react';
import PropTypes from 'prop-types';

const LoanSummary = (props) => {
  const {
    error,
    payoffDateEstimate,
    timeUntilPayoffStr,
    totalInterestPaidStr,
  } = props;

  let componentRenderedContent = null;
  if (error) {
    componentRenderedContent = (
      <article>
        <p className="text-color--red text-fw--500">
          Please use a loan that can be payed off in at least 30 years.
        </p>
        <p>The following changes can decrease payoff time:</p>
        <ul>
          <li>Decrease current balance</li>
          <li>Increase monthly payment</li>
          <li>Decrease annual interest rate</li>
        </ul>
      </article>
    );
  } else {
    componentRenderedContent = (
      <section>
        <article>
          <h3 className="margin--none">PAYOFF DATE</h3>
          <h4 className="margin--none font-weight--500">{payoffDateEstimate}</h4>
          <em className="margin--none">{timeUntilPayoffStr}</em>
        </article>
        <article>
          <h3 className="margin--none">TOTAL INTEREST PAID</h3>
          <p className="margin--none">{totalInterestPaidStr}</p>
        </article>
      </section>
    );
  }

  return componentRenderedContent;
};

LoanSummary.propTypes = {
  error: PropTypes.bool.isRequired,
  payoffDateEstimate: PropTypes.string.isRequired,
  timeUntilPayoffStr: PropTypes.string.isRequired,
  totalInterestPaidStr: PropTypes.string.isRequired,
};

export default LoanSummary;
