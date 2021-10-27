// To parse this data:
//
//   import { Convert, PokemonResponse } from "./file";
//
//   const pokemonResponse = Convert.toPokemonResponse(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface PokemonResponse {
  count: number
  next: string
  previous: null
  results: Result[]
}

export interface Result {
  name: string
  url: string
}
