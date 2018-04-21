import axios from 'axios';

export const initDownload = id => async (dispatch) => {
  const authToken = window.localStorage.getItem('token');
  const { data } = await axios.get(`/card/download/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  
};

export default {
  initDownload
};