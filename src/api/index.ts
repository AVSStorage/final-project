import axios from 'axios'
import { Pokemon } from '../redux/slices/pokemon'
const API_URL = 'http://localhost:3001/pokemons'

export const pokemonApi = {
  fetchPokemon: axios.get(API_URL, {
    responseType: 'json'
  }),
  fetchPokemonPerLimit: (limit: number, page: number) =>
    axios.get(`${API_URL}?_page=${page}&_limit=${limit}`, {
      responseType: 'json'
    }),
  updatePokemon: (pokemon: Pokemon) => axios.put(`${API_URL}/${pokemon.id}`, pokemon, {
    responseType: 'json'
  })
}
