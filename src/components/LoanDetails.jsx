import React from 'react';
import PropTypes from 'prop-types';

import Calculator from './Calculator';
import LoanSummaryContainer from './LoanSummary/LoanSummaryContainer';

const LoanDetails = (props) => {
  const { loanDetails, setLoanDetails, setLoanSavings } = props;
  // payoffDateEstimate, timeUntilPayoffStr, totalInterestPaidStr

  const hasLoanInformationBeenSubmitted = loanDetails.constructor === Object
    && 'monthsTillPayoffDate' in loanDetails
    && 'totalInterestPaid' in loanDetails;

  return (
    <section>
      <h2 className="section-title text-align--center bot-margin">Loan Details</h2>
      <Calculator
        setLoanDetails={setLoanDetails}
        setLoanSavings={setLoanSavings}
      />
      {hasLoanInformationBeenSubmitted
        && <LoanSummaryContainer loanDetails={loanDetails} />}
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
