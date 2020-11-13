/* eslint-disable import/prefer-default-export */

import { useEffect } from 'react';

export const useDelayedFormValidator = (validator, value, errorMsg, setErrorMsg) => {
  useEffect(() => {
    if (!validator(value)) {
      setTimeout(() => setErrorMsg(errorMsg), 800);
    } else {
      setTimeout(() => setErrorMsg(''), 800);
    }
  }, [value]);
};
