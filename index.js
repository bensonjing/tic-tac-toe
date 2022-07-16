const cells = document.querySelectorAll(".cell");
const playerName1 = document.querySelector("#player_name_1");
const playerName2 = document.querySelector("#player_name_2");
const restartBtn = document.querySelector("#restart_btn");

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

  const clearBoard = () => {
    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        _board[i][j] = "";
      }
    }
  };

  return { getGameBoard, setCell, clearBoard };
})();

const player = (name, sign) => {
  const getName = () => {
    return name;
  };

  const getSign = () => {
    return sign;
  };

  return { getName, getSign };
};

const gameController = (() => {
  let players = [];
  let currPlayer = null;

  const setPlayer = (player) => {
    players.push(player);
  };

  const _changePlayer = () => {
    currPlayer =
      !currPlayer || currPlayer.getSign() == "O"
        ? players.find((player) => player.getSign() == "X")
        : players.find((player) => player.getSign() == "O");
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
    _changePlayer();
    const board = gameBoard.getGameBoard();
    gameBoard.setCell(pos, currPlayer);
    displayGameBoard(board);
    if (_checkWin(board)) {
      alert(`${currPlayer.getName()} wins`);
      restartGame();
    } else if (_checkDraw(board)) {
      alert("Draw");
      restartGame();
    }
  };
  return { setPlayer, makeMove };
})();

const displayGameBoard = (board) => {
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      cells[j + i * 3].innerHTML = board[i][j];
    }
  }
};

const setPlayer = (e, sign) => {
  const newPlayer = player(e.target.value, sign);
  gameController.setPlayer(newPlayer);
};

const restartGame = () => {
  gameBoard.clearBoard();
  displayGameBoard(gameBoard.getGameBoard());
};

cells.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    gameController.makeMove(e.target.id);
  });
});

playerName1.addEventListener("change", (e) => {
  setPlayer(e, "X");
});

playerName2.addEventListener("change", (e) => {
  setPlayer(e, "O");
});

restartBtn.addEventListener("click", () => {
  restartGame();
});
