import { configureStore } from '@reduxjs/toolkit'
import pokemonsReducer from './redux/slices/pokemon'

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState') as string)
  : {}

const store = configureStore({
  preloadedState: persistedState,
  reducer: {
    pokemons: pokemonsReducer
  }
})

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
