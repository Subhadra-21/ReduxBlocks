//state, actions, reducer, store, dispatch, subscribe, middlewares,
import { createStore } from "redux";

const initialState = {
  comments: []
};

const ADD_COMMENTS = "ADD_COMMENTS";
const EDIT_COMMENTS = "EDIT_COMMENTS";
const DELETE_COMMENTS = "DELETE_COMMENTS";

const addComments = message => {
  return {
    type: ADD_COMMENTS,
    comment: message
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENTS:
      return { comments: [...state.comments, action.comment] };
    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => {
  console.log(JSON.stringify(store.getState()));
});

store.dispatch(addComments("First comments!!"));
store.dispatch(addComments("Second comments!!"));
store.dispatch(addComments("third comments!!"));
