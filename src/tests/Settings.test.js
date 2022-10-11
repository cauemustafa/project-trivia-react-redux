import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Criando Testes pagina Settings', () => {
  it('Testando elementos na pagina Settings', async () => {
    const { history } = renderWithRouterAndRedux(<App />)

    const loginSettings = screen.getByRole('button', { name: /Settings/i })

    userEvent.click(loginSettings)

    expect(history.location.pathname).toBe('/settings')

    
    const settings = screen.getByRole('heading', { name: /settings/i });
    const goHome = screen.getByRole('button', {name: /Go home/i})
    
    expect(settings).toBeInTheDocument();
    expect(goHome).toBeInTheDocument();
    
    userEvent.click(goHome)

    expect(history.location.pathname).toBe('/')
});
});
