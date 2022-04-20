import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import {render} from '@testing-library/react';
import CreateAccountForm from '../../src/components/CreateAccountForm';
import {UserContext} from '../App.js';

test('renders CreateAccountForm component', () => {
    const component = render(
        <CreateAccountForm />
    );
    expect(component.container).toHaveTextContent('Create Account');
});

test('renders CreateAccountForm component with user context', () => {
    const component = render(
        <UserContext.Provider value={{user: {username: 'test'}}}>
            <CreateAccountForm />
        </UserContext.Provider>
    );
    expect(component.container).toHaveTextContent('Create Account');
});

test('user see error message when no input is provided at username', () => {
    const component = render(<CreateAccountForm />);
    const usernameInput = component.getByTestId('username-input');
    usernameInput.focus();
    usernameInput.blur();
    expect(component.container).toHaveTextContent('Please enter a username.');
});

test('user see error message when username is less than 3 characters', () => {
    const component = render(<CreateAccountForm />);
    const usernameInput = component.getByTestId('username-input');
    usernameInput.focus();
    usernameInput.value = 'ab';
    usernameInput.blur();
    expect(component.container).toHaveTextContent('Username must be at least 3 characters.');
});

test('user see error message when no input is provided at email', () => {
    const component = render(<CreateAccountForm />);
    const emailInput = component.getByTestId('email-input');
    emailInput.focus();
    emailInput.blur();
    expect(component.container).toHaveTextContent('Please enter an email.');
});

test('user see error if invalid email is provided', () => {
    const component = render(<CreateAccountForm />);
    const emailInput = component.getByTestId('email-input');
    emailInput.focus();
    emailInput.value = 'test';
    emailInput.blur();
    expect(component.container).toHaveTextContent('Please enter a valid email.');
});

test('user see error message when no input is provided at password', () => {
    const component = render(<CreateAccountForm />);
    const passwordInput = component.getByTestId('password-input');
    passwordInput.focus();
    passwordInput.blur();
    expect(component.container).toHaveTextContent('Please enter a password.');
});

test('create account button not available if fields are empty', () => {
    const component = render(<CreateAccountForm />);
    const createAccountButton = component.getByTestId('create-account-button');
    expect(createAccountButton).toBeDisabled();
});
