//state, actions, reducer, store, dispatch, subscribe, middlewares,
import {
  createStore,
  applyMiddleware,
  combineReducers,
  bindActionCreators
} from "redux";
import { createLogger } from "redux-logger";

import "./asyncThunk";

// const initialState = {
//   comments: [],
//   reviews: [],
// };

const initialStateComments = [];
const initialStateReviews = [];

const ADD_COMMENTS = "ADD_COMMENTS";
const EDIT_COMMENTS = "EDIT_COMMENTS";
const DELETE_COMMENTS = "DELETE_COMMENTS";

const ADD_REVIEW = "ADD_REVIEW";

const addComments = message => {
  return {
    type: ADD_COMMENTS,
    comment: message
  };
};

const editComments = (idx, message) => {
  return {
    type: EDIT_COMMENTS,
    comment: message,
    idx
  };
};

const deleteComments = idx => {
  return {
    type: DELETE_COMMENTS,
    idx
  };
};

const reducerComment = (state = initialStateComments, action) => {
  switch (action.type) {
    case ADD_COMMENTS:
      return [...state, action.comment];
    case EDIT_COMMENTS:
      const { idx: idx1, comment } = action;
      return [...state.slice(0, idx1), comment, ...state.slice(idx1 + 1)];
    case DELETE_COMMENTS:
      const { idx } = action;
      return state.slice(0, idx).concat(state.slice(idx + 1));
    default:
      return state;
  }
};

const addReviews = message => {
  return {
    type: ADD_REVIEW,
    review: message
  };
};

const reducerReview = (state = initialStateReviews, action) => {
  switch (action.type) {
    case ADD_REVIEW:
      return [...state, action.review];
    default:
      return state;
  }
};

const logger = createLogger();
const reducerRoot = combineReducers({
  comments: reducerComment,
  reviews: reducerReview
});
const store = createStore(reducerRoot, applyMiddleware(logger));

const unsubscribe = store.subscribe(() => {
  console.log(JSON.stringify(store.getState()));
});

store.dispatch(addComments("First comments!!"));
store.dispatch(addComments("Second comments!!"));
store.dispatch(addComments("third comments!!"));
store.dispatch(editComments(0, "edited first message"));
store.dispatch(deleteComments(0));
store.dispatch(addComments("New comments!!"));
store.dispatch(addReviews("First Review"));
store.dispatch(addReviews("Second Review"));

//combine the action creator and dispatch , wraps the action creator with dispatch
//if param is a fun, it will return a fun wrapped with dispatch
// if paramis object, where each value is action creator, then returns an object, where each action creators are wrapped with dispatch

//=> function param
const newActionCreator = bindActionCreators(addComments, store.dispatch);
//directly call the action creator.
newActionCreator("First comments!!");

//=> object param
const newActionCreatorMulti = bindActionCreators(
  { addComments },
  store.dispatch
);
//directly call the action creator.
newActionCreatorMulti.addComments("First comments!!");

unsubscribe(); // state update happens, but we wont be notified after unscribe.

store.dispatch(addReviews("Third Review"));
console.log("after unsubscribe - ", store.getState());
