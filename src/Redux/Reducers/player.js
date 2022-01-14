import { SET_PLAYER, SET_SCORE } from '../Actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_PLAYER:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };

  case SET_SCORE:
    return { ...state, score: action.payload };

  default:
    return state;
  }
};

export default player;
