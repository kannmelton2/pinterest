import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';


const singleBoardView = (e) => {
  const boardId = e.target.closest('.card').id;
  pinData.getPins()
    .then((pins) => {
      let domString = '';
      pins.forEach((pin) => {
        if (pin.boardId === boardId) {
          domString += `<div class="col-md-3 mt-3">
          <div class="card">
          <img src="${pin.imageUrl}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${pin.name}</h5>
          </div>
        </div>
        </div>`;
        }
      });
      utils.printToDom('boards', '');
      utils.printToDom('single-view', domString);
    })
    .catch((err) => console.error('problem with get pins', err));
};

export default { singleBoardView };
