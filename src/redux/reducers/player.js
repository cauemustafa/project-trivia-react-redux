import {
  ADD_USER,
  REQUEST_API,
  FAILED_REQUEST,
  GET_TOKEN,
  GET_QUESTIONS,
  ADD_SCORE,
  CLEAR_SCORE,
  ADD_RANK,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  token: '',
  isFetching: false,
  error: false,
  hash: '',
  response: '',
  questions: [],
  ranking: [],
};

const orderRank = (ranking) => ranking
  .sort((a, b) => b.score - a.score);
// Ref: https://dev.to/madanlal/how-to-sort-array-of-object-using-object-keys-in-javascript-58f1

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
      hash: action.payload.hash,
    };
  case REQUEST_API:
    return { ...state, isFetching: true, error: false };
  case FAILED_REQUEST:
    return {
      ...state,
      isFetching: false,
      error: true,
      errorMessage: action.payload.message };
  case GET_TOKEN:
    return {
      ...state,
      isFetching: false,
      token: action.payload,
    };
  case GET_QUESTIONS:
    return {
      ...state,
      isFetching: false,
      response: action.payload.response_code,
      questions: action.payload.results,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };
  case CLEAR_SCORE:
    return { ...state, score: 0 };
  case ADD_RANK:
    return {
      ...state,
      ranking: orderRank([...state.ranking, action.payload]),
    };
  default:
    return state;
  }
};

export default player;

// Referência ordenando ranking pelo score:
// https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value
