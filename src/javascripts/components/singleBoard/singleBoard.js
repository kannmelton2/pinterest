import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';

const hideBoardsDiv = () => {
  const boardsDiv = $('#boards');
  boardsDiv.addClass('hide');
};

const closeSingleViewEvent = () => {
  utils.printToDom('single-view', '');
  const boardsDiv = $('#boards');
  boardsDiv.removeClass('hide');
};


const singleBoardView = (e) => {
  const boardId = e.target.closest('.card').id;
  pinData.getPins()
    .then((pins) => {
      let domString = '<button id="close-single-view" class="btn btn-outline-dark mt-3 ml-2"><i class="far fa-times-circle"></i></button>';
      pins.forEach((pin) => {
        if (pin.boardId === boardId) {
          domString += `<div class="d-flex flex-wrap col-md-4 mt-3">
          <div class="card">
          <img src="${pin.imageUrl}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${pin.name}</h5>
          </div>
        </div>
        </div>`;
        }
      });
      hideBoardsDiv();
      utils.printToDom('single-view', domString);
      $('#close-single-view').click(closeSingleViewEvent);
    })
    .catch((err) => console.error('problem with get pins', err));
};

export default { singleBoardView };
