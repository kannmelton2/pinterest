import firebase from 'firebase/app';
import 'firebase/auth';

import singleBoard from '../singleBoard/singleBoard';
import boardComponent from '../boardComponent/boardComponent';
import newBoardForm from '../newBoardForm/newBoardForm';

import boardData from '../../helpers/data/boardData';
import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';

// Get UID function
const getMyUid = () => {
  const myUid = firebase.auth().currentUser.uid;
  return myUid;
};

// Remove Board Function
const removeBoard = (e) => {
  const boardId = e.target.closest('.card').id;
  pinData.removePinsWithBoard(boardId);
  boardData.deleteBoard(boardId)
  // eslint-disable-next-line no-use-before-define
    .then(() => buildBoards())
    .catch((err) => console.error('delete board broke', err));
};

// Close New Board Form
const closeNewBoardForm = () => {
  utils.printToDom('add-board-form', '');
  // eslint-disable-next-line no-use-before-define
  buildBoards();
};

// Make New Board function
const makeNewBoard = (e) => {
  e.preventDefault();
  const addNewBoard = {
    name: $('#board-name').val(),
    description: $('#board-description').val(),
    uid: getMyUid(),
  };
  boardData.addBoard(addNewBoard)
    .then(() => {
      utils.printToDom('add-board-form', '');
      // eslint-disable-next-line no-use-before-define
      buildBoards();
    })
    .catch((err) => console.error('could not make new board', err));
};

// Build Boards function
const buildBoards = () => {
  const authUser = getMyUid();
  boardData.getBoardsbyUid(authUser)
    .then((boards) => {
      let domString = '<h1 class="text-center">BOARDS</h1>';
      domString += '<button class="btn btn-success" id="open-new-board-form"><i class="fas fa-plus"></i></button>';
      domString += '<div class="m-auto d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += boardComponent.boardMaker(board);
      });
      domString += '</div>';
      utils.printToDom('boards', domString);
    })
    .catch((err) => console.error('get boards broke', err));
};

// Events function
const boardEvents = () => {
  $('body').on('click', '.delete-board-btn', removeBoard);
  $('body').on('click', '.view-board-btn', singleBoard.singleBoardView);
  $('body').on('click', '#open-new-board-form', newBoardForm.buildNewBoardForm);
  $('body').on('click', '#cancel-new-board', closeNewBoardForm);
  $('body').on('click', '#add-new-board', makeNewBoard);
};

export default { buildBoards, boardEvents };
