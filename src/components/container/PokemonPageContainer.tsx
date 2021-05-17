import { useParams } from 'react-router-dom'
import { selectPokemon } from '../../redux/slices/pokemon'
import { useAppSelector } from '../../hooks'
import PokemonPage from '../present/pages/PokemonPage'
function PokemonPageContainer () {
  const { id } = useParams<{id:string}>()
  const pokemon = useAppSelector(selectPokemon(Number(id)))
  if (!pokemon) {
    return <p>Error</p>
  }
  return (
      <PokemonPage pokemon={pokemon}/>
  )
}

export default PokemonPageContainer
