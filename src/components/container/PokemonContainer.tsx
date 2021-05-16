import { useEffect, useState } from 'react'
import  useInfiniteScroll from '../../hooks/useInfiniteScroll'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchPokemonsPerLimit, selectState } from '../../features/pokemons/pokemon'
import PokemonGrid from '../present/PokemonGrid';

function PokemonContainer() {
    const [page, setPage] = useState(1)
    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
    const {items: pokemons, error, loading } = useAppSelector(selectState)
    const dispatch = useAppDispatch();
    function fetchMoreListItems() {
      setTimeout(() => {

        dispatch(fetchPokemonsPerLimit({page: page + 1, limit: 10}))
        setPage(page + 1)
        setIsFetching(false);
      }, 2000);
    }
    useEffect(() => {
        if (pokemons.length === 0) {
        dispatch(fetchPokemonsPerLimit({page: 1, limit: 10}))
        }
    },[])
    

    return (<>
        {loading && (<div>Loading</div>)}
        <PokemonGrid  isFetching={isFetching} pokemons={pokemons}/>
    </>)
}

export default PokemonContainer;