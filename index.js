const cells = document.querySelectorAll(".cell");

const gameBoard = (() => {
  const _gameBoardArray = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const getGameBoard = () => {
    return _gameBoardArray;
  };

  // @param {int} pos: two digit number corresponds to the id of cells
  const setCell = (pos, player) => {
    _gameBoardArray[pos[0]][pos[1]] = player.getSign();
  };

  return { getGameBoard, setCell };
})();

const player = (sign) => {
  const getSign = () => {
    return sign;
  };
  return { getSign };
};

const gameController = (() => {
  let currPlayer = player("x");

  const makeMove = (pos) => {
    gameBoard.setCell(pos, currPlayer);
    displayGameBoard(gameBoard.getGameBoard());
  };
  return { makeMove };
})();

displayGameBoard = (gameBoardArray) => {
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      cells[j + i * 3].innerHTML = gameBoardArray[i][j];
    }
  }
};

cells.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    gameController.makeMove(e.target.id);
  });
});
