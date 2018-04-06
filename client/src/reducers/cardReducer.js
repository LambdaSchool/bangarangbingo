import { GET_CARD } from '../actions';

export default (card = null, action) => {
  switch (action.type) {
    case GET_CARD:
      return action.payload.data;
    default:
      return card;
  }
};
