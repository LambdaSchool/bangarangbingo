
import axios from 'axios';


export const setCard = card => ({
  type: 'SET_CARD',
  payload: {
    card,
  },
});
