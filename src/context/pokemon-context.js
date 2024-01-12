import { createContext, useReducer } from "react";
import POKEMONS from "../models/mock-pokemon";

export const PokemonsContext = createContext(null);
export const PokemonsDispatchContext = createContext(null);

export function PokemonsProvider({ children }) {
  const [pokemons, dispatch] = useReducer(pokemonsReducer, POKEMONS);

  return (
    <PokemonsContext.Provider value={pokemons}>
      <PokemonsDispatchContext.Provider value={dispatch}>
        {children}
      </PokemonsDispatchContext.Provider>
    </PokemonsContext.Provider>
  );
}

 

function pokemonsReducer(pokemons, action) {
  switch (action.type) {
    case "added": {
      return [
        ...pokemons,
        {
          id: action.pokemon.id,
          name: action.pokemon.name,
          cp: action.pokemon.cp,
          hp: action.pokemon.hp,
          picture: action.pokemon.picture,
          types: action.pokemon.types,
        },
      ];
    }

    case "changed": {
      return pokemons.map((p) => {
        if (p.id === action.pokemon.id) return action.pokemon;
        else return p;
      });
    }

    case "search": { 
      if (action.term.trim().length < 2) {
        return POKEMONS;
      } else {
        const pokemonsFound = POKEMONS.filter((p) =>
          p.name.toLowerCase().includes(action.term.toLowerCase())
        );

        return pokemonsFound;
        //return pokemonsFound.length ? pokemonsFound : POKEMONS;
      }
    }

    case "deleted": {
      return pokemons.filter((p) => p.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

 
