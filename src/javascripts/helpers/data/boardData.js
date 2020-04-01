import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBoardsbyUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const allBoards = response.data;
      const boards = [];
      if (allBoards) {
        Object.keys(allBoards).forEach((boardUid) => {
          allBoards[boardUid].id = boardUid;
          boards.push(allBoards[boardUid]);
        });
      }
      resolve(boards);
    })
    .catch((err) => reject(err));
});

export default { getBoardsbyUid };
