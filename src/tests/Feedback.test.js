import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Criando teste para pagina de feedback', () => {
  it('Testando elemento na tela feedback', () => {
    renderWithRouterAndRedux(<App />, {}, '/feedback')

    const avatar = screen.getByRole('img', {
      name: /foto\-user/i
    });
    const score = screen.getByText(/score:/i);
    const feedbackText = screen.getByTestId('feedback-text');
    const buttonRanking = screen.getByRole('button', {
      name: /ranking/i
    });
    const scoreFeedback = screen.getByTestId('feedback-total-score');
    const assertions = screen.getByTestId('feedback-total-question');
    const buttonPlayAgain = screen.getByRole('button', {
      name: /play again/i
    });

    expect(avatar).toBeInTheDocument();
    expect(score).toBeInTheDocument();
    expect(feedbackText).toBeInTheDocument();
    expect(buttonRanking).toBeInTheDocument();
    expect(scoreFeedback).toBeInTheDocument();
    expect(assertions).toBeInTheDocument();
    expect(buttonPlayAgain).toBeInTheDocument();
  })
  it('Testando button PlayAgain', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback')
    const buttonPlayAgain = screen.getByRole('button', {
      name: /play again/i
    });
    expect(buttonPlayAgain).toBeInTheDocument();

    userEvent.click(buttonPlayAgain);

  })
  it('Testando button PlayAgain', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback')
    const buttonRanking = screen.getByRole('button', {
      name: /ranking/i
    });
    expect(buttonRanking).toBeInTheDocument();
    userEvent.click(buttonRanking);
    expect(history.location.pathname).toBe('/ranking')

  })
})