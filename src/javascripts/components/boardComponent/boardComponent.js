const boardMaker = (board) => {
  const domString = `<div class="col-md-4">
    <div class="card board-card" id="${board.id}">
      <h5 class="card-header text-center">${board.name}</h5>
    <div class="card-body">
     <p class="card-text">${board.description}</p>
    </div>
    </div>
</div>`;

  return domString;
};

export default { boardMaker };
