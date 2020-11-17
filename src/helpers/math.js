export const calcLoanDetails = (currentBalance, monthlyPayment, annualInterestRate) => {
  // console.group('%c CALCULATING LOAN DETAILS', 'color: #004D40');
  // console.log(`currentBalance: ${currentBalance}`);
  // console.log(`monthlyPayment: ${monthlyPayment}`);
  // console.log(`annualInterestRate: ${annualInterestRate}`);
  // console.groupEnd();

  let monthsTillPayoffDate = 0;
  let totalInterestPaid = 0;
  let remainingBalance = currentBalance;
  const monthlyInterest = currentBalance * (annualInterestRate / 12);
  while (remainingBalance > 0 && monthsTillPayoffDate <= 360) {
    // 1) Compound Monthly Interest
    remainingBalance += monthlyInterest;

    // 2) Deduct monthly payment
    remainingBalance -= monthlyPayment;

    totalInterestPaid += monthlyInterest;
    monthsTillPayoffDate += 1;
  }

  // Return Loan Summary
  return {
    monthsTillPayoffDate,
    totalInterestPaid,
  };
};

const calcSavingsWithAdditionalMonthlyPayment = (
  currentBalance, baseMonthlyPayment, annualInterestRate, totalInterestPaid,
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
      res.totalInterestPaid,
      totalInterestPaid - res.totalInterestPaid,
    ]);
  });

  return savings;
};

const calcSavingsWithLowerInterestRate = (
  currentBalance, baseMonthlyPayment, annualInterestRate, totalInterestPaid,
) => {
  let threshold = Math.floor(annualInterestRate / 0.0025) * 0.0025;
  const savings = [];
  for (let i = 0; i < 20 && threshold > 0; i += 1) {
    const res = calcLoanDetails(
      currentBalance,
      baseMonthlyPayment,
      threshold,
    );
    savings.push([
      threshold * 100,
      res.monthsTillPayoffDate,
      res.totalInterestPaid,
      totalInterestPaid - res.totalInterestPaid,
    ]);
    threshold -= 0.0025;
  }

  return savings;
};

export const calcLoanSavings = (
  currentBalance, baseMonthlyPayment, annualInterestRate, totalInterestPaid,
) => {
  // console.group('%c CALCULATING SAVINGS DETAILS', 'color: #004D40');
  // console.log(`currentBalance: ${currentBalance}`);
  // console.log(`annualInterestRate: ${annualInterestRate}`);
  // console.log(`totalInterestPaid: ${totalInterestPaid}`);
  // console.groupEnd();

  const additionalMonthlyPayment = calcSavingsWithAdditionalMonthlyPayment(
    currentBalance, baseMonthlyPayment, annualInterestRate, totalInterestPaid,
  );

  const lowerInterestRate = calcSavingsWithLowerInterestRate(
    currentBalance, baseMonthlyPayment, annualInterestRate, totalInterestPaid,
  );

  return {
    additionalMonthlyPayment,
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
