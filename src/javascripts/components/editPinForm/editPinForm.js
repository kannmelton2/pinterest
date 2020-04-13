import boardData from '../../helpers/data/boardData';

import utils from '../../helpers/utils';

const hideSingleView = () => {
  const singleViewDiv = $('#single-view');
  singleViewDiv.addClass('hide');
};

const editPinForm = () => {
  const authUser = utils.getMyUid();
  let domString = '';
  boardData.getBoardsbyUid(authUser)
    .then((boards) => {
      domString += '<form class="container col-4">';
      domString += '<div class="form-group">';
      domString += '<label for="board-id">Choose Board:</label>';
      domString += '<select class="form-control" id="board-id">';
      boards.forEach((board) => {
        domString += `<option value="${board.id}">${board.name}</option>`;
      });
      domString += '</select>';
      domString += '</div>';
      domString += '<button class="btn btn-danger" id="cancel-edit-pin">Cancel</button>';
      domString += '<button class="btn btn-success" id="submit-edit-pin">Submit</button>';
      domString += '</form>';
      hideSingleView();
      utils.printToDom('edit-pin', domString);
    })
    .catch((err) => console.error('could not get boards', err));
};

export default { editPinForm };
