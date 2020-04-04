import firebase from 'firebase/app';
import 'firebase/auth';

import singleBoard from '../singleBoard/singleBoard';
import boardComponent from '../boardComponent/boardComponent';

import boardData from '../../helpers/data/boardData';
import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';

const removeBoard = (e) => {
  const boardId = e.target.closest('.card').id;
  pinData.removePinsWithBoard(boardId);
  boardData.deleteBoard(boardId)
  // eslint-disable-next-line no-use-before-define
    .then(() => buildBoards())
    .catch((err) => console.error('delete board broke', err));
};

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
      $('.delete-board-btn').click(removeBoard);
      $('body').on('click', '.view-board-btn', singleBoard.singleBoardView);
      // $('body').on('click', '.delete-board-btn', removeBoard);
    })
    .catch((err) => console.error('get boards broke', err));
};


export default { buildBoards };
