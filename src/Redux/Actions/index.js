import { saveToken, fetchToken } from '../../Helpers/API';

export const GET_TOKEN = 'GET_TOKEN';

const getToken = (token) => ({
  type: GET_TOKEN,
  payload: token,
});

export const requestToken = () => async (dispatch) => {
  const token = await fetchToken();
  saveToken(token);
  dispatch(getToken(token));
};
