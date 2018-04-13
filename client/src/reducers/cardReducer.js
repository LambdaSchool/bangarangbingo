import { GET_CARD } from '../actions';

const defaultState = {
  card: {},
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CARD':
      return { ...state, ...action.payload };
    case GET_CARD:
      return action.payload.data;
    default:
      return state;
  }
};
