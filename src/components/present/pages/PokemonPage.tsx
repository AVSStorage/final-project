import { IPokemon } from '../../../redux/slices/pokemon'
import { useMemo, useState, useEffect } from 'react'
import { getPokemonImage, firstLetterUpp } from '../../../utilities'
function PokemonPage ({ pokemon } : IPokemon) {
  const [image, setImage] = useState('/images/placeholder-image.png')

  const transformName = useMemo(() => firstLetterUpp(pokemon.name), [pokemon.name])
  useEffect(() => {
    getPokemonImage(pokemon.id)
      .then((result: string) => {
        setImage(result)
      })
  }, [pokemon])
  return (
        <div className="pokemon grid__col-2">

            <img className="pokemon__image" src={image} alt={pokemon.name}/>
            <div className="pokemon__description">
                <p>ID: {pokemon.id}</p>
                <h2 className="pokemon__title">{transformName}</h2>

                {pokemon.isCatched && <p className="pokemon__title">Catched</p>}
                {pokemon.catchDate && <p className="pokemon__title">{pokemon.catchDate}</p>}
                <form onSubmit={(evt) => {
                  evt.preventDefault()
                } } className="pokemon__form form d-flex-column-y-center" method="POST">
                  <textarea className="form__input" rows={5}>
                  </textarea>
                  <button className="form__button">Add a comment</button>
                </form>
            </div>
        </div>
  )
}

export default PokemonPage
