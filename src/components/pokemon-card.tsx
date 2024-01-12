import React, { useState } from 'react';
import Pokemon from '../models/pokemons';
import { formatDate, formatType } from '../helpers/formatSomthing';
import "./pokemon-card.css"
import { useHistory } from 'react-router-dom';

type Props = {
    pokemon: Pokemon, 
    borderColor?: string 
}
const PokemonCard: React.FC<Props> = ({pokemon, borderColor="#009688"}) => { 
    const [color, setColor] = useState<string>();
    const history = useHistory();
 
    const showBorder = () => {
        setColor(borderColor)
    }
    const hideBorder = () => {
        setColor("#f5f5f5")
    } 

    const onToPokemon = (id:number) => {
        history.push(`/pokemon/${id}`);
    } 
    return (
        <div className="col s6 m4" key={pokemon.id} onMouseEnter={showBorder} onMouseLeave={hideBorder} onClick={() => onToPokemon(pokemon.id)}>
            <div className="card horizontal" style={{ borderColor: color }} > 
                <div className="card-image">
                    <img src={pokemon.picture} alt={pokemon.name} />
                </div>
                <div className="card-stacked">
                    <div className="card-container" key={pokemon.id}>
                        <p>{pokemon.name}</p> 
                        {/*<p><small>{formatDate(pokemon?.created)}</small></p>*/ }
                        {pokemon.types.map((type) => (
                            <span key={type} className={formatType(type)}>{type}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default PokemonCard;