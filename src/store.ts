import { configureStore } from '@reduxjs/toolkit'
import pokemonsReducer from './features/pokemons/pokemon'


const persistedState = localStorage.getItem('reduxState') 
                       ? JSON.parse(localStorage.getItem('reduxState') as string)
                       : {}


const store = configureStore({
  preloadedState: persistedState,
  reducer: {
    pokemons: pokemonsReducer
  }
})

store.subscribe(()=>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store