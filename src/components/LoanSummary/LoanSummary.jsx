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
        <p className="fs-error">
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
      <section className="margin-top--1 margin--bot">
        <article className="padding--10 padding-left--4">
          <h3 className="margin--none">PAYOFF DATE</h3>
          <h4 className="margin--none font-weight--500">{payoffDateEstimate}</h4>
          <i className="margin--none">{timeUntilPayoffStr}</i>
        </article>
        <article className="padding--10 padding-left--4">
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
