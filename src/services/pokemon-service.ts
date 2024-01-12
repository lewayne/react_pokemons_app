/* Version de PRODUCTION */
import Pokemon from "../models/pokemons";
import POKEMONS from "../models/mock-pokemon";
  
export default class PokemonService {
  
  static pokemons:Pokemon[] = POKEMONS;
  
  static isDev = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
  
  static getPokemons(): Promise<Pokemon[]> {
    /*if(this.isDev) {
      return fetch('http://localhost:3001/pokemons')
      .then(response => response.json())
      .catch(error => this.handleError(error));
    }*/
  
    return new Promise(resolve => {
      resolve(this.pokemons);
    });
  }
  
  static getPokemon(id: number): Promise<Pokemon|null > {
    /*if(this.isDev) {
      return fetch(`http://localhost:3001/pokemons/${id}`)
      .then(response => response.json())
      .then(data => this.isEmpty(data) ? null : data)
      .catch(error => this.handleError(error));
    }*/
  
    return new Promise(resolve => {    
      const foundPokemon = this.pokemons.find((pokemon) => id === pokemon.id);
      if (foundPokemon) resolve(foundPokemon);
    }); 
  }
  
  static updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
    /*if(this.isDev) {
      return fetch(`http://localhost:3001/pokemons/${pokemon.id}`, {
        method: 'PUT',
        body: JSON.stringify(pokemon),
        headers: { 'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .catch(error => this.handleError(error));
    }*/
  
    return new Promise(resolve => {
      const { id } = pokemon;
      const index = this.pokemons.findIndex(pokemon => pokemon.id === id);
      this.pokemons[index] = pokemon;
      resolve(pokemon);
    }); 
  }
  
  static deletePokemon(pokemon: Pokemon): Promise<{}> {
    /*if(this.isDev) {
      return fetch(`http://localhost:3001/pokemons/${pokemon.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .catch(error => this.handleError(error));
    }*/
  
    return new Promise(resolve => {    
      const { id } = pokemon;
      this.pokemons = this.pokemons.filter(pokemon => pokemon.id !== id);
      resolve({});
    }); 
  }
  
  static addPokemon(pokemon: Pokemon): Promise<Pokemon> {
    pokemon.created = new Date(pokemon.created ? pokemon.created : 1);
  
    /*if(this.isDev) {
      return fetch(`http://localhost:3001/pokemons`, {
        method: 'POST',
        body: JSON.stringify(pokemon),
        headers: { 'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .catch(error => this.handleError(error));
    }*/
  
    return new Promise(resolve => {    
      this.pokemons.push(pokemon);
      resolve(pokemon);
    }); 
  }
  
  static searchPokemon(term: string): Promise<Pokemon[]> {
    /*if(this.isDev) {
      return fetch(`http://localhost:3001/pokemons?q=${term}`)
      .then(response => response.json())
      .catch(error => this.handleError(error));
    }*/
  
    return new Promise(resolve => {    
      
      const results = this.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(term.toLowerCase()));
      if(results)  resolve(results);
      else resolve(POKEMONS)
    });
  
  }
  
  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }
  
  static handleError(error: Error): void {
    console.error(error);
  }
}


/*import Pokemon from "../models/pokemons";

export default class PokemonService {
  static async getPokemons(): Promise<Pokemon[]> {
    return await fetch("http://localhost:3001/pokemons")
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async getPokemon(id: number): Promise<Pokemon | null> {
    return await fetch(`http://localhost:3001/pokemons/${id}`)
      .then((response) => response.json())
      .then((data) => (this.isEmpty(data) ? null : data))
      .catch((error) => this.handleError(error));
  }

  static async updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
    return await fetch(`http://localhost:3001/pokemons/${pokemon.id}`, {
      method: "PUT",
      body: JSON.stringify(pokemon),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async deletePokemon(pokemon: Pokemon): Promise<{}> {
    return await fetch(`http://localhost:3001/pokemons/${pokemon.id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async addPokemon(pokemon: Pokemon): Promise<Pokemon> {
    delete pokemon.created;

    return await fetch(`http://localhost:3001/pokemons`, {
      method: "POST",
      body: JSON.stringify(pokemon),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async searchPokemon(term: string): Promise<Pokemon[]> { 
    return await fetch(`http://localhost:3001/pokemons?q=${term}`)
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }

  static handleError(error: Error): void {
    console.error(error);
  }
}*/