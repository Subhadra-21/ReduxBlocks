//state, actions, reducer, store, dispatch, subscribe, middlewares,
import { createStore, applyMiddleware, bindActionCreators } from "redux";
import ThunkRedux from "redux-thunk";
import axios from "axios";

const initialStateusers = {
  loading: false,
  error: "",
  userlist: []
};

const GET_DATA = "GET_DATA";
const SET_DATA = "SET_DATA";
const SET_ERROR = "SET_ERROR";

const getdata = () => {
  return {
    type: GET_DATA
  };
};

const setError = err => {
  return {
    type: SET_ERROR,
    err
  };
};

const setData = data => {
  return {
    type: SET_DATA,
    data
  };
};

const reducer = (state = initialStateusers, action) => {
  switch (action.type) {
    case GET_DATA:
      return { loading: true, error: "", userlist: [] };
    case SET_DATA:
      return { loading: false, error: "", userList: action.data };
    case SET_ERROR:
      return { loading: false, error: action.err, userList: [] };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(ThunkRedux));

const asyncActionCreator = () => {
  return dispatch => {
    dispatch(getdata());
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        dispatch(setData(response.data.slice(0, 10)));
      })
      .catch(err => {
        dispatch(setError(err));
      });
  };
};

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(asyncActionCreator());
