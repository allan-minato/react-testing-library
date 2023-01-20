import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

test('Teste se a página contém as informações sobre a Pokédex;', () => {
  renderWithRouter(<About />);

  const h2 = screen.getByRole('heading', { name: 'About Pokédex' });
  expect(h2).toBeInTheDocument();
});

test('Teste se a página contém dois parágrafos com texto sobre a Pokédex;', () => {
  renderWithRouter(<About />);

  const paragraph = screen.getByText(
    /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
  );

  const paragraph2 = screen.getByText(
    /one can filter pokémon by type, and see more details for each one of them/i,
  );

  expect(paragraph).toBeInTheDocument();
  expect(paragraph2).toBeInTheDocument();
});

test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
  renderWithRouter(<About />);

  const img = screen.getByAltText('Pokédex');
  expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
