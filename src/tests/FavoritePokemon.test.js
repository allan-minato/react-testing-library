import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';
import App from '../App';

test('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos;', () => {
  renderWithRouter(<FavoritePokemon />);

  const pokemonNotFound = screen.getByText(/no favorite pokémon found/i);

  expect(pokemonNotFound).toBeInTheDocument();
});

test('Teste se apenas são exibidos os Pokémon favoritados.', () => {
  renderWithRouter(<App />);

  const moreDetails = screen.getByRole('link', {
    name: /more details/i,
  });
  userEvent.click(moreDetails);
  const checkBox = screen.getByRole('checkbox', {
    name: /pokémon favoritado\?/i,
  });
  userEvent.click(checkBox);
  const favoritePokemon = screen.getByRole('link', {
    name: /favorite pokémon/i,
  });
  userEvent.click(favoritePokemon);
  const pokemon = screen.getByText(/pikachu/i);
  expect(pokemon).toBeInTheDocument();
});
