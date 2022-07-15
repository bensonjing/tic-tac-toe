const gameBoard = (() => {
  const _gameBoardArray = [
    ["x", "o", "x"],
    ["x", "x", "o"],
    ["o", "o", "x"],
  ];

  const getGameBoard = () => {
    return _gameBoardArray;
  };
  return { getGameBoard };
})();

const gameController = (() => {
  return {};
})();

const player = () => {
  return {};
};

displayGameBoard = (gameBoardArray) => {
  const cells = document.querySelectorAll(".cell");
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      cells[j + i * 3].innerHTML = gameBoardArray[i][j];
    }
  }
};
