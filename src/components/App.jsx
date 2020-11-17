import React, { useMemo, useState } from 'react';

import Calculator from './Calculator';
import LoanDetails from './LoanDetails';
import Savings from './Savings';

import { useDelayedFormValidator } from '../helpers/hooks';
import { calcLoanDetails, calcLoanSavings, convertCurrencyStringToFloat } from '../helpers/math';
import { isValidCurrency, isValidPercent } from '../helpers/validator';

const App = () => {
  const [isCalcFormExpanded, setCalcExpanded] = useState(true);
  const [numOfSubmissions, setNumOfSubmissions] = useState(0);
  const [currentBalance, setCurrentBalance] = useState('30000.00');
  const [monthlyPayment, setMonthlyPayment] = useState('393.60');
  const [annualInterestRate, setAnnualInterestRate] = useState('5.80');
  // const [currentBalance, setCurrentBalance] = useState('');
  // const [monthlyPayment, setMonthlyPayment] = useState('');
  // const [annualInterestRate, setAnnualInterestRate] = useState('');

  /* FORM VALIDATION FOR CALCULATOR */
  const [balErrorMsg, setBalErrorMsg] = useState('');
  const [monthlyErrorMsg, setMonthlyErrorMsg] = useState('');
  const [aprErrorMsg, setAprErrorMsg] = useState('');
  useDelayedFormValidator(isValidCurrency, currentBalance,
    'Please enter a valid U.S amount.', setBalErrorMsg);
  useDelayedFormValidator(isValidCurrency, monthlyPayment,
    'Please enter a valid U.S amount.', setMonthlyErrorMsg);
  useDelayedFormValidator(isValidPercent, annualInterestRate,
    'Please enter a valid percentage less than 35.', setAprErrorMsg);
  /* END */

  const handleSubmit = (e) => {
    e.preventDefault();
    setNumOfSubmissions((curr) => curr + 1);
    setCalcExpanded(false);
  };

  const loanDetails = useMemo(() => (
    calcLoanDetails(
      convertCurrencyStringToFloat(currentBalance),
      convertCurrencyStringToFloat(monthlyPayment),
      convertCurrencyStringToFloat(annualInterestRate) / 100,
    )
  ), [numOfSubmissions]);

  const savingsData = useMemo(() => (
    calcLoanSavings(
      convertCurrencyStringToFloat(currentBalance),
      convertCurrencyStringToFloat(monthlyPayment),
      convertCurrencyStringToFloat(annualInterestRate) / 100,
      convertCurrencyStringToFloat(loanDetails.interestPaid),
    )
  ), [loanDetails]);

  return (
    <div id="wrapper">
      <div style={{ maxWidth: '400px' }}>
        <h1 id="title">Student Loan Savings</h1>
        <p id="description" className="no-margin">
          <strong>Increasing monthly payments </strong>
          and
          <strong> lowering the interest rate </strong>
          on student loans can drastrically reduce the total interest paid over the lifetime
          of your loan. Use the calculator below and see how much you could be saving.
        </p>
      </div>
      <Calculator
        isCalcFormExpanded={isCalcFormExpanded}
        setCalcExpanded={setCalcExpanded}
        handleSubmit={handleSubmit}
        currentBalance={currentBalance}
        setCurrentBalance={setCurrentBalance}
        monthlyPayment={monthlyPayment}
        setMonthlyPayment={setMonthlyPayment}
        annualInterestRate={annualInterestRate}
        setAnnualInterestRate={setAnnualInterestRate}
        balErrorMsg={balErrorMsg}
        monthlyErrorMsg={monthlyErrorMsg}
        aprErrorMsg={aprErrorMsg}
      />
      {numOfSubmissions > 0
        && (
          <>
            <LoanDetails loanDetails={loanDetails} />
            <Savings savingsData={savingsData} />
          </>
        )}
    </div>
  );
};

export default App;
