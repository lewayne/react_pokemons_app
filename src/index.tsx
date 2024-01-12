import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import { PokemonsProvider } from './context/pokemon-context';

ReactDom.render(
    <PokemonsProvider>
        <App />
    </PokemonsProvider>,
    document.getElementById('root')
)