import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { waitFor } from '@testing-library/react';
import App from '../App';

const player = {
  name: 'Thiago',
  assertions: 0,
  score: 0,
  gravatarEmail: 'programadorthiagolopes@gmail.com',
  token: 'INVALID',
  isFetching: false,
  error: false,
  hash: '69f86ab77df5277b81c15ef290e8f8b8',
  response: 3,
  questions: [],
}

describe('Criando testes para localStorage', () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
        removeItem: jest.fn(() => null)
      },
    });
  });

  jest.setTimeout(25000)
  it('Testando localStorage', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {player}, '/game');
    expect(window.localStorage.removeItem).toHaveBeenCalledTimes(0);
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.getItem).toHaveBeenCalledWith('token');

    await waitFor(() => {
      expect(window.localStorage.removeItem).toHaveBeenCalledTimes(1);
      expect(history.location.pathname).toBe('/')
    }, {timeout: 10000})
  })
})
