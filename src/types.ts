export interface Pokemon {
  name: string;
  id: number;
}

export interface PokemonResponse {
  results: PokemonResults[];
}

export interface PokemonResults {
  name: string;
  url: string;
}
