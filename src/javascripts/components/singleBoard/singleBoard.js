import editPinForm from '../editPinForm/editPinForm';
import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';

// hide boards div from view to see single board view
const hideBoardsDiv = () => {
  const boardsDiv = $('#boards');
  boardsDiv.addClass('hide');
};

// close single view and un-hide boards div
const closeSingleViewEvent = () => {
  utils.printToDom('single-view', '');
  const boardsDiv = $('#boards');
  boardsDiv.removeClass('hide');
};

// remove a pin from the page and show the boards div
const removePin = (e) => {
  const pinId = e.target.closest('.card').id;
  pinData.deletePin(pinId)
    .then(() => closeSingleViewEvent())
    .catch((err) => console.error('delete pins failed', err));
};

// cancel editing a pin
const cancelEditPin = () => {
  utils.printToDom('edit-pin', '');
  const singleViewDiv = $('#single-view');
  singleViewDiv.removeClass('hide');
};

// build single board view
const singleBoardView = (e) => {
  const boardId = e.target.closest('.card').id;
  pinData.getPins()
    .then((pins) => {
      let domString = '<div><button id="close-single-view" class="btn btn-outline-dark mt-3 ml-2"><i class="far fa-times-circle"></i></button></div>';
      pins.forEach((pin) => {
        if (pin.boardId === boardId) {
          domString += `<div class="d-flex flex-wrap col-md-4 mt-3">
          <div class="card" id="${pin.id}">
          <img src="${pin.imageUrl}" class="card-img-top" alt="...">
          <div class="card-body d-flex">
            <h5 class="card-title">${pin.name}</h5>
            <button class="btn btn-outline-danger ml-auto delete-pin-btn"><i class="fas fa-trash-alt"></i></button>
            <button class="btn btn-outline-warning edit-pin-btn"><i class="fas fa-edit"></i></button>
          </div>
        </div>
        </div>`;
        }
      });
      hideBoardsDiv();
      utils.printToDom('single-view', domString);
    })
    .catch((err) => console.error('problem with get pins', err));
};

// events for the single board view
const singleViewEvents = () => {
  $('body').on('click', '#close-single-view', closeSingleViewEvent);
  $('body').on('click', '.delete-pin-btn', removePin);
  $('body').on('click', '.edit-pin-btn', editPinForm.editPinForm);
  $('body').on('click', '#cancel-edit-pin', cancelEditPin);
};

export default { singleBoardView, singleViewEvents };
