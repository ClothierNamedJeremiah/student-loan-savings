import React from 'react';
import PropTypes from 'prop-types';

import Calculator from './Calculator';
import LazyLoanSummaryContainer from './LoanSummary/LazyLoanSummaryContainer';

const LoanDetails = (props) => {
  const { loanDetails, setLoanDetails, setLoanSavings } = props;
  // payoffDateEstimate, timeUntilPayoffStr, totalInterestPaidStr

  const hasLoanInformationBeenSubmitted =
    loanDetails.constructor === Object &&
    'monthsTillPayoffDate' in loanDetails &&
    'totalInterestPaid' in loanDetails;

  return (
    <section className="grid-center">
      <h2 className="section-title margin-top--none">Loan Details</h2>
      <Calculator setLoanDetails={setLoanDetails} setLoanSavings={setLoanSavings} />
      {hasLoanInformationBeenSubmitted && <LazyLoanSummaryContainer loanDetails={loanDetails} />}
    </section>
  );
};

LoanDetails.propTypes = {
  loanDetails: PropTypes.shape({
    monthsTillPayoffDate: PropTypes.number,
    totalInterestPaid: PropTypes.number,
  }).isRequired,
  setLoanDetails: PropTypes.func.isRequired,
  setLoanSavings: PropTypes.func.isRequired,
};

export default LoanDetails;
