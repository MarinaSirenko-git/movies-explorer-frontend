import { useState, useCallback } from 'react';

function useFormWithValidation(initial) {
  const [inputValue, setInputValue] = useState(initial);
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const onChange = (event) => {
    const { value } = event.target;
    const { name } = event.target;
    setInputValue(value);
    switch (name) {
      case 'name':
        if (value.length < 2 || value.length > 30) {
          setError('Имя должно быть не меньше 2-х и не больше 30 символов');
        } else {
          setError(null);
        }
        break;
      case 'email':
        if (value.length < 2 || value.length > 30) {
          setError('Имя должно быть не меньше 2-х и не больше 30 символов');
        } else {
          setError(null);
        }
        break;
      case 'password':
        if (value.length < 6) {
          setError('Пароль должен содержать не менее 6 символов');
        } else {
          setError(null);
        }
        break;
      default:
        setError(null);
    }
    return value;
  };

  const resetForm = useCallback(
    (newValue = initial, newError = null, newIsValid = false) => {
      setInputValue(newValue);
      setError(newError);
      setIsValid(newIsValid);
    },
    [initial, setInputValue, setError, setIsValid]
  );

  return { inputValue, onChange, error, isValid, resetForm };
}

export default useFormWithValidation;
