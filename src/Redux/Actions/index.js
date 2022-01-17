import { saveToken, fetchToken } from '../../Helpers/API';

export const GET_TOKEN = 'GET_TOKEN';
export const SET_PLAYER = 'SET_PLAYER';
export const SET_SCORE = 'SET_SCORE';
export const RESET_USER = 'RESET_USER';

const getToken = (token) => ({
  type: GET_TOKEN,
  payload: token,
});

export const setPlayer = (email, name) => ({
  type: SET_PLAYER,
  payload: { email, name },
});

export const setScore = (score) => ({
  type: SET_SCORE,
  payload: score,
});

export const resetUser = () => ({
  type: RESET_USER,
});

export const requestToken = () => async (dispatch) => {
  const token = await fetchToken();
  dispatch(getToken(token));
  saveToken(token);
};
