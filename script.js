const Player = (symbol) => {
  return symbol;
};

const Gameboard = (() => {
  let grid = ["", "", "", "", "", "", "", "", ""];
  const container = document.getElementById("gameboard");

  const getSymbol = (index, symbol) => {
    let img = document.createElement("img");
    img.className = "img-symbol";
    img.id = index;

    if (symbol === "X") {
      img.src = "./images/x-symbol.png";
      return img;
    } else if (symbol === "O") {
      img.src = "./images/o-symbol.png";
      return img;
    } else return "";
  };

  const createBoard = () => {
    container.innerHTML = "";

    Gameboard.grid.forEach((symbol, index) => {
      const imgSymbol = getSymbol(index, symbol);

      const square = document.createElement("div");
      square.className = "square";
      square.setAttribute("data-id", index);
      square.addEventListener("click", Game.addMark);
      square.append(imgSymbol);
      container.append(square);
    });
  };

  return { grid, createBoard };
})();

const Game = (() => {
  let currentPlayer;
  console.log("Game", currentPlayer);

  const start = () => {
    const human = Player("X");
    const computer = Player("O");
    currentPlayer = human;

    Gameboard.createBoard();
  };

  const checkWin = () => {
    let winner = "";
    if (Gameboard.grid.filter(elem => elem === '').length === 0) {
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

    if (Gameboard.grid[id] === "") {
      Gameboard.grid[id] = currentPlayer;
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
    Gameboard.createBoard();
    checkWin();
  };

  const endGame = (winner) => {
    Gameboard.grid = ["", "", "", "", "", "", "", "", ""];

    let msg = "";
    if (winner === "Tie") {
      msg = "It's a tie!";
    } else {
      msg = `${winner} wins!`;
    }
    Modal.openModal(msg);
    winner = "";
  };

  const startGame = () => {
    console.log("startGame", Gameboard.grid);
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

  const newGame = () => {
    Modal.closeModal();
    Game.start();
  };

  return { start, addMark, startGame, newGame };
})();

const Modal = (() => {
  const popup = document.getElementById("myModal");
  const span = document.getElementsByClassName("close")[0];
  const newGameBtn = document.querySelector(".new-game-btn");

  const openModal = (msg) => {
    console.log("openModal", Gameboard.grid);
    const h1 = document.getElementById("winner-heading");
    h1.textContent = msg;
    popup.classList.add("modal-flex");
  };

  const closeModal = (e, outsideClick) => {
    if (outsideClick) {
      if (e.target.classList.contains("modal")) {
        popup.classList.remove("modal-flex");
        popup.classList.add("modal-none");
      }
    } else {
      popup.classList.remove("modal-flex");
      popup.classList.add("modal-none");
    }
  };

  popup.addEventListener("click", (e) => closeModal(e, true));
  span.addEventListener("click", closeModal);
  newGameBtn.addEventListener("click", Game.newGame);

  return { openModal, closeModal };
})();

Game.startGame();
