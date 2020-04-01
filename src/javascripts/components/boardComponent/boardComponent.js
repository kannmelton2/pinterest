const boardMaker = (board) => {
  const domString = `<div class="card">
  <h5 class="card-header">${board.name}</h5>
  <div class="card-body">
    <p class="card-text">${board.description}</p>
  </div>
</div>`;

  return domString;
};

export default { boardMaker };
