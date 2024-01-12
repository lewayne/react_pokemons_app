import axios from "axios";
  //static pokemons:Pokemon[] = POKEMONS;


export const GET_POKEMON = "GET_POSTS";
export const ADD_POKEMON = "ADD_POST";
export const EDIT_POKEMON = "EDIT_POST";
export const DELETE_POKEMON = "DELETE_POST"; 





export const getPosts = () => {
    return (dispatch) => {
        return axios.get("http://localhost:3000/posts").then((res) => { // recupère les data de la BD
            //on communique avec le reducer et on lui dis, change moi ces données et tu les affiche directement à l'écran
            //envoi une action et les data au reducer
            dispatch({type:GET_POKEMON, payload: res.data})
        });
    };
}


export const addPost = (data) => {
  return (dispatch) => {
    return axios.post("http://localhost:3000/posts", data).then((res) => {
      // recupère les data de la BD
      //on communique avec le reducer et on lui dis, change moi ces données et tu les affiche directement à l'écran
      //envoi une action et les data au reducer
      dispatch({ type: ADD_POKEMON, payload: data});
    });
  };
};

export const editPost = (post) => {
  return (dispatch) => {
    return axios.put(`http://localhost:3000/posts/${post.id}`, post).then((res) => { 
      dispatch({ type: EDIT_POKEMON, payload: post });
    });
  };
};

export const deletePost = (postID) => {
  return (dispatch) => {
    return axios.delete(`http://localhost:3000/posts/${postID}`).then((res) => {
      dispatch({ type: DELETE_POKEMON, payload: postID });
    });
  };
};

 