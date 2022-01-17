import md5 from 'crypto-js/md5';

export const fetchToken = () => fetch('https://opentdb.com/api_token.php?command=request')
  .then((response) => response.json())
  .then((data) => data.token);

export const fetchQuestions = (token) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
  .then((response) => response.json());

export const saveToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');

export const saveScore = (score) => localStorage.setItem('score', score);
export const getScore = () => localStorage.getItem('score');

export const getRanking = () => JSON.parse(localStorage.getItem('ranking'));
export const saveRanking = (data) => {
  let ranking = getRanking();

  if (!ranking) {
    ranking = [];
  }

  localStorage.setItem('ranking', JSON.stringify([...ranking, data]));
};

export const getImage = (email) => md5(email).toString();
