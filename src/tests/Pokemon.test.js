import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste se é renderizado um card com as informações de determinado Pokémon:', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela;', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();
  });

  test('O tipo correto do Pokémon deve ser mostrado na tela;', () => {
    renderWithRouter(<App />);

    const typeOfPokemon = screen.getByTestId('pokemon-type');
    expect(typeOfPokemon).toHaveTextContent('Electric');
  });

  test('O peso médio do Pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do Pokémon e sua unidade de medida;', () => {
    renderWithRouter(<App />);

    const weightOfPokemon = screen.getByText(/average weight: 6\.0 kg/i);
    expect(weightOfPokemon).toBeInTheDocument();
  });

  test('A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do Pokémon.', () => {
    renderWithRouter(<App />);

    const imageOfPokemon = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });

    expect(imageOfPokemon).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon;', () => {
    const { history } = renderWithRouter(<App />);

    const moreDailsLink = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(moreDailsLink);

    const pokemonDetail = screen.getByRole('heading', {
      name: /pikachu details/i,
    });

    expect(pokemonDetail).toBeInTheDocument();

    const { pathname } = history.location;

    expect(pathname).toBe('/pokemon/25');
  });

  it('Testa se existe um ícone de estrela nos Pokémon favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');

    const favoriteCheck = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favoriteCheck);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favoriteLink);

    const star = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(star).toBeInTheDocument();
    expect(star.alt).toBe('Pikachu is marked as favorite');
    expect(star.src).toBe('http://localhost/star-icon.svg');
  });
});
