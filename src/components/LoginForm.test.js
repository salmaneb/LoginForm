import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('displays error message when email field is empty', () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Email field cannot be empty.')).toBeInTheDocument();
  });

  it('displays error message when email is not a valid email', () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'invalidEmail' } });
    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Please enter a valid email.')).toBeInTheDocument();
  });

  it('displays error message when password field is less than 8 characters', () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'pass' } });
    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Password must be at least 8 characters long.')).toBeInTheDocument();
  });

  it('displays API call failed message when API call fails', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('API call failed.'));
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'existingUser' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Submit'));

    const errorMessage = await screen.findByText('API call failed.');
    expect(errorMessage).toBeInTheDocument();
  });

  it('displays API call failed message when email is not "existingUser"', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({}) });
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'nonExistingUser' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Submit'));

    const errorMessage = await screen.findByText('API call failed.');
    expect(errorMessage).toBeInTheDocument();
  });

  it('does not display any error messages when valid data is submitted', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({}) });
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'existingUser' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Submit'));

    const emailError = screen.queryByText('Please enter a valid email.');
    const passwordError = screen.queryByText('Password must be at least 8 characters long.');
    const apiError = screen.queryByText('API call failed.');
    expect(emailError).toBeNull();
    expect(passwordError).toBeNull();
    expect(apiError).toBeNull();
  });
});
