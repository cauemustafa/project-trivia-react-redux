export const ADD_USER = 'ADD_USER';
export const GET_TOKEN = 'GET_TOKEN';
export const ISFETCHING = 'ISFETCHING';

export const addUser = (gravatarEmail, name) => ({
  type: ADD_USER,
  payload: {
    gravatarEmail,
    name,
  },
});

// Actions para a chamada da api e receber um token

export const receiveToken = ({ token }) => ({ type: GET_TOKEN, token });
export const isFetching = () => ({ type: ISFETCHING });

export const fetchingApiToken = () => async (dispatch) => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const result = await response.json();
  dispatch(receiveToken(result));
  dispatch(isFetching());
};
