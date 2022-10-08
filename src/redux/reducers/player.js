import { ADD_USER, ISFETCHING, GET_TOKEN } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  token: '',
  isFetching: false,
  hash: '',
  img: '',
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
  case ISFETCHING:
    return { ...state, isFetching: true };
  case GET_TOKEN:
    return { ...state, token: action.token, isFetching: false };
  default:
    return state;
  }
};

export default player;
