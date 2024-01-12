import React, { FunctionComponent }  from 'react';  
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/login';
import PageNotFound from './pages/page-not-found';
import PokemonAdd from './pages/pokemon-add';
import PokemonsDetail from './pages/pokemon-detail';
import PokemonEdit from './pages/pokemon-edit';
import PokemonList from './pages/Pokemon-list'; 
import PrivateRoute from './PrivateRoute';
 
 
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
                    <PrivateRoute exact path="/" component={PokemonList} />
                    <PrivateRoute exact path="/pokemons" component={PokemonList} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/pokemon/add" component={PokemonAdd} /> 
                    <PrivateRoute path="/pokemon/edit/:id" component={PokemonEdit} /> 
                    <PrivateRoute path="/pokemon/:id" component={PokemonsDetail} /> 
                    <Route component={PageNotFound} />  
                </Switch>
            </div> 
        </Router>
    )
}

export default App; 