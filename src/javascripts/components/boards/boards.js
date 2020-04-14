import singleBoard from '../singleBoard/singleBoard';
import boardComponent from '../boardComponent/boardComponent';
import newBoardForm from '../newBoardForm/newBoardForm';
import newPinForm from '../newPinForm/newPinForm';

import boardData from '../../helpers/data/boardData';
import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';

import './boards.scss';

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
    uid: utils.getMyUid(),
  };
  boardData.addBoard(addNewBoard)
    .then(() => {
      utils.printToDom('add-board-form', '');
      // eslint-disable-next-line no-use-before-define
      buildBoards();
    })
    .catch((err) => console.error('could not make new board', err));
};

// Close New Pin Form
const closeNewPinForm = () => {
  utils.printToDom('add-pin-form', '');
  // eslint-disable-next-line no-use-before-define
  buildBoards();
};

// Submit edit pin form
const submitEditPin = (e) => {
  e.preventDefault();
  const pinId = e.target.closest('.edit-pin-form-tag').id;
  const editedPin = $('#edit-board-id').val();
  pinData.updatePin(pinId, editedPin)
    .then(() => {
      const boardsDiv = $('#boards');
      boardsDiv.removeClass('hide');
      utils.printToDom('edit-pin', '');
      // eslint-disable-next-line no-use-before-define
      buildBoards();
    })
    .catch((err) => console.error('could not update pin', err));
};

// Make New Pin function
const makeNewPin = (e) => {
  e.preventDefault();
  const addNewPin = {
    name: $('#pin-name').val(),
    imageUrl: $('#pin-image').val(),
    boardId: $('#board-id').val(),
  };
  pinData.addPin(addNewPin)
    .then(() => {
      utils.printToDom('add-pin-form', '');
      // eslint-disable-next-line no-use-before-define
      buildBoards();
    })
    .catch((err) => console.error('could not add pin', err));
};

// Build Boards function
const buildBoards = () => {
  const authUser = utils.getMyUid();
  boardData.getBoardsbyUid(authUser)
    .then((boards) => {
      let domString = '<h1 class=" mt-3 text-center">BOARDS</h1>';
      domString += '<div class="container text-center">';
      domString += '<button class="btn text-light m-2" id="open-new-board-form"><i class="fas fa-plus"></i><span class="ml-1">New Board</span></button>';
      domString += '<button class="btn text-light m-2" id="open-new-pin-form"><i class="fas fa-plus"></i><span class="ml-1">New Pin</span></button>';
      domString += '</div>';
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
  $('body').on('click', '#open-new-pin-form', newPinForm.buildNewPinForm);
  $('body').on('click', '#cancel-new-pin', closeNewPinForm);
  $('body').on('click', '#add-new-pin', makeNewPin);
  $('body').on('click', '#cancel-new-board', closeNewBoardForm);
  $('body').on('click', '#add-new-board', makeNewBoard);
  $('body').on('click', '#submit-edit-pin', submitEditPin);
};

export default { buildBoards, boardEvents };
