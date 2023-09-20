const Player = (symbol) => {
  return symbol;
};

const Gameboard = (() => {
  let grid = ["X", "", "", "", "O", "", "", "", ""];
  const htmlGrid = [];
  const container = document.querySelector(".gameboard");

  const getSymbol = (index, symbol) => {
    if (symbol === "X") {
      return `
                <img id="${index}" src="./images/x-symbol.png">
            `;
    } else if (symbol === "O") {
      return `
                <img id="${index}" src="./images/o-symbol.png">
            `;
    } else return "";
  };

  const createBoard = () => {
    let html = "";
    grid.forEach((symbol, index) => {
      const imgSymbol = getSymbol(index, symbol);

      html += `
                <div class="square" data-id="${index}">${imgSymbol}</div>
            `;
    });

    container.innerHTML = html;

    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", Game.addMark);
    });
  };

  const availableMoves = () => {
    let open = [];
    grid.forEach((space) => {
      if (space === "") {
        open.push(space);
      }
    });

    return open;
  };

  const resetGrid = () => {
    grid = ["X", "", "", "", "O", "", "", "", ""];
  };

  return { grid, createBoard, availableMoves, resetGrid };
})();

const Game = (() => {
  let currentPlayer;
  console.log("Game", currentPlayer);
  let gameOver = false;

  const start = () => {
    const human = Player("X");
    console.log("human", human);
    const computer = Player("O");
    players = [human, computer];
    currentPlayer = human;

    Gameboard.createBoard();
  };

  const checkWin = () => {
    let winner = "";
    if (Gameboard.availableMoves().length === 0) {
      winner = "Tie";
    }

    const g = Gameboard.grid;
    // Horizontal
    if (g[0] !== "" && g[0] === g[1] && g[1] === g[2]) winner = g[0];
    if (g[3] !== "" && g[3] === g[4] && g[4] === g[5]) winner = g[3];
    if (g[6] !== "" && g[6] === g[7] && g[7] === g[8]) winner = g[6];

    // Vertical
    if (g[0] !== "" && g[0] === g[3] && g[3] === g[6]) winner = g[0];
    if (g[1] !== "" && g[1] === g[4] && g[4] === g[7]) winner = g[1];
    if (g[2] !== "" && g[2] === g[5] && g[5] === g[8]) winner = g[2];

    // Diagonal
    if (g[0] !== "" && g[0] === g[4] && g[4] === g[8]) winner = g[0];
    if (g[6] !== "" && g[6] === g[4] && g[4] === g[2]) winner = g[6];

    // End game
    if (winner !== "") {
      endGame(winner);
    }
  };

  const addMark = (e) => {
    const id = e.target.dataset.id;

    Gameboard.grid[id] = currentPlayer;
    Gameboard.createBoard();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    checkWin();
  };

  const endGame = (winner) => {
    // Draw a line?
    Gameboard.resetGrid();
    // Make a modal
    let msg = "";
    if (winner === "Tie") {
      msg = "It's a tie!";
    } else {
      msg = `${winner} wins!`;
    }
    Modal.openModal(msg);
  };

  return { start, addMark };
})();

const startGame = () => {
  const startBtn = document.getElementById("startBtn");
  startBtn.addEventListener("click", () => {
    const container = document.querySelector(".gameboard");
    container.classList.remove("small");
    container.classList.add("grow");
    startBtn.classList.add("small");
    startBtn.remove();
    Game.start();
  });
};

const Modal = (() => {
    const popup = document.getElementById('myModal');
    const span = document.getElementsByClassName("close")[0];
    const newGameBtn = document.querySelector(".new-game-btn");

    const openModal = (msg) => {
      const h1 = document.getElementById("winner-heading");
      h1.textContent = msg;
      popup.style.display = "flex";
    };

    const closeModal = (e, outsideClick) => {
      if (outsideClick) {
        if (e.target.classList.contains("modal-overlay")) {
          popup.style.display = "none";
        }
      } else {
        popup.style.display = "none";
    }
    };

    popup.addEventListener("click", (e) => closeModal(e, true));
    span.addEventListener("click", closeModal);
    newGameBtn.addEventListener("click", startGame);

    return { openModal };
  })();

startGame();
