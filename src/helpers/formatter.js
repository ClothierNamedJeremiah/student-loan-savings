export const toYearMonthString = (months) => {
  if (months === 0) {
    return '0 months';
  }
  const years = Math.floor(months / 12);
  const monthsRem = months % 12;

  let yearsText = '';
  if (years === 1) {
    yearsText = `${years} year`;
  } else if (years > 1) {
    yearsText = `${years} years`;
  }

  let monthsInYearText = '';
  if (monthsRem === 1) {
    monthsInYearText = `${monthsRem} month`;
  } else if (monthsRem > 1) {
    monthsInYearText = `${monthsRem} months`;
  }

  if (yearsText !== '' && monthsInYearText !== '') {
    return `${yearsText} and ${monthsInYearText}`;
  }
  return `${yearsText} ${monthsInYearText}`;
};

export const toCurrencyString = (num, decimalPlaces = 0) => {
  const re = /(\d)(?=(\d{3})+(?!\d))/g;
  return `$ ${num.toFixed(decimalPlaces).replace(re, '$1,')}`;
};

export const toPercentString = (num) => {
  const re = /(\d)(?=(\d{3})+(?!\d))/g;
  return `${num.toFixed(2).replace(re, '$1,')} %`;
};
