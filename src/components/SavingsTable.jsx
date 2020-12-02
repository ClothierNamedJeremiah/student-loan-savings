import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';

import SavingsTableRow from './SavingsTableRow';

import {
  toYearMonthString,
  toCurrencyString,
  toPercentString,
} from '../helpers/formatter';

const SavingsTable = (props) => {
  const { loanSavings, tableType } = props;
  const [isLeftArrowVisible, setIsLeftArrowVisible] = useState(false);
  const [isRightArrowVisible, setIsRightArrowVisible] = useState(true);

  const columZeroFormatter = tableType === 'higherMonthlyPayment' ? toCurrencyString : toPercentString;
  const columnZeroSign = tableType === 'higherMonthlyPayment' ? '+' : '-';

  // 0: scroll to left || 1: scroll to right
  const handleClick = (scroll) => {
    const table = document.querySelector('table');
    const scrollDistance = document.querySelector('thead th:not(:first-child)').clientWidth;
    if (scroll === 0) {
      table.scrollBy(-scrollDistance, 0);
    } else {
      table.scrollBy(scrollDistance, 0);
    }
  };

  useEffect(() => {
    const table = document.querySelector('table');
    const isTableScrollable = table.scrollWidth !== table.clientWidth;
    if (!isTableScrollable) {
      setIsLeftArrowVisible(false);
      setIsRightArrowVisible(false);
    }

    table.addEventListener('scroll', (event) => {
      setIsLeftArrowVisible(table.scrollLeft !== 0);
      setIsRightArrowVisible(table.scrollWidth - table.scrollLeft - table.clientWidth > 1);
    });

    window.addEventListener('resize', (event) => {
      if (window.innerWidth <= 725) {
        setIsRightArrowVisible(true);
      } else {
        setIsRightArrowVisible(false);
        setIsLeftArrowVisible(false);
      }
    });
  }, []);

  /* TODO: Update Button */
  return (
    <table>
      <thead>
        <tr>
          <th>
            {!isLeftArrowVisible && !isRightArrowVisible
              ? null
              : (
                <>
                  <button
                    className={isLeftArrowVisible ? 'button-base' : 'button-base visibility--hidden'}
                    type="button"
                    onClick={() => handleClick(0)}
                  >
                    <ArrowBackIosRoundedIcon />
                  </button>
                  <button
                    className={isRightArrowVisible ? 'button-base' : 'button-base visibility--hidden'}
                    type="button"
                    onClick={() => handleClick(1)}
                  >
                    <ArrowForwardIosRoundedIcon />
                  </button>
                </>
              )
            }
          </th>
          <th>Payoff Date</th>
          <th>Time Saved</th>
          <th>Total Interest Paid</th>
          <th>Money Saved</th>
        </tr>
      </thead>
      <tbody>
        {loanSavings.map((row, i) => (
          <SavingsTableRow
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            data={[
              `${columnZeroSign} ${columZeroFormatter(row[0])}`,
              toYearMonthString(row[1]),
              toYearMonthString(row[2]),
              toCurrencyString(row[3], 2, ' '),
              toCurrencyString(row[4], 2, ' '),
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
    'higherMonthlyPayment',
    'lowerInterestRate',
  ]).isRequired,
};

export default SavingsTable;
