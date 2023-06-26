import React, { useState } from 'react';
import InputField from './InputField';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [apiError, setApiError] = useState('');

  const validateEmail = (email) => {
    const reExp = /\S+@\S+\.\S+/;
    return reExp.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
    setApiError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
    setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError('** Email field cannot be empty. **');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('** Please enter a valid email. **');
      return;
    }

    if (password.length < 8) {
      setPasswordError('** Password must be at least 8 characters long.**');
      return;
    }

    try {
      const response = await fetch('https://dummyjson.com/docs/users#add');
      const data = await response.json();

      if (email !== 'existingUser') {
        setApiError('API call failed.');
      }
    } catch (error) {
      setApiError('** API call failed.**');
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className='flex items-center justify-center h-[100vh]'>
      <form onSubmit={handleSubmit}>
        <InputField
          type="email"
          label="Email"
          value={email}
          onChange={handleEmailChange}
          error={emailError}
        />
        <InputField
          type="password"
          label="Password"
          value={password}
          onChange={handlePasswordChange}
          error={passwordError}
        />
        <button type="submit" className='bg-blue-800 px-[30px] rounded-[12px] py-[6px] mt-[10px] font-[700] text-[16px]'>Submit</button>
      </form>
      {apiError && <p className='text-[red] mx-[20px] mt-[40px]'>{apiError}</p>}
    </div>
  );
};

export default LoginForm;
