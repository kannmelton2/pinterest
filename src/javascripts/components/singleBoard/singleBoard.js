// import pinData from '../../helpers/data/pinData';
// import utils from '../../helpers/utils';

const singleBoardView = (e) => {
  const boardId = e.target.closest('.card').id;
  console.error(boardId);
};

export default { singleBoardView };
