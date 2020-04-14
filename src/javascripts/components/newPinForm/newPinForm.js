import boardData from '../../helpers/data/boardData';

import utils from '../../helpers/utils';
import './newPinForm.scss';

const buildNewPinForm = () => {
  const authUser = utils.getMyUid();
  boardData.getBoardsbyUid(authUser)
    .then((boards) => {
      let domString = '';
      domString += '<h2 class="mt-3 text-center">Add New Pin</h2>';
      domString += '<form class="container col-4">';
      domString += '<div class="form-group">';
      domString += '<label for="pin-name">Name:</label>';
      domString += '<input type="text" class="form-control" id="pin-name" placeholder="No Bake NY Cheesecake">';
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="pin-image">Image Link:</label>';
      domString += '<input type="text" class="form-control" id="pin-image" placeholder="Add an Image URL">';
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="board-id">Choose Board:</label>';
      domString += '<select class="form-control" id="board-id">';
      boards.forEach((board) => {
        domString += `<option value="${board.id}">${board.name}</option>`;
      });
      domString += '</select>';
      domString += '</div>';
      domString += '<button id="cancel-new-pin" class="btn btn-danger m-1">Cancel</button>';
      domString += '<button type="submit" id="add-new-pin" class="btn text-light m-1">Add New Pin</button>';
      domString += '</form>';
      utils.printToDom('boards', '');
      utils.printToDom('add-pin-form', domString);
    })
    .catch((err) => console.error('could not get boards', err));
};

export default { buildNewPinForm };
