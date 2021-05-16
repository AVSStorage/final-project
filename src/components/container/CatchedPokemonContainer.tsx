import PokemonGrid from '../present/PokemonGrid'
import { useAppSelector } from '../../hooks';
import {paginateSelectedPokemons} from '../../features/pokemons/pokemon'
import { useCallback, useState } from 'react'
import  useInfiniteScroll from '../../hooks/useInfiniteScroll'
function CatchedPokemonContainer() {
    const [page, setPage] = useState(1)
   
    const itemsPerPage = 10;
    const pokemons = useAppSelector(paginateSelectedPokemons(page, itemsPerPage))
   
    const getMoreListItems = useCallback(() => {
      setTimeout(() => {

        
        setPage(page => page + 1)
        setIsFetching(false);
      }, 2000);
    },[])
    const [isFetching, setIsFetching] = useInfiniteScroll(getMoreListItems);

    return (
        <>
        <PokemonGrid isFetching={isFetching} pokemons={pokemons}/>
        </>
    )
}

export default CatchedPokemonContainer