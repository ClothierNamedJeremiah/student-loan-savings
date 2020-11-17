/* eslint-disable import/prefer-default-export */

import { useEffect, useState } from 'react';

export const useDelayedFormValidator = (validator, value, errorMsgToDisplay) => {
  const [visibleErrorMsg, setVisibleErrorMsg] = useState('');

  useEffect(() => {
    if (!validator(value)) {
      setTimeout(() => setVisibleErrorMsg(errorMsgToDisplay), 800);
    } else {
      setTimeout(() => setVisibleErrorMsg(''), 800);
    }
  }, [value]);

  return visibleErrorMsg;
};
