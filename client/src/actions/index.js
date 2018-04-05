/* eslint-disable */
import axios from 'axios';
axios.defaults.withCredentials = true;
const ROOT_URL = 'http://localhost:8080';

export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const GET_CARDS = 'GET_CARDS';
export const GET_CARD = 'GET_CARD';
export const ADD_CARD = 'ADD_CARD';
// export const CHECK_IF_AUTHENTICATED = 'CHECK_IF_AUTHENTICATED';

export const authError = error => {
  return {
    type: AUTHENTICATION_ERROR,
    payload: error
  };
};

export const register = (username, password, confirmPassword, history) => {
  return dispatch => {
    if (password !== confirmPassword) {
      dispatch(authError('Passwords do not match'));
      return;
    }
    axios
      .post(`${ROOT_URL}/auth/register`, { username, password })
      .then(() => {
        dispatch({
          type: USER_REGISTERED
        });
        history.push('/signin');
      })
      .catch(() => {
        dispatch(authError('Failed to register user'));
      });
  };
};

// updateUser needs work
export const updateUser = (username, password, confirmPassword, newPassword, confirmNewPassword, history) => {
  return dispatch => {
    if (password !== confirmPassword) {
      dispatch(authError('Old passwords do not match'));
      return;
    }
    if (newPassword !== confirmNewPassword) {
      dispatch(authError('New passwords do not match'));
      return;
    }
    axios
      .post(`${ROOT_URL}/auth/reset`, { username, password, confirmPassword, newPassword, confirmNewPassword })
      .then(() => {
        dispatch({
          type: USER_REGISTERED
        });
        history.push('/cards');
      })
      .catch(() => {
        dispatch(authError('Failed to update user password'));
      });
  };
};

export const login = (username, password, history) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/auth/login`, { username, password })
      .then((res) => {
        dispatch({
          type: USER_AUTHENTICATED
        });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        console.log(res.data);
        history.push('/cards');
      })
      .catch(() => {
        dispatch(authError('Incorrect email/password combo'));
      });
  };
};

export const logout = () => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/logout`)
      .then(() => {
        dispatch({
          type: USER_UNAUTHENTICATED
        });
      })
      .catch(() => {
        dispatch(authError('Failed to log you out'));
      });
  };
};

export const getCards = () => {
  return dispatch => {
    axios
      .get(`${ROOT_URL}/cards`)
      .then((res) => {
        dispatch({
          type: GET_CARDS,
          payload: res
        });
      })
      .catch(() => {
        dispatch(authError('Failed to get cards'));
      });
  };
};

export const getCard = (id) => {
  return dispatch => {
    axios
      .get(`${ROOT_URL}/cards/${id}`)
      .then((res) => {
        dispatch({
          type: GET_CARD,
          payload: res
        });
      })
      .catch(() => {
        dispatch(authError('Failed to get card by that id'));
      });
  };
};

export const addCard = (card) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/card/create`, card)
      .then((res) => {
        dispatch({
          type: ADD_CARD,
          payload: res
        });
      })
      .catch(() => {
        dispatch(authError('Failed to add new card'));
      });
  };
};