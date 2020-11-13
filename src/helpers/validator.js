export const isValidCurrency = (val) => {
  if (val === '') return true;
  const re = /^([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(\.([0-9][0-9]?)?)?$/m;
  return re.test(val);
};

export const isValidPercent = (val, max = 35) => {
  if (val === '') return true;
  const re = /^([0-9]{1,2})?(\.([0-9]{0,2})?)?$/m;
  return re.test(val) && Math.floor(val) < max;
};
