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
  const { savingsData, tableType } = props;
  const columZeroFormatter = tableType === 'additionalMonthlyPayment' ? toCurrencyString : toPercentString;
  return (
    <div id="table-wrapper">
      <table>
        <thead>
          <tr>
            {TABLE_HEADERS.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {savingsData.map((row, i) => (
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
    </div>
  );
};

SavingsTable.propTypes = {
  savingsData: PropTypes.arrayOf(PropTypes.array).isRequired,
  tableType: PropTypes.oneOf([
    'additionalMonthlyPayment',
    'lowerInterestRate',
  ]).isRequired,
};

export default SavingsTable;
