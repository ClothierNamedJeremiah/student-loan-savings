import React from 'react';
import PropTypes from 'prop-types';

import SavingsTableRow from './SavingsTableRow';

import {
  toYearMonthString,
  toCurrencyString,
  toPercentString,
} from '../helpers/formatter';

const TABLE_HEADERS = [
  '',
  'New Payoff Date',
  'Total Interest Paid',
  'Money Saved',
];

const SavingsTable = (props) => {
  const { loanSavings, tableType } = props;
  const columZeroFormatter = tableType === 'additionalMonthlyPayment' ? toCurrencyString : toPercentString;
  return (
    <table>
      <thead>
        <tr>
          {TABLE_HEADERS.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {loanSavings.map((row, i) => (
          <SavingsTableRow
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            data={[
              columZeroFormatter(row[0]),
              toYearMonthString(row[1]),
              toCurrencyString(row[2]),
              toCurrencyString(row[3]),
            ]}
          />
        ))}
      </tbody>
    </table>
  );
};

SavingsTable.propTypes = {
  loanSavings: PropTypes.arrayOf(PropTypes.array).isRequired,
  tableType: PropTypes.oneOf([
    'additionalMonthlyPayment',
    'lowerInterestRate',
  ]).isRequired,
};

export default SavingsTable;
