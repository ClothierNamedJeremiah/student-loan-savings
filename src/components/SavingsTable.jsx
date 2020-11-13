import React from 'react';
import PropTypes from 'prop-types';

import SavingsTableRow from './SavingsTableRow';

import {
  toYearMonthString,
  toCurrencyString,
  toPercentString,
} from '../helpers/formatter';

const TABLE_COLUMN_HEADERS = {
  additionalMonthlyPayment: [
    '',
    'New Payoff Date',
    'Total Interest Paid',
    'Money Saved',
  ],
  lowerInterestRate: [
    '',
    'New Payoff Date',
    'Total Interest Paid',
    'Money Saved',
  ],
};

const SavingsTable = (props) => {
  const { savingsData, index } = props;
  const columns = TABLE_COLUMN_HEADERS[index];
  const columZeroFormatter = index === 'additionalMonthlyPayment' ? toCurrencyString : toPercentString;
  return (
    <div id="table-wrapper">
      <table>
        <thead>
          <tr>
            {columns.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {savingsData.map((row) => (
            <SavingsTableRow
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
    </div>
  );
};

SavingsTable.propTypes = {
  savingsData: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default SavingsTable;