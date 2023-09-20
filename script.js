const Player = (name, symbol) => {
  return { name, symbol };
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

  const removeListeners = () => {
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) =>
      square.removeEventListener("click", Game.addMark)
    );
  };

  return { grid, createBoard, removeListeners };
})();

const Game = (() => {
  let currentPlayer;
  let players;

  const setPlayers = (a, b) => {
    players = [a, b];
  };

  const switchPlayers = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  const getPlayerName = () => {
    return players[0];
  };

  const start = (userName) => {
    const popup = document.getElementById('startModal');
    console.log('start - classlist:', popup.classList)
    console.log('start')
    const human = Player(userName, "X");
    const computer = Player("The Computer", "O");
    currentPlayer = human;
    setPlayers(human, computer);
    Gameboard.createBoard();
  };

  const checkWin = () => {
    let winner = "";
    if (Gameboard.grid.filter((elem) => elem === "").length === 0) {
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
      endGame(currentPlayer.name);
    }
  };

  const addMark = (e) => {
    const id = e.target.dataset.id;

    if (Gameboard.grid[id] === "") {
      Gameboard.grid[id] = currentPlayer.symbol;
      Gameboard.createBoard();
      checkWin();
      switchPlayers();
    } else {
      alert("Choose an empty space");
    }
  };

  const endGame = (winner) => {
    console.log('endgame')
    Gameboard.removeListeners();
    Gameboard.grid = ["", "", "", "", "", "", "", "", ""];

    let msg = "";
    if (winner === "Tie") {
      msg = "It's a tie!";
    } else {
      msg = `${winner} wins!`;
    }
    const modal = Modal("end");
    modal.openModal("end", msg);
    winner = "";
  };

  const startGame = () => {
    console.log('startgame')
    const popup = document.getElementById('startModal');
    console.log('startgame 1 - classlist:', popup.classList)
    const startBtn = document.getElementById("start-btn");
    startBtn.addEventListener("click", () => {
      const modal = Modal("start");
      modal.openModal("start");
      const popup = document.getElementById('startModal');
      console.log('startgame 2 - classlist:', popup.classList)
      const startModal = document.getElementById('startModal');
    });
  };

  const getUserName = () => {
    let popup = document.getElementById('startModal');
    console.log('getusername 1 - classlist:', popup.classList)
    console.log('players', players)

    if (players !== undefined) {
        let popup = document.getElementById('startModal');
        console.log('getusername - 2 - classlist:', popup.classList)
        console.log('players[0]', players[0])
        console.log('players[0].name', players[0].name)
        Game.newGame(players[0].name);
    } else {
        const input = document.getElementById("user-name");
        const userName = input.value;
        const container = document.querySelector(".gameboard");
        container.classList.remove("small");
        container.classList.add("grow");
        const startContainer = document.getElementById("start-container");
        startContainer.classList.add("small");
        startContainer.remove();
        let popup = document.getElementById('startModal');
        console.log('getusername - 3 - classlist:', popup.classList)

        Game.newGame(userName);
        popup = document.getElementById('startModal');
        console.log('getusername - 4 - classlist:', popup.classList)

    }
  };

  const newGame = (userName) => {
    console.log('newgame')
    const modal = Modal("end");
    modal.closeModal();
    Game.start(userName);
  };

  return { start, addMark, startGame, newGame, getUserName, getPlayerName };
})();

const Modal = (type) => {
  const popup = document.getElementById(`${type}Modal`);
  const span = document.querySelector(".close-modal-btn");
  const modalSubmitBtn = document.querySelector(`.${type}-game-btn`);

  const openModal = (type, msg) => {
    if (type === "start") {
    } else {
      const h1 = document.getElementById(`${type}-heading`);
      h1.textContent = msg;
    }
    console.log('openmodal 1',popup.classList)
    console.log('openmodal 2', popup.classList)


    popup.classList.add('grow')
    console.log('openmodal 3', popup.classList)

  };

  const closeModal = () => {
    popup.classList.remove("grow");
  };

  modalSubmitBtn.addEventListener("click", () => {
    closeModal();
    Game.getUserName();
  });

  return { openModal, closeModal };
};

Game.startGame();
