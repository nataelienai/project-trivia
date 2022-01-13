export const fetchToken = () => fetch('https://opentdb.com/api_token.php?command=request')
  .then((response) => response.json())
  .then((data) => data.token);

export const saveToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
