import { saveScore } from './API';
import { setScore } from '../Redux/Actions';

const MIN_SCORE = 10;

export default function calculateAndSaveScore(timer, dificulty, dispatch) {
  const dificultyScore = { easy: 1, medium: 2, hard: 3 };
  const score = MIN_SCORE + (timer * dificultyScore[dificulty]);
  saveScore(score);
  dispatch(setScore(score));
}
