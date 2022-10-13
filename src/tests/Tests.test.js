import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

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
      const correctAnswer = screen.getByTestId('correct-answer');
      const incorrectAnswer = screen.getAllByTestId(/wrong-answer/i);
      const score = screen.getByTestId('header-score');


      expect(correctAnswer).toBeInTheDocument();
      expect(incorrectAnswer[0]).toBeInTheDocument();
      expect(category).toBeInTheDocument();
      expect(question).toBeInTheDocument();
      expect(timer).toBeInTheDocument();
      expect(score).toBeInTheDocument();
    }, {timeout: 10000})
    await screen.findByTestId("btn-next", {}, {timeout: 45000});
    
    const incorrectAnswer = screen.getAllByTestId(/wrong-answer/i);
    for(let i = 0; i < 4; i += 1){
      userEvent.click(screen.getByTestId('correct-answer'));
      expect(screen.getByTestId('correct-answer')).toBeDisabled();
      const btnNext = screen.getByTestId('btn-next');
      userEvent.click(btnNext);
      userEvent.click(incorrectAnswer[0])
    }

  })
})