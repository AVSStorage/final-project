import  {useParams} from 'react-router-dom'
import { Pokemon, selectPokemon } from '../../features/pokemons/pokemon'
import { useAppSelector } from '../../hooks'
import PokemonPage from '../present/PokemonPage'
function PokemonPageContainer() {
    const {id} = useParams<{id:string}>()
    const pokemon = useAppSelector<Pokemon | undefined>(selectPokemon(Number(id)))
    if (!pokemon) {
        return <p>Error</p>
    }
    return (
      <PokemonPage pokemon={pokemon}/>
    )
}

export default PokemonPageContainer