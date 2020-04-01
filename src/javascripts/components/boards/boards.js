import firebase from 'firebase/app';
import 'firebase/auth';

import boardData from '../../helpers/data/boardData';

// import utils from '../../helpers/utils';

const getMyUid = () => {
  const myUid = firebase.auth().currentUser.uid;
  return myUid;
};

const buildBoards = () => {
  const authUser = getMyUid();
  console.error('current user', authUser);
  boardData.getBoardsbyUid(authUser)
    .then((boards) => {
      console.error('users boards', boards);
    })
    .catch((err) => console.error('get boards broke', err));
};

export default { buildBoards };
