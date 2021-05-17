import { MutableRefObject, useEffect, useMemo, useRef } from 'react'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchPokemonsPerLimit, selectState } from '../../redux/slices/pokemon'
import PokemonGrid from '../present/PokemonGrid'
import Loading from '../../loading.svg'
import Error from '../common/Error'

function PokemonContainer () {
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems)
  const { items: pokemons, error, loading, page } = useAppSelector(selectState)
  const dispatch = useAppDispatch()
  const timer: MutableRefObject<null | ReturnType<typeof setTimeout>> = useRef<null>(null)

  function fetchMoreListItems () {
    timer.current = setTimeout(() => {
      dispatch(fetchPokemonsPerLimit({ page: page + 1, limit: 10 }))

      setIsFetching(false)
    }, 2000)
  }
  useEffect(() => {
    if (pokemons.length === 0) {
      dispatch(fetchPokemonsPerLimit({ page: 1, limit: 10 }))
    }
  }, [])

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
  }, [timer.current])

  const LoadingComponent = useMemo(() => loading && (<Loading/>), [loading])
  const ErrorComponent = useMemo(() => error && (<Error message={error}/>), [error])

  return (<>
        <div className="d-flex-column-x-center">
          {LoadingComponent}
          {ErrorComponent}
        </div>
        <PokemonGrid isFetching={isFetching} pokemons={pokemons}/>
    </>)
}

export default PokemonContainer
