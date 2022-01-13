import { GET_TOKEN } from '../Actions';

const INITIAL_STATE = '';

export default function token(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_TOKEN:
    return action.payload;

  default:
    return state;
  }
}
