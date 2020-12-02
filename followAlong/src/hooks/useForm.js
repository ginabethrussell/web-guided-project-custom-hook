import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue]  = useState(()=>{
        if (localStorage.getItem(key)) {
            return JSON.parse(localStorage.getItem(key));
        } else {
            localStorage.setItem(key, JSON.stringify(initialValue));
            return initialValue;
        }
    });

    const setValue = value => {
        setStoredValue(value);
        localStorage.setItem(key, value);
    }

    return [storedValue, setValue];
}

const useForm = (formFields)=> {
    const [values, setValues] = useLocalStorage('form', formFields);
  
    const handleChanges = e => {
      setValues({
        ...values,
        [e.target.name]: e.target.value
      });
    };
  
    const clearForm = e => {
      e.preventDefault();
      setValues(formFields);
    };
  
    return [values, handleChanges, clearForm];
  }

  export default useForm;