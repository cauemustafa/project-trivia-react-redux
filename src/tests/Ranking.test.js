import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Criando Testes de forma BRUTA na UNHA!
const player = {
  name: 'Thiago',
  assertions: 3,
  score: 39,
  gravatarEmail: 'programadorthiagolopes@gmail.com',
  token: '446fb0f23e50b9c923f31edc81fa63ccfee9cd52d87a9ee8c65b97a692916901',
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

describe('Criando teste tela ranking', () => {
  it('Testando a tela ranking desde o inicio do game', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { player }, '/feedback')
    expect(history.location.pathname).toBe('/feedback')

    const buttonRanking = screen.getByRole('button', {
      name: /ranking/i
    });
    expect(buttonRanking).toBeInTheDocument()
    userEvent.click(buttonRanking)

    const titleRanking = screen.getByTestId('ranking-title');
    const profilePicture = screen.getAllByTestId('player-profile-picture');
    const nameUser = screen.getAllByText('Thiago');
    const score = screen.getAllByTestId('player-score-0');

    expect(titleRanking).toBeInTheDocument();
    expect(profilePicture[0]).toBeInTheDocument();
    expect(nameUser[0]).toBeInTheDocument();
    expect(score[0]).toBeInTheDocument();

    const buttonPlayAgain = screen.getByTestId('btn-go-home');
    userEvent.click(buttonPlayAgain);
  })
})