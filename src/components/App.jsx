import React, { useState } from 'react';

import Header from './Header';
import LoanDetails from './LoanDetails';
import Savings from './Savings';

const App = () => {
  const [loanDetails, setLoanDetails] = useState({});
  const [loanSavings, setLoanSavings] = useState({});

  const isValidLoan = loanDetails.constructor === Object
    && 'monthsTillPayoffDate' in loanDetails
    && 'totalInterestPaid' in loanDetails
    && loanDetails.monthsTillPayoffDate !== 361;

  return (
    <div className="grid-center margin-shrinks">
      <Header />
      <LoanDetails
        loanDetails={loanDetails}
        setLoanDetails={setLoanDetails}
        setLoanSavings={setLoanSavings}
      />
      {isValidLoan
        && <Savings loanSavings={loanSavings} loanDetails={loanDetails} />}
    </div>
  );
};

export default App;
