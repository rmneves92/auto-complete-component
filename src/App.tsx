import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { AutoComplete } from './components/AutoComplete/AutoComplete';
import { Pokemon, PokemonResponse, PokemonResults } from './types';

const TOTAL = 50;

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  useEffect(() => {
    getPokemons();
  }, []);

  const extractIdFromUrl = (url: string): number => {
    const idMatch = url.match(/\/pokemon\/(\d+)/)?.[1];
    const id = idMatch ? parseInt(idMatch, 10) : -1;
    return id;
  };

  const getPokemons = useCallback(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL}`)
      .then((res) => res.json())
      .then((data: PokemonResponse) => {
        const pokemons: Pokemon[] = data.results.map((pokemon: PokemonResults) => {
          return {
            name: pokemon.name,
            id: extractIdFromUrl(pokemon.url),
          };
        });

        setPokemons(pokemons);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <AutoComplete list={pokemons} />
    </div>
  );
}

export default App;
