import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { act } from 'react-dom/test-utils';

it('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
  const { history } = renderWithRouter(<App />);

  const homeLink = screen.getByRole('link', { name: 'Home' });
  expect(homeLink).toBeInTheDocument();
  userEvent.click(homeLink);

  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

it('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação;', () => {
  const { history } = renderWithRouter(<App />);

  const aboutLink = screen.getByRole('link', { name: 'About' });
  expect(aboutLink).toBeInTheDocument();
  userEvent.click(aboutLink);

  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

it('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação;', () => {
  const { history } = renderWithRouter(<App />);

  const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
  expect(favoriteLink).toBeInTheDocument();
  userEvent.click(favoriteLink);

  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
  const { history } = renderWithRouter(<App />);

  act(() => history.push('/urlaleatoria'));
  const errorMsg = screen.getByText('Page requested not found');
  expect(errorMsg).toBeInTheDocument();
});
