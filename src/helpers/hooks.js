/* eslint-disable import/prefer-default-export */

import { useEffect, useState } from 'react';

export const useFormValidator = (validator, value, errorMsgToDisplay) => {
  const [visibleErrorMsg, setVisibleErrorMsg] = useState('');

  useEffect(() => {
    if (!validator(value)) {
      setVisibleErrorMsg(errorMsgToDisplay);
    } else {
      setVisibleErrorMsg('');
    }
  }, [value]);

  return visibleErrorMsg;
};
