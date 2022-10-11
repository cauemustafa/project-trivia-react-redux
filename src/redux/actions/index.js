import { MD5 } from 'crypto-js';

// ACTIONS

export const ADD_USER = 'ADD_USER';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const REQUEST_API = 'REQUEST_API';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const ADD_SCORE = 'ADD_SCORE';
export const CLEAR_SCORE = 'CLEAR_SCORE';
export const ADD_RANK = 'ADD_RANK';

// ACTIONS CREATORS

export const addUser = (name, gravatarEmail) => ({
  type: ADD_USER,
  payload: {
    gravatarEmail,
    name,
    hash: MD5(gravatarEmail).toString(),
  },
});

export const addScore = (score) => ({
  type: ADD_SCORE,
  payload: score,
});

export const clearScore = () => ({
  type: CLEAR_SCORE,
});

export const addRank = (name, hash, score) => ({
  type: ADD_RANK,
  payload: { name, hash, score },
});

// ACTIONS CREATORS FOR THUNK REQUESTS API

const getToken = ({ token }) => ({
  type: GET_TOKEN,
  payload: token,
});

const getQuestions = (result) => ({
  type: GET_QUESTIONS,
  payload: result, // se o token expirar results será um array vazio
});

const requestAPI = () => ({
  type: REQUEST_API,
});

const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  payload: error,
});

// FETCH

const fetchAPI = async (ENDPOINT) => {
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return result;
};

// THUNK

export const fetchToken = () => (
  async (dispatch) => {
    dispatch(requestAPI());
    try {
      const ENDPOINT = 'https://opentdb.com/api_token.php?command=request';
      const result = await fetchAPI(ENDPOINT);
      return dispatch(getToken(result));
    } catch (error) {
      console.error(error);
      return dispatch(failedRequest(error));
    }
  }
);

export const fetchQuestions = (token) => (
  async (dispatch) => {
    dispatch(requestAPI());
    try {
      const ENDPOINT = `https://opentdb.com/api.php?amount=5&token=${token}`;
      const result = await fetchAPI(ENDPOINT);
      return dispatch(getQuestions(result));
    } catch (error) {
      console.error(error);
      return dispatch(failedRequest(error));
    }
  }
);
