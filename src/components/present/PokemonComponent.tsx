import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { updateComponent, Pokemon } from '../../features/pokemons/pokemon'
import { useAppDispatch } from '../../hooks';
import { firstLetterUpp, checkPokemonImageExist } from '../../utilities';
type MyPokemon = {
    pokemon: Pokemon,
    isFetching: boolean
}



function PokemonComponent({ pokemon,isFetching }: MyPokemon) {
    const [image, setImage] = useState('/images/placeholder-image.png')
    const transformName = useMemo(() => firstLetterUpp(pokemon.name), [pokemon.name])
    const dispath = useAppDispatch();
  
    const CatchButton = ({isCatched}: {isCatched: boolean | undefined}) => <button disabled={isCatched} onClick={() => {
        dispath(updateComponent({...pokemon, isCatched: true, catchDate: new Date().toLocaleString()}))}}>catch</button>
    const button = useMemo(() =>  pokemon.isCatched ? (
        <>
            <CatchButton isCatched={pokemon.isCatched}/>
            <button onClick={() => dispath(updateComponent({...pokemon, isCatched: false, catchDate: null}))}>uncatch</button>
        </>
    ): (
        <CatchButton isCatched={pokemon.isCatched}/>
    ),[pokemon.isCatched])
    const activeClass = useMemo(() => pokemon.isCatched ? 'card flex-column card--active' : 'card flex-column',[pokemon.isCatched])
    
    useEffect(() => {
        checkPokemonImageExist(pokemon.id)
        .then((result: string) => {
           
            setImage(result);
        })
        
    },[isFetching])
    return (
        
            <div className={activeClass}>
                <div className="card__inner">
                    <div className="card__front">
                        <img className="card__image" alt={transformName} src={image} />
                        <p className="card__text">{transformName}</p>
                    </div>
                    <div className="card__back">
                        <Link to={`/pokemon/${pokemon.id}`} className="card__text">{transformName}</Link>
                        {button}
                       
                    </div>
                </div>
            </div>
      
    )
}

export default PokemonComponent;