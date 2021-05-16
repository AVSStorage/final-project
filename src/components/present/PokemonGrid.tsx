import { Fragment } from 'react'
import { Pokemon } from '../../features/pokemons/pokemon'
import PokemonComponent from './PokemonComponent'

function PokemonGrid({pokemons, isFetching} : { pokemons: Pokemon[], isFetching: boolean}) {
  
    return <>

    <div className={"grid__auto"}>{
            pokemons.map(function (pokemon: Pokemon) {
    
                return (<Fragment>
                    <PokemonComponent isFetching={isFetching} key={pokemon.id} pokemon={pokemon} />
                </Fragment>)
            })
        }</div>
            {isFetching && 'Fetching more list items...'}
        
        </>
    
}

export default PokemonGrid