import React, { useEffect, useState } from 'react';
import POKEMONS from '../models/mock-pokemon';
import Pokemon from '../models/pokemons';

const usePokemons  = () => { 
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    useEffect(() => {
        fetch("http://localhost:3001/pokemons")
          .then((response) => response.json())
          .then((pokemons) => setPokemons(pokemons));    
      //setPokemons(POKEMONS)
    }, []);
    return pokemons
}

export default usePokemons;

