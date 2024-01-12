import React, { FunctionComponent, useState, useContext } from 'react'; 
import { useHistory } from 'react-router-dom';
import { PokemonsDispatchContext } from '../context/pokemon-context';
import { formatType } from '../helpers/formatSomthing';
import Pokemon from '../models/pokemons'; 

type Props = {
    pokemon: Pokemon,
    isEditForm : boolean
};

type Field = {
    value : any,
    error?: string,
    isValid?:boolean
}

type Form = {
    name: Field,
    hp: Field,
    cp: Field,
    types: Field,
    picture: Field
}

const PokemonForm: FunctionComponent<Props> = ({ pokemon, isEditForm}) => {
    const dispatch : any = useContext(PokemonsDispatchContext)
    const [form, setForm] = useState<Form>({
        picture: { value: pokemon.picture},
        name: {value:pokemon.name, isValid: true},
        hp: { value: pokemon.hp, isValid: true },
        cp: { value: pokemon.cp, isValid: true },
        types: { value: pokemon.types, isValid: true },

    })

    const history = useHistory();

    const types: string[] = [
        'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
        'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
    ];

    const hasType = (type: string): boolean => {
        return form.types.value.includes(type)
    }

    const handleForm = (e:React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: { value: e.target.value } })
        // OR setForm({ ...form, ...{ [e.target.name]: { value: e.target.value } } })

    }

    const selectType = (type: string, e: React.ChangeEvent<HTMLInputElement>) : void => {
        const checked = e.target.checked; 
        if(checked){
            // alors on ajoute à la liste des types de pokemons
            const newTypes : string[] = form.types.value.concat([type]);
            setForm({
                ...form, types: {value: newTypes}
            });
        }
        else{
            //si on retire
            const newTypes: string[] = form.types.value.filter((currentType: string) => currentType !== type);
            setForm({
                ...form, types: { value: newTypes }
            });
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValidForm = validateForm();
        if(isValidForm) {
            console.log(form);
            pokemon.picture = form.picture.value;
            pokemon.name = form.name.value;
            pokemon.hp = form.hp.value;
            pokemon.cp = form.cp.value;
            pokemon.types = form.types.value; 
        }

       (isEditForm) ? updatePokemon() : addPokemon();     
    }

    const addPokemon = () => {
      dispatch({
            type: "added",
            pokemon: pokemon
        });
       
        setTimeout(() => {
            history.push('/pokemons')
        }, 1000);
        //PokemonService.addPokemon(pokemon).then(() => history.push('/pokemons'))
    }
    const updatePokemon = () => {
        dispatch({
            type: "changed",
            pokemon: pokemon
        });

        setTimeout(() => {
            history.push(`/pokemon/${pokemon.id}`)
        }, 1000);

       // PokemonService.updatePokemon(pokemon).then(() => history.push(`/pokemon/${pokemon.id}`));
    }

    const deletePokemon = () => {
        dispatch({
            type: "deleted",
            id: pokemon.id
        });

        setTimeout(() => {
            history.push('/pokemons')
        }, 1000);

        //PokemonService.deletePokemon(pokemon).then(() => history.push('/pokemons'))
    }


    const isAddForm = () => {
        return !isEditForm;
    }

    const validateForm = () => {
        let newForm: Form = form;

        // Validator url
        if (isAddForm()) { 
            const start = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
            const end = ".png";

            if (!form.picture.value.startsWith(start) || !form.picture.value.endsWith(end)) {
                const errorMsg: string = 'L\'url n\'est pas valide.';
                const newField: Field = { value: form.picture.value, error: errorMsg, isValid: false };
                newForm = { ...newForm, ...{ picture: newField } };
            } 
            else {
                const newField: Field = { value: form.picture.value, error: '', isValid: true };
                newForm = { ...newForm, ...{ picture: newField } };
            }
        } 

       
        // Validator name
        if (!/^[a-zA-Zàéè ]{3,25}$/.test(form.name.value)) {
            const errorMsg: string = 'Le nom du pokémon est requis (1-25).';
            const newField: Field = { value: form.name.value, error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ name: newField } };
        } else {
            const newField: Field = { value: form.name.value, error: '', isValid: true };
            newForm = { ...newForm, ...{ name: newField } };
        }

        // Validator hp
        if (!/^[0-9]{1,3}$/.test(form.hp.value)) {
            const errorMsg: string = 'Les points de vie du pokémon sont compris entre 0 et 999.';
            const newField: Field = { value: form.hp.value, error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ hp: newField } };
        } else {
            const newField: Field = { value: form.hp.value, error: '', isValid: true };
            newForm = { ...newForm, ...{ hp: newField } };
        }

        // Validator cp
        if (!/^[0-9]{1,2}$/.test(form.cp.value)) {
            const errorMsg: string = 'Les dégâts du pokémon sont compris entre 0 et 99';
            const newField: Field = { value: form.cp.value, error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ cp: newField } };
        } else {
            const newField: Field = { value: form.cp.value, error: '', isValid: true };
            newForm = { ...newForm, ...{ cp: newField } };
        }

        setForm(newForm);
        return newForm.name.isValid && newForm.hp.isValid && newForm.cp.isValid;
    }

    const isTypesValid = (type: string): boolean => {
        // Cas n°1: Le pokémon a un seul type, qui correspond au type passé en paramètre.
        // Dans ce cas on revoie false, car l'utilisateur ne doit pas pouvoir décoché ce type (sinon le pokémon aurait 0 type, ce qui est interdit)
        if (form.types.value.length === 1 && hasType(type)) {
            return false;
        }

        // Cas n°1: Le pokémon a au moins 3 types.
        // Dans ce cas il faut empêcher à l'utilisateur de cocher un nouveau type, mais pas de décocher les types existants.
        if (form.types.value.length >= 3 && !hasType(type)) {
            return false;
        }

        // Après avoir passé les deux tests ci-dessus, on renvoie 'true', 
        // c'est-à-dire que l'on autorise l'utilisateur à cocher ou décocher un nouveau type.
        return true;
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="row">
                <div className="col s12 m8 offset-m2">
                    <div className="card hoverable"> 
                            {isEditForm && 
                                <div className="card-image">
                                        <img src={pokemon.picture} alt={pokemon.name} style={{ width: '250px', margin: '0 auto' }} />
                                        <span className="btn-floating halfway-fab waves-effect waves-light">
                                            <i onClick={deletePokemon} className="material-icons">delete</i>
                                        </span>
                                </div>
                            } 
                           
                       
                        <div className="card-stacked">
                            <div className="card-content">
                                {/* Pokemon picture */}
                                {isAddForm() && <div className="form-group">
                                    <label htmlFor="picture">Image</label>
                                    <input name="picture" id="picture" type="text" className="form-control" value={form.picture.value}
                                        onChange={(e) => handleForm(e)} ></input>
                                    {form.picture.error && <div className='card-panel red accent-1'>
                                        {form.picture.error}
                                    </div>
                                    }
                                </div>}
                               

                                {/* Pokemon name */}
                                <div className="form-group">
                                    <label htmlFor="name">Nom</label>
                                    <input name="name" id="name" type="text" className="form-control" value={form.name.value}
                                        onChange={(e) => handleForm(e)} ></input>
                                    {form.name.error && <div className='card-panel red accent-1'>
                                        {form.name.error}
                                    </div>
                                    }
                                </div>

                                {/* Pokemon hp */}
                                <div className="form-group">
                                    <label htmlFor="hp">Point de vie</label>
                                    <input name="hp" id="hp" type="number" className="form-control" value={form.hp.value} onChange={(e) => handleForm(e)}></input>
                                    {form.hp.error && <div className='card-panel red accent-1'>
                                        {form.hp.error}
                                    </div>
                                    }
                                </div>
                                {/* Pokemon cp */}
                                <div className="form-group">
                                    <label htmlFor="cp">Dégâts</label>
                                    <input name="cp" id="cp" type="number" className="form-control" value={form.cp.value} onChange={(e) => handleForm(e)}></input>
                                    {form.cp.error && <div className='card-panel red accent-1'>
                                        {form.cp.error}
                                    </div>
                                    }
                                </div>
                                {/* Pokemon types */}
                                <div className="form-group">
                                    <label>Types</label>
                                    {types.map(type => (
                                        <div key={type} style={{ marginBottom: '10px' }}>
                                            <label>
                                                <input id={type} type="checkbox" className="filled-in" disabled={!isTypesValid(type)} checked={hasType(type)} onChange={
                                                    (e) => selectType(type, e)
                                                }></input>
                                                <span>
                                                    <p className={formatType(type)}>{type}</p>
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="card-action center">
                                {/* Submit button */}
                                <button type="submit" className="btn">Valider</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PokemonForm;