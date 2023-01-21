import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('', () => {});

test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
  renderWithRouter(<App />);

  const h2 = screen.getByRole('heading', { level: 2, name: /encountered pokémon/i });
  expect(h2).toBeInTheDocument();
});

test('Testa se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
  renderWithRouter(<App />);

  const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });
  userEvent.click(nextPokemonBtn);
  const charmander = screen.getByText(/charmander/i);
  expect(charmander).toBeInTheDocument();
});

test('Testa se é mostrado apenas um Pokémon por vez', () => {
  renderWithRouter(<App />);

  const firstPokemon = screen.getByText(/pikachu/i);
  const secondPokemon = screen.queryByText(/charmander/i);
  expect(firstPokemon).toBeInTheDocument();
  expect(secondPokemon).not.toBeInTheDocument();
});

test('Testa se a Pokédex tem os botões de filtro', () => {
  renderWithRouter(<App />);

  const btnsTypes = screen.getAllByTestId(/pokemon-type-button/i);
  expect(btnsTypes.length).toBe(7);
  const pokemonTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

  btnsTypes.forEach((element) => {
    const isPokemonInTheList = pokemonTypes.includes(element.innerHTML);
    expect(isPokemonInTheList).toBeTruthy();
  });
});

test('Testa se a partir da seleção de um botão de tipo, a Pokédex circula somente pelos Pokémon daquele tipo', () => {
  renderWithRouter(<App />);

  const fireBtn = screen.getByRole('button', { name: /fire/i });
  userEvent.click(fireBtn);
  const charmander = screen.getByText(/charmander/i);
  expect(charmander).toBeInTheDocument();
  const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });
  userEvent.click(nextPokemonBtn);
  const rapidash = screen.getByText(/rapidash/i);
  expect(rapidash).toBeInTheDocument();
});

test('Testa se o botão All está sempre visível', () => {
  renderWithRouter(<App />);

  const allBtn = screen.getByRole('button', { name: /all/i });
  expect(allBtn).toBeInTheDocument();
});

test('Testa se ao carregar a página, o filtro selecionado deverá ser All', () => {
  renderWithRouter(<App />);

  const fireBtn = screen.getByRole('button', { name: /fire/i });
  userEvent.click(fireBtn);
  const firePokemon = screen.getByText(/charmander/i);
  expect(firePokemon).toBeInTheDocument();
  const allBtn = screen.getByRole('button', { name: /all/i });
  userEvent.click(allBtn);
  const nextPokemon = screen.getByText(/pikachu/i);
  expect(nextPokemon).toBeInTheDocument();
});
