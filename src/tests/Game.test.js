import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { findByTestId, getByTestId, queryAllByTestId, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const player = {
  name: 'Thiago',
  assertions: 3,
  score: 39,
  gravatarEmail: 'programadorthiagolopes@gmail.com',
  token: '7cc52ef7b41c4d60cb555b03e22ba278e201da6ae3ddb5536653808cee1739b8',
  isFetching: false,
  error: false,
  hash: '69f86ab77df5277b81c15ef290e8f8b8',
  response: 0,
  questions: [
    {
      category: 'Vehicles',
      type: 'multiple',
      difficulty: 'medium',
      question: 'What do the 4 Rings in Audi&#039;s Logo represent?',
      correct_answer: 'Previously independent automobile manufacturers',
      incorrect_answers: [
        'States in which Audi makes the most sales',
        'Main cities vital to Audi',
        'Countries in which Audi makes the most sales'
      ]
    },
    {
      category: 'General Knowledge',
      type: 'boolean',
      difficulty: 'easy',
      question: 'One of Donald Trump&#039;s 2016 Presidential Campaign promises was to build a border wall between the United States and Mexico.',
      correct_answer: 'True',
      incorrect_answers: [
        'False'
      ]
    },
    {
      category: 'Science & Nature',
      type: 'boolean',
      difficulty: 'medium',
      question: 'Sugar contains fat.',
      correct_answer: 'False',
      incorrect_answers: [
        'True'
      ]
    },
    {
      category: 'Entertainment: Japanese Anime & Manga',
      type: 'multiple',
      difficulty: 'hard',
      question: 'Which person from &quot;JoJo&#039;s Bizarre Adventure&quot; does NOT house a reference to a band, artist, or song earlier than 1980?',
      correct_answer: 'Giorno Giovanna',
      incorrect_answers: [
        'Josuke Higashikata',
        'Jolyne Cujoh',
        'Johnny Joestar'
      ]
    },
    {
      category: 'Entertainment: Film',
      type: 'multiple',
      difficulty: 'medium',
      question: 'In Mulan (1998), who is the leader of the Huns?',
      correct_answer: 'Shan Yu',
      incorrect_answers: [
        'Chien-Po',
        'Li Shang',
        'Fa Zhou'
      ]
    }
  ],
  ranking: [
    {
      name: 'Thiago',
      hash: '69f86ab77df5277b81c15ef290e8f8b8',
      score: 137
    },
  ]
}

describe('Criando Testes pagina Game', () => {
  it('Testando elementos na pagina game', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { player }, '/game')
    await waitFor(() => {
      const category = screen.getByTestId('question-category');
      const question = screen.getByTestId('question-text');
      const timer = screen.getByTestId('timer');
      const correctAnswer = screen.getByTestId('correct-answer');
      const incorrectAnswer = screen.getByTestId('wrong-answer-1');
      expect(correctAnswer).toBeInTheDocument();
      expect(incorrectAnswer).toBeInTheDocument();
      expect(category).toBeInTheDocument();
      expect(question).toBeInTheDocument();
      expect(timer).toBeInTheDocument();

      userEvent.click(correctAnswer);

      const btnNext = screen.getByTestId('btn-next')
      expect(btnNext).toBeInTheDocument();
      userEvent.click(btnNext)
      const score = screen.getByTestId('header-score');
      expect(score).toBeInTheDocument();
    })


  })
})