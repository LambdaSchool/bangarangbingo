/* eslint-disable */
import axios from 'axios';
axios.defaults.withCredentials = true;
const ROOT_URL = 'http://localhost:8080';

export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
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
// export const updateUser = (username, oldPassword, newPassword, confirmNewPassword, history) => {
//   return dispatch => {
//     if (password !== confirmPassword) {
//       dispatch(authError('New passwords do not match'));
//       return;
//     }
//     axios
//       .post(`${ROOT_URL}/auth/updateUser`, { username, password })
//       .then(() => {
//         dispatch({
//           type: USER_REGISTERED
//         });
//         history.push('/signin');
//       })
//       .catch(() => {
//         dispatch(authError('Failed to register user'));
//       });
//   };
// };

export const login = (username, password, history) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/auth/login`, { username, password })
      .then(() => {
        dispatch({
          type: USER_AUTHENTICATED
        });
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