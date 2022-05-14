import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';

const Savings = lazy(() => import('./Savings'));

const LazySavings = (props) => (
  <Suspense fallback={<div />}>
    <Savings {...props} />
  </Suspense>
);

LazySavings.propTypes = {
  loanSavings: PropTypes.shape({
    higherMonthlyPayment: PropTypes.arrayOf(PropTypes.array).isRequired,
    lowerInterestRate: PropTypes.arrayOf(PropTypes.array).isRequired,
  }).isRequired,
};

export default LazySavings;
