import { Pokemon } from "../../features/pokemons/pokemon"
import { useMemo,useState,useEffect } from 'react'
import { checkPokemonImageExist, firstLetterUpp } from '../../utilities'
function PokemonPage({pokemon} : {pokemon: Pokemon}) {
    const [image, setImage] = useState('/images/placeholder-image.png')
   
    const transformName = useMemo(() => firstLetterUpp(pokemon.name), [pokemon.name])
    useEffect(() => {
        checkPokemonImageExist(pokemon.id)
        .then((result: string) => {
            setImage(result);
        })
        
    },[pokemon])
    return (
        <div className="grid__col-2">

            <img className="justify-self-end" src={image} alt={pokemon.name}/>
            <div className="justify-self-start">
                <p>ID: {pokemon.id}</p>
                <h2 className="card__title">{transformName}</h2>
               
                {pokemon.isCatched && <p className="card__text">Catched</p>}
                {pokemon.catchDate && <p className="card__text">{pokemon.catchDate}</p>}
            </div>
        </div>
    )
}

export default PokemonPage