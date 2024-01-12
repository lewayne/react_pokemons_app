import React, { FunctionComponent, useContext, useState } from 'react';   
import { Link } from 'react-router-dom'; 
import PokemonCard from '../components/pokemon-card'; 
import { PokemonsContext, PokemonsDispatchContext  } from '../context/pokemon-context'; 
import Pokemon from '../models/pokemons'; 
 


const PokemonList: FunctionComponent = () => { 
  //const pokemons = usePokemons(); 
  const [term, setTerm] = useState<string>("");
  //const [, setPokemons] = useState<Pokemon[]>([]);
 const pokemons : Pokemon[] | any = useContext(PokemonsContext); 
 const dispatch : any = useContext(PokemonsDispatchContext)

//const dispatch = useContext(PokemonsDispatchContext);

  /*const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value;
   // setTerm(term);  

   // PokemonService.searchPokemon(term).then(pokemons => setPokemons(pokemons));
  }*/

  /*useEffect(() => { 
      PokemonService.searchPokemon(term).then(pokemons => setPokemons(pokemons)); 
    }, [term]); */

  return (
    <div>
      <h1 className='center'>Pokedex</h1>
      <div className='container'>
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <div className="card">
              <div className="card-content">
                <div className="input-field">
                  <input type="text" placeholder="Rechercher un pokémon" value={term} onChange={e => {              					 
                      setTerm(e.target.value);	               
                      dispatch({
                        type: "search",
                        term: e.target.value
                      }) 
                  } }/>
                </div>
              </div>
            </div>
          </div>
        </div> 

        <div className='row'>
          {/** <PokemonSearch></PokemonSearch>*/} 
          {pokemons.map((pokemon : Pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon}  />
          ))}
        </div>
      </div> 
      <Link className="btn-floating btn-large waves-effect waves-light red z-depth-3"
      style={{position:'fixed', bottom:'25px', right:'25px'}} to="/pokemon/add">
        <i className="material-icons">add</i>
      </Link>
    </div>
  );
};

export default PokemonList