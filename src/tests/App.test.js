import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Criando Testes para Tela de Login', () => {
  it('Testando inputs e button play', () => {
    renderWithRouterAndRedux(<App />)
    
    const inputName = screen.getByRole('textbox', {
      name: /nome/i
    });
    const inputEmail = screen.getByRole('textbox', {
      name: /gravatar email/i
    });
    const buttonPlay = screen.getByRole('button', {  name: /play/i});
    const buttonSettings = screen.getByRole('button', {
      name: /settings/i
    });

    expect(buttonPlay).toHaveProperty('disabled', true)

    expect(buttonSettings).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(buttonPlay).toBeInTheDocument();

    userEvent.type(inputName, 'Thiago');
    userEvent.type(inputEmail, 'test@test.com');

    expect(inputName.value).toBe('Thiago')
    expect(inputEmail.value).toBe('test@test.com')

    expect(buttonPlay).toHaveProperty('disabled', false)
  })
  it('Testando button play', async () => {
    const { history } = renderWithRouterAndRedux(<App />)
    const inputName = screen.getByRole('textbox', {
      name: /nome/i
    });
    const inputEmail = screen.getByRole('textbox', {
      name: /gravatar email/i
    });
    const buttonPlay = screen.getByRole('button', {  name: /play/i});

    userEvent.type(inputName, 'Daniel');
    userEvent.type(inputEmail, 'test@gmail.com');

    userEvent.click(buttonPlay)

  })
})