export const calcLoanDetails = (currentBalance, monthlyPayment, annualInterestRate) => {
  // console.group('%c CALCULATING LOAN DETAILS', 'color: #004D40');
  // console.log(`currentBalance: ${currentBalance}`);
  // console.log(`monthlyPayment: ${monthlyPayment}`);
  // console.log(`annualInterestRate: ${annualInterestRate}`);
  // console.groupEnd();

  let monthsTillPayoffDate = 0;
  let totalInterestPaid = 0;
  let remainingBalance = currentBalance;
  while (remainingBalance > 0 && monthsTillPayoffDate <= 360) {
    const monthlyInterest = remainingBalance * (annualInterestRate / 12);
    // Deduct monthly payment
    remainingBalance -= monthlyPayment;

    // Compound Monthly Interest
    remainingBalance += monthlyInterest;

    totalInterestPaid += monthlyInterest;
    monthsTillPayoffDate += 1;
  }

  // Return Loan Summary
  return {
    monthsTillPayoffDate,
    totalInterestPaid,
  };
};

const calcSavingsWithhigherMonthlyPayment = (
  currentBalance, baseMonthlyPayment, annualInterestRate, totalInterestPaid,
  monthsTillPayoffDate,
) => {
  const THRESHOLDS = [
    50, 100, 150, 200, 250, 300, 350, 400, 450, 500,
    550, 600, 650, 700, 750, 800, 850, 900, 950, 1000,
  ];

  const savings = [];
  THRESHOLDS.forEach((monthlyPayment) => {
    const res = calcLoanDetails(
      currentBalance,
      baseMonthlyPayment + monthlyPayment,
      annualInterestRate,
    );
    savings.push([
      monthlyPayment,
      res.monthsTillPayoffDate,
      monthsTillPayoffDate - res.monthsTillPayoffDate,
      res.totalInterestPaid,
      totalInterestPaid - res.totalInterestPaid,
    ]);
  });

  return savings;
};

const calcSavingsWithLowerInterestRate = (
  currentBalance, baseMonthlyPayment, annualInterestRate, totalInterestPaid,
  monthsTillPayoffDate,
) => {
  const THRESHOLDS = [
    0.0015, 0.0030, 0.0045, 0.0060, 0.0075, 0.0090, 0.0105, 0.0120, 0.0135, 0.0150,
    0.0165, 0.0180, 0.0195, 0.0210, 0.0225, 0.0240, 0.0255, 0.0270, 0.0285, 0.0300,
  ];

  const savings = [];
  THRESHOLDS.forEach((threshold) => {
    if (annualInterestRate - threshold <= 0) {
      return savings;
    }
    const res = calcLoanDetails(
      currentBalance,
      baseMonthlyPayment,
      annualInterestRate - threshold,
    );
    savings.push([
      threshold * 100,
      res.monthsTillPayoffDate,
      monthsTillPayoffDate - res.monthsTillPayoffDate,
      res.totalInterestPaid,
      totalInterestPaid - res.totalInterestPaid,
    ]);
  });

  return savings;
};

export const calcLoanSavings = (
  currentBalance, baseMonthlyPayment, annualInterestRate, totalInterestPaid,
  monthsTillPayoffDate,
) => {
  // console.group('%c CALCULATING SAVINGS DETAILS', 'color: #004D40');
  // console.log(`currentBalance: ${currentBalance}`);
  // console.log(`annualInterestRate: ${annualInterestRate}`);
  // console.log(`totalInterestPaid: ${totalInterestPaid}`);
  // console.groupEnd();

  const higherMonthlyPayment = calcSavingsWithhigherMonthlyPayment(
    currentBalance, baseMonthlyPayment, annualInterestRate, totalInterestPaid,
    monthsTillPayoffDate,
  );

  const lowerInterestRate = calcSavingsWithLowerInterestRate(
    currentBalance, baseMonthlyPayment, annualInterestRate, totalInterestPaid,
    monthsTillPayoffDate,
  );

  return {
    higherMonthlyPayment,
    lowerInterestRate,
  };
};

export const convertCurrencyStringToFloat = (s) => {
  if (typeof s === 'number') return s;
  if (typeof s !== 'string') throw new Error('s is not of type string');

  const re = /,/g;
  const sWithoutCommas = s.replaceAll(re, '');
  return parseFloat(sWithoutCommas);
};

export const addMonthsToNow = (months) => {
  const now = new Date();
  now.setMonth(now.getMonth() + months);
  if (now.getDate() !== now) {
    now.setDate(0);
  }

  const options = {
    month: 'long',
    year: 'numeric',
  };

  return now.toLocaleString('default', options);
};
