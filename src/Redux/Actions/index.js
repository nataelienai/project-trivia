import { saveToken, fetchToken } from '../../Helpers/API';

export const GET_TOKEN = 'GET_TOKEN';
export const SET_PLAYER = 'SET_PLAYER';

const getToken = (token) => ({
  type: GET_TOKEN,
  payload: token,
});

export const setPlayer = (email, name) => ({
  type: SET_PLAYER,
  payload: { email, name },
});

export const requestToken = () => async (dispatch) => {
  const token = await fetchToken();
  saveToken(token);
  dispatch(getToken(token));
};
