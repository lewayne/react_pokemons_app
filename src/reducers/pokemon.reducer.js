import { ADD_POST, ADD_POST_LIKE, DELETE_POST, EDIT_POST, GET_POSTS } from "../actions/post.action";

const initialState = {};

export default function pokemonReducer(state = initialState, action) {
    switch(action.type){
        case GET_POSTS : return action.payload;
        case ADD_POST : return [action.payload, ...state ];
        case EDIT_POST : return state.map((post)=>{ 
            if (post.id === action.payload.id)
              return {
                ...post,
                content: action.payload.content,
              }; //action.payload; //
            else return post;
        });
         case ADD_POST_LIKE : return state.map((post) => {
           if (post.id === action.payload.id)
             return {
               ...post,
               likes: action.payload.likes,
             };
           //action.payload; //
           else return post;
         });
        
        case DELETE_POST : return state.filter((post)=> post.id !== action.payload) 
        default: return state;
    }
}