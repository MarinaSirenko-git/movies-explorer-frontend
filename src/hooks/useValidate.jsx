import { useState, useCallback, useEffect } from 'react';
import { NAME_REGEX, EMAIL_REGEX } from '../utils/consts';

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
          setNameError('Поле не может быть пустым');
        } else if (value.length === 1 || value.length > 30 || !NAME_REGEX.test(value)) {
          setNameError(
            'Имя может содержать латиницу, кириллицу, пробел и дефис, должно быть от 2-х и до 30 символов'
          );
        } else {
          setNameError('');
        }
        break;
      case 'email':
        if (value === '') {
          setEmailError('Поле не может быть пустым');
        } else if (!EMAIL_REGEX.test(value)) {
          setEmailError('Неверно указан email');
        } else {
          setEmailError('');
        }
        break;
      case 'password':
        if (value === '') {
          setPasswordError('Поле не может быть пустым');
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
