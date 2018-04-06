import { GET_CARDS, ADD_CARD } from '../actions';

export default (cards = [], action) => {
  if (action.type === GET_CARDS) {
    console.log('CardsReducer action.payload', action.payload);
  }
  switch (action.type) {
    case GET_CARDS:
      return action.payload.data;
    case ADD_CARD:
      return action.payload.data;
    default:
      return cards;
  }
};
