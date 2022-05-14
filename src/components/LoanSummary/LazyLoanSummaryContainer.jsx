import { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';

const LoanSummaryContainer = lazy(() => import('./LoanSummaryContainer'));

const LazyLoanSummaryContainer = (props) => (
  <Suspense fallback={<div />}>
    <LoanSummaryContainer {...props} />
  </Suspense>
);

LazyLoanSummaryContainer.propTypes = {
  loanDetails: PropTypes.shape({
    monthsTillPayoffDate: PropTypes.number.isRequired,
    totalInterestPaid: PropTypes.number.isRequired,
  }).isRequired,
};

export default LazyLoanSummaryContainer;
