import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Criando testes aleatorios', () => {
  jest.setTimeout(50000)
  it('Teste 01', async () => {
    const { history } = renderWithRouterAndRedux(<App />)

    const inputName = screen.getByRole('textbox', { name: /nome/i });
    const inputEmail = screen.getByRole('textbox', { name: /gravatar email/i });
    const buttonPlay = screen.getByRole('button', {  name: /play/i});

    userEvent.type(inputName, 'Daniel');
    userEvent.type(inputEmail, 'test@gmail.com');
    userEvent.click(buttonPlay);

    await waitFor(() => {
      const category = screen.getByTestId('question-category');
      const question = screen.getByTestId('question-text');
      const timer = screen.getByTestId('timer');
      const incorrectAnswers = screen.getAllByTestId(/wrong-answer/i);
      const score = screen.getByTestId('header-score');

      incorrectAnswers.type === /multiple/i && expect(incorrectAnswers).toHaveLength(3);
      incorrectAnswers.type === /boolean/i && expect(incorrectAnswers).toHaveLength(1);
      expect(category).toBeInTheDocument();
      expect(question).toBeInTheDocument();
      expect(timer).toBeInTheDocument();
      expect(score).toBeInTheDocument();
    }, {timeout: 30000})

    await screen.findByTestId("btn-next", {}, {timeout: 45000});
    
    for(let i = 0; i < 3; i += 1){
      const incorrectAnswer = screen.getAllByTestId(/wrong-answer/i);
      
      expect(incorrectAnswer[i]).toBeInTheDocument();

      userEvent.click(incorrectAnswer[i]);
      const btnNext = screen.getByTestId('btn-next');
      
      expect(incorrectAnswer[i]).toBeDisabled();
      expect(btnNext).toBeInTheDocument();
      
      userEvent.click(btnNext);
    }
    
    
  })
})
