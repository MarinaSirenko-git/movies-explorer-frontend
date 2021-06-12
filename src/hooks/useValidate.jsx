import { useState, useCallback, useEffect } from 'react';
import {
  NAME_REGEX,
  EMAIL_REGEX,
  NOEMPTY_TEXT,
  INVALID_EMAIL_TEXT,
  INVALID_NAME_TEXT,
} from '../utils/consts';

function useFormWithValidation(initial) {
  const [data, setData] = useState(initial);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (
      nameError ||
      emailError ||
      passwordError ||
      data.name === '' ||
      data.email === '' ||
      data.password === ''
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [data, emailError, nameError, passwordError]);

  const handleChange = (event) => {
    const { value } = event.target;
    const { name } = event.target;
    setData((state) => ({
      ...state,
      [name]: value,
    }));
    switch (name) {
      case 'name':
        if (value === '') {
          setNameError(NOEMPTY_TEXT);
        } else if (value.length === 1 || value.length > 30 || !NAME_REGEX.test(value)) {
          setNameError(INVALID_NAME_TEXT);
        } else {
          setNameError('');
        }
        break;
      case 'email':
        if (value === '') {
          setEmailError(NOEMPTY_TEXT);
        } else if (!EMAIL_REGEX.test(value)) {
          setEmailError(INVALID_EMAIL_TEXT);
        } else {
          setEmailError('');
        }
        break;
      case 'password':
        if (value === '') {
          setPasswordError(NOEMPTY_TEXT);
        } else {
          setPasswordError('');
        }
        break;
      default:
        setNameError('');
        setEmailError('');
        setPasswordError('');
    }
  };

  const resetForm = useCallback(
    (newValue = initial, newIsValid = false) => {
      setData(newValue);
      setIsValid(newIsValid);
    },
    [initial, setData, setIsValid]
  );

  return { data, handleChange, nameError, emailError, passwordError, isValid, resetForm };
}

export default useFormWithValidation;
