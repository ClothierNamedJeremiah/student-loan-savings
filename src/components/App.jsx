import React, { useState } from 'react';

import Calculator from './Calculator';
import LoanDetailsContainer from './LoanDetails/LoanDetailsContainer';
import Savings from './Savings';

const App = () => {
  const [loanDetails, setLoanDetails] = useState({});
  const [loanSavings, setLoanSavings] = useState({});

  const hasLoanInformationBeenSubmitted = loanDetails.constructor === Object
    && 'monthsTillPayoffDate' in loanDetails
    && 'totalInterestPaid' in loanDetails;

  return (
    <div id="wrapper">
      <div style={{ maxWidth: '400px' }}>
        <h1 id="title" style={{ textAlign: 'center' }}>Student Loan Savings</h1>
        <p id="description" className="no-margin">
          <strong>Increasing monthly payments </strong>
          and
          <strong> lowering the interest rate </strong>
          on student loans can drastrically reduce the total interest paid over the lifetime
          of your loan. Fill out the form below and see how much you could be saving.
        </p>
      </div>
      <Calculator
        setLoanDetails={setLoanDetails}
        setLoanSavings={setLoanSavings}
      />
      {hasLoanInformationBeenSubmitted
        && (
          <>
            <LoanDetailsContainer loanDetails={loanDetails} />
            <Savings loanSavings={loanSavings} />
          </>
        )}
    </div>
  );
};

export default App;
