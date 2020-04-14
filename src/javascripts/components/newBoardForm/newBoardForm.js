import utils from '../../helpers/utils';
import './newBoardForm.scss';

const buildNewBoardForm = () => {
  let domString = '';
  domString += '<h2 class="mt-3 text-center">Add New Board</h2>';
  domString += '<form class="container col-4">';
  domString += '<div class="form-group">';
  domString += '<label for="board-name">Name:</label>';
  domString += '<input type="text" class="form-control" id="board-name" placeholder="Recipes">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="board-description">Description:</label>';
  domString += '<input type="text" class="form-control" id="board-description" placeholder="Describe your Board">';
  domString += '</div>';
  domString += '<button id="cancel-new-board" class="btn btn-danger m-1">Cancel</button>';
  domString += '<button type="submit" id="add-new-board" class="btn btn-dark m-1">Add New Board</button>';
  domString += '</form>';
  utils.printToDom('boards', '');
  utils.printToDom('add-board-form', domString);
};

export default { buildNewBoardForm };
