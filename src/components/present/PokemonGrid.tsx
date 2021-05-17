import { useMemo } from 'react'
import { IPokemons, Pokemon } from '../../redux/slices/pokemon'
import PokemonComponent from './PokemonComponent'

interface IPokemnoGrid extends IPokemons {
  isFetching: boolean
}

function PokemonGrid ({ pokemons, isFetching } : IPokemnoGrid) {
  const FetchComponent = useMemo(() => isFetching && (<p>Fetching more list items...</p>), [isFetching])
  return <>

    <div className={'grid__auto'}>{
            pokemons.map(function (pokemon: Pokemon) {
              return (
                  <PokemonComponent isFetching={isFetching} key={pokemon.id} pokemon={pokemon} />
              )
            })
        }</div>
            <div className="loading d-flex-column-x-center">
            {FetchComponent}
            </div>

        </>
}

export default PokemonGrid
