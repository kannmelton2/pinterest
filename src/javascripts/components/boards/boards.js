import firebase from 'firebase/app';
import 'firebase/auth';

import boardComponent from '../boardComponent/boardComponent';

import boardData from '../../helpers/data/boardData';
import utils from '../../helpers/utils';

const getMyUid = () => {
  const myUid = firebase.auth().currentUser.uid;
  return myUid;
};

const buildBoards = () => {
  const authUser = getMyUid();
  boardData.getBoardsbyUid(authUser)
    .then((boards) => {
      let domString = '<h1 class="text-center">BOARDS</h1>';
      domString += '<div class="m-auto d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += boardComponent.boardMaker(board);
      });
      domString += '</div>';
      utils.printToDom('boards', domString);
    })
    .catch((err) => console.error('get boards broke', err));
};

export default { buildBoards };
