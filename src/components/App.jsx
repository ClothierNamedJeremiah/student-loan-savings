import React, { useState } from 'react';

import Header from './Header';
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
          <p className="text-color--red text-fw--500">
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

  /* TODO: restructure DOM for 'Loan Details Section' */
  return (
    <div className="grid-center">
      <Header />
      <main className="grid-center">
        <section>
          <h2 className="section-title text-align--center bot-margin">Loan Details</h2>
          <Calculator
            setLoanDetails={setLoanDetails}
            setLoanSavings={setLoanSavings}
          />
        </section>
        {content}
      </main>
    </div>
  );
};

export default App;
