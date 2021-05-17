import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { updateComponent, IPokemon } from '../../redux/slices/pokemon'
import { useAppDispatch } from '../../hooks'
import { firstLetterUpp, getPokemonImage, PLACEHOLDER_IMAGE_PATH } from '../../utilities'

interface IPokemonInterface extends IPokemon {
    isFetching: boolean
}

const CatchButton = ({ pokemon }: IPokemon) => {
  const dispath = useAppDispatch()
  return (
  <button className='card__button card__button--success' disabled={pokemon.isCatched}
  onClick={() => {
    dispath(updateComponent({ ...pokemon, isCatched: true, catchDate: new Date().toLocaleString() }))
  }}>catch</button>
  )
}

function PokemonComponent ({ pokemon, isFetching }: IPokemonInterface) {
  const [image, setImage] = useState(PLACEHOLDER_IMAGE_PATH)
  const transformName = useMemo(() => firstLetterUpp(pokemon.name), [pokemon.name])
  const dispath = useAppDispatch()

  const ButtonGroup = useMemo(() => pokemon.isCatched
    ? (
        <>
            <CatchButton pokemon={pokemon} />
            <button className="card__button card__button--danger" onClick={() =>
              dispath(updateComponent({ ...pokemon, isCatched: false, catchDate: null }))
               }>uncatch</button>
        </>
      )
    : (
        <CatchButton pokemon={pokemon}/>
      ), [pokemon.isCatched])

  const activeClass = useMemo(() => pokemon.isCatched ? 'card flex-column card--active' : 'card flex-column', [pokemon.isCatched])

  useEffect(() => {
    getPokemonImage(pokemon.id)
      .then((result: string) => {
        setImage(result)
      })
  }, [isFetching])

  return (

            <div className={activeClass}>
                <div className="card__inner">
                    <div className="card__front">
                        <img className="card__image" alt={transformName} src={image} />
                        <p className="card__text">{transformName}</p>
                    </div>
                    <div className="card__back">
                        <Link to={`/pokemon/${pokemon.id}`} className="card__text">{transformName}</Link>
                        {ButtonGroup}
                    </div>
                </div>
            </div>

  )
}

export default PokemonComponent
