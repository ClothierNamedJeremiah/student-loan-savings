const toYearMonthString = (months) => {
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

export default toYearMonthString;
