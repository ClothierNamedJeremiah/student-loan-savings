import React, { useState } from 'react';

import Header from './Header';
import LoanDetails from './LoanDetails';
import Savings from './Savings';

const App = () => {
  const [loanDetails, setLoanDetails] = useState({});
  const [loanSavings, setLoanSavings] = useState({});

  console.log(loanDetails);

  const isValidLoan = loanDetails.constructor === Object
    && 'monthsTillPayoffDate' in loanDetails
    && 'totalInterestPaid' in loanDetails
    && loanDetails.monthsTillPayoffDate !== 361;

  /* TODO: restructure DOM for 'Loan Details Section' */
  return (
    <div className="grid-center">
      <Header />
      <main className="grid-center">
        <LoanDetails
          loanDetails={loanDetails}
          setLoanDetails={setLoanDetails}
          setLoanSavings={setLoanSavings}
        />
        {isValidLoan
          && <Savings loanSavings={loanSavings} loanDetails={loanDetails} />}
      </main>
    </div>
  );
};

export default App;
