import './boardComponent.scss';

const boardMaker = (board) => {
  const domString = `<div class="mt-3 col-md-4">
    <div class="card board-card" id="${board.id}">
      <h5 class="card-header text-center">${board.name}</h5>
    <div class="card-body">
     <p class="card-text">${board.description}</p>
     <div>
     <button class="btn light-text view-board-btn">See Board</button>
     <button class="btn btn-danger delete-board-btn"><i class="fas fa-trash-alt"></i></button>
     </div>
    </div>
    </div>
</div>`;

  return domString;
};

export default { boardMaker };
