import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { pokemonApi } from '../../api'

export type Pokemon = {
  name: string,
  id: number,
  isCatched?: boolean,
  catchDate?: string | null
}

export interface IPokemon {
  pokemon: Pokemon
}

export interface IPokemons {
  pokemons: Pokemon[]
}

export const fetchPokemonsPerLimit = createAsyncThunk<{pokemons: Pokemon[], page:number}, { page: number, limit: number }, {

  rejectValue: string
}>(
  'pokemons/fetchPokemonsPerLimit',
  async ({ page, limit }, thunkApi) => {
    try {
      const response = await pokemonApi.fetchPokemonPerLimit(limit, page)
      return { pokemons: (response.data) as Pokemon[], page }
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  }
)

export const updateComponent = createAsyncThunk<Pokemon, Pokemon, {
  rejectValue: string
}>(
  'pokemons/catchPokemon',
  async (pokemon, thunkApi) => {
    try {
      const response = await pokemonApi.updatePokemon(pokemon)
      return (response.data) as Pokemon
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  }
)

interface initialStateInterface {
  items: Pokemon[],
  error: string | undefined,
  loading: boolean,
  page: number
}
// Define the initial state using that type
const initialState: initialStateInterface = {
  items: [],
  loading: true,
  page: 1,
  error: ''
}

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonsPerLimit.fulfilled, (state, action) => {
      return { ...state, items: state.items.concat(action.payload.pokemons), loading: false, page: action.payload.page }
    })
      .addCase(fetchPokemonsPerLimit.rejected, (state, action) => {
        state.error = action.payload
      })
      .addCase(updateComponent.rejected, (state, action) => {
        state.error = action.payload
      })
      .addCase(updateComponent.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id)
        state.items.splice(index, 1, action.payload)
      })
  }
})

export const selectPokemons = (state: RootState) => state.pokemons.items
export const selectCatchedPokemons = (state: RootState) => state.pokemons.items.filter((item: Pokemon) => item.isCatched)
export const paginateSelectedPokemons = (page : number, limit: number) => (state: RootState) => {
  const catched = selectCatchedPokemons(state)
  if (page * limit >= catched.length) {
    return catched
  }
  return catched.slice(0, catched.length - page * limit)
}
export const selectState = (state: RootState) => state.pokemons
export const selectPokemon = (id: number) => (state: RootState): (Pokemon | undefined) => state.pokemons.items.find((item: Pokemon) => item.id === id)
export default pokemonsSlice.reducer
