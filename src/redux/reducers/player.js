import {
  ADD_USER,
  REQUEST_API,
  FAILED_REQUEST,
  GET_TOKEN,
  GET_QUESTIONS,
  ADD_SCORE,
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
};

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
  default:
    return state;
  }
};

export default player;
