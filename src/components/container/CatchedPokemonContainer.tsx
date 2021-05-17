import PokemonGrid from '../present/PokemonGrid'
import { useAppSelector } from '../../hooks'
import { paginateSelectedPokemons } from '../../redux/slices/pokemon'
import { useCallback, useMemo, useState } from 'react'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
function CatchedPokemonContainer () {
  const [page, setPage] = useState(1)

  const itemsPerPage = 10
  const pokemons = useAppSelector(paginateSelectedPokemons(page, itemsPerPage))

  const getMoreListItems = useCallback(() => {
    setTimeout(() => {
      setPage(page => page + 1)
      setIsFetching(false)
    }, 2000)
  }, [])
  const [isFetching, setIsFetching] = useInfiniteScroll(getMoreListItems)

  const WarningComponent = useMemo(() => pokemons.length === 0 && (<p>There is no pokemons yet</p>), [pokemons.length])
  return (
        <>
        {WarningComponent}
        <PokemonGrid isFetching={isFetching} pokemons={pokemons}/>
        </>
  )
}

export default CatchedPokemonContainer
