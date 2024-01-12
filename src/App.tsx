import React, { FunctionComponent }  from 'react';  
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/login';
import PageNotFound from './pages/page-not-found';
import PokemonAdd from './pages/pokemon-add';
import PokemonsDetail from './pages/pokemon-detail';
import PokemonEdit from './pages/pokemon-edit';
import PokemonList from './pages/Pokemon-list'; 
 
 
const App: FunctionComponent = () => {   

    return (
        <Router>  
            <div>
                <nav>
                    <div className='nav-wrapper teal'>
                        <Link to="/" className="brand-logo center">Pokedes</Link> 
                    </div>
                </nav>
                <Switch>
                    <Route exact path="/" component={PokemonList} />
                    <Route exact path="/pokemons" component={PokemonList} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/pokemon/add" component={PokemonAdd} /> 
                    <Route path="/pokemon/edit/:id" component={PokemonEdit} /> 
                    <Route path="/pokemon/:id" component={PokemonsDetail} /> 
                    <Route component={PageNotFound} />  
                </Switch>
            </div> 
        </Router>
    )
}

export default App; 