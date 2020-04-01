import pinData from '../../helpers/data/pinData';
// import utils from '../../helpers/utils';


const singleBoardView = (e) => {
  const boardId = e.target.closest('.card').id;
  pinData.getPins()
    .then((pins) => {
      pins.forEach((pin) => {
        if (pin.boardId === boardId) {
          console.error('boardId', boardId, 'pin', pin);
        }
      });
    })
    .catch((err) => console.error('problem with get pins', err));
  // console.error('boardId', boardId, 'pins', pins);
};

export default { singleBoardView };
