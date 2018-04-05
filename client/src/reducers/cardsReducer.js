import { GET_CARDS, ADD_CARD } from '../actions';

export default (cards = [], action) => {
  switch (action.type) {
    case GET_CARDS:
      console.log('IN CARDS REDUCER; ACTION.PAYLOAD:', action.payload.data);
      return action.payload.data;
    case ADD_CARD:
      return action.payload.data;
    default:
      return cards;
  }
};
