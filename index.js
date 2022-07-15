const cells = document.querySelectorAll(".cell");

const gameBoard = (() => {
  const _board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const getGameBoard = () => {
    return _board;
  };

  // @param {int} pos: two digit number corresponds to the id of cells
  const setCell = (pos, player) => {
    if (_board[pos[0]][pos[1]]) {
      return;
    }
    _board[pos[0]][pos[1]] = player.getSign();
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
  let currPlayer = player("X");

  const _changePlayer = () => {
    currPlayer = currPlayer.getSign() == "X" ? player("O") : player("X");
  };

  const _checkLine = (line) => {
    return (
      line.every((cell) => cell == "X") || line.every((cell) => cell == "O")
    );
  };

  const _checkRows = (board) => {
    for (i = 0; i < 3; i++) {
      if (_checkLine(board[i])) {
        return true;
      }
    }
    return false;
  };

  const _checkColumns = (board) => {
    for (i = 0; i < 3; i++) {
      const column = [];
      for (j = 0; j < 3; j++) {
        column.push(board[j][i]);
      }
      if (_checkLine(column)) {
        return true;
      }
    }
    return false;
  };

  const _checkDiagonals = (board) => {
    return (
      _checkLine([board[0][0], board[1][1], board[2][2]]) ||
      _checkLine([board[0][2], board[1][1], board[2][0]])
    );
  };

  const _checkWin = (board) => {
    return _checkRows(board) || _checkColumns(board) || _checkDiagonals(board);
  };

  const _checkDraw = (board) => {
    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        if (board[i][j] == "") {
          return false;
        }
      }
    }
    return true;
  };

  const makeMove = (pos) => {
    const board = gameBoard.getGameBoard();
    gameBoard.setCell(pos, currPlayer);
    displayGameBoard(board);
    if (_checkWin(board)) {
      console.log(`${currPlayer.getSign()} wins`);
    } else if (_checkDraw(board)) {
      console.log("Draw");
    }
    _changePlayer();
  };
  return { makeMove };
})();

displayGameBoard = (board) => {
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      cells[j + i * 3].innerHTML = board[i][j];
    }
  }
};

cells.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    gameController.makeMove(e.target.id);
  });
});
