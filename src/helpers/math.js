// TODO: The calc doesn't work with commas

// Calculate Loan Payoff (Get Summary Details)
export const calcLoanDetails = (currentBalance, monthlyPayment, annualInterestRate) => {
  // console.group('%c CALCULATING LOAN DETAILS', 'color: #004D40');
  // console.log(`currentBalance: ${currentBalance}`);
  // console.log(`monthlyPayment: ${monthlyPayment}`);
  // console.log(`annualInterestRate: ${annualInterestRate}`);
  // console.groupEnd();

  let months = 0;
  let interestPaid = 0;
  let remainingBalance = currentBalance;
  const monthlyInterest = currentBalance * (annualInterestRate / 12);
  while (remainingBalance > 0 && months <= 360) {
    // 1) Compound Monthly Interest
    remainingBalance += monthlyInterest;

    // 2) Deduct monthly payment
    remainingBalance -= monthlyPayment;

    interestPaid += monthlyInterest;
    months += 1;
  }

  // Return Loan Summary
  return {
    months,
    interestPaid,
  };
};

const calcSavingsWithAdditionalMonthlyPayment = (
  currentBalance, baseMonthlyPayment, annualInterestRate, interestPaid,
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
      res.months,
      res.interestPaid,
      interestPaid - res.interestPaid,
    ]);
  });

  return savings;
};

const calcSavingsWithLowerInterestRate = (
  currentBalance, baseMonthlyPayment, annualInterestRate, interestPaid,
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
      res.months,
      res.interestPaid,
      interestPaid - res.interestPaid,
    ]);
    threshold -= 0.0025;
  }

  return savings;
};

export const calcLoanSavings = (
  currentBalance, baseMonthlyPayment, annualInterestRate, interestPaid,
) => {
  // console.group('%c CALCULATING SAVINGS DETAILS', 'color: #004D40');
  // console.log(`currentBalance: ${currentBalance}`);
  // console.log(`annualInterestRate: ${annualInterestRate}`);
  // console.log(`interestPaid: ${interestPaid}`);
  // console.groupEnd();

  const additionalMonthlyPayment = calcSavingsWithAdditionalMonthlyPayment(
    currentBalance, baseMonthlyPayment, annualInterestRate, interestPaid,
  );

  const lowerInterestRate = calcSavingsWithLowerInterestRate(
    currentBalance, baseMonthlyPayment, annualInterestRate, interestPaid,
  );

  return {
    additionalMonthlyPayment,
    lowerInterestRate,
  };
};

// Input should be of type 'num' and not a string
export const toCurrencyString = (num) => {
  const significantFigures = (num % 1 === 0) ? 0 : 2;
  return `$ ${num.toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
};

export const toPercentString = (num) => {
  return `${num.toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} %`;
};
