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

  let content = null;
  if (hasLoanInformationBeenSubmitted) {
    if (loanDetails.monthsTillPayoffDate === 361) {
      content = (
        <div>
          <p style={{ color: 'red' }}>
            Please use a loan that can be payed off in at least 30 years.
          </p>
          <p>The following changes can decrease payoff time:</p>
          <ul>
            <li>Decrease current balance</li>
            <li>Increase monthly payment</li>
            <li>Decrease annual interest rate</li>
          </ul>
        </div>
      );
    } else {
      content = (
        <>
          <LoanDetailsContainer loanDetails={loanDetails} />
          <Savings loanSavings={loanSavings} loanDetails={loanDetails} />
        </>
      );
    }
  }

  return (
    <div id="wrapper">
      <div style={{ maxWidth: '400px' }}>
        <h1 id="title" style={{ textAlign: 'center' }}>Student Loan Savings</h1>
        <p id="description" className="no-margin">
          <strong>Increasing monthly payments </strong>
          and
          <strong> decreasing the interest rate </strong>
          on student loans can drastrically reduce the total interest paid over the lifetime
          of your loan.
        </p>
        <p id="description" className="no-margin">
          <em>
            Fill out the form below and see how much you could be saving.
          </em>
        </p>
      </div>
      <h2 id="title" className="bot-margin" style={{ textAlign: 'center' }}>Loan Details</h2>
      <Calculator
        setLoanDetails={setLoanDetails}
        setLoanSavings={setLoanSavings}
      />
      {content}
    </div>
  );
};

export default App;
