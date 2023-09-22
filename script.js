const Player = (name, symbol) => {
    return { name, symbol };
  };

  const CPU = (() => {

    const validMoves = () => {
      console.log("validmoves");
      const moves = [];
      const grid = Gameboard.grid;

      for (let i = 0; i < 9; i++) {
        if (grid[i] === "") {
          moves.push(i);
        }
      }
      return moves;
    };

    const randomMove = () => {
      console.log("randommove");
      const moves = validMoves();
      const length = moves.length;
      const random = Math.floor(Math.random() * length);
      return moves[random];
    };

    const makeMove = () => {
      console.log("makemove");
      const move = CPU.randomMove();
      Game.addMark(move);
    };

    return { validMoves, randomMove, makeMove };
  })();

  const Gameboard = (() => {
    let grid = ["", "", "", "", "", "", "", "", ""];
    const container = document.getElementById("gameboard");

    const getSymbol = (index, symbol) => {
      console.log("getsymbol");
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
        square.append(imgSymbol);
        container.append(square);
      });
    };

    const addListeners = () => {
      console.log("addListeners");
      const squares = document.querySelectorAll(".square");
      squares.forEach((square) => square.addEventListener("click", Game.getMove));
    };

    const removeListeners = () => {
      console.log("removeListeners");
      const squares = document.querySelectorAll(".square");
      squares.forEach((square) =>
        square.removeEventListener("click", Game.getMove)
      );
    };

    const getScoreboardElements = () => {
      const playerScore = document.getElementById('player-score');
      const cpuScore = document.getElementById('cpu-score');

      return [playerScore, cpuScore];
    }

    const updateScoreboard = (scores) => {
      const [playerScore, cpuScore] = getScoreboardElements();
      playerScore.textContent = scores[0];
      cpuScore.textContent = scores[1];
    }

    const setScoreboard = (scores) => {
      const scoreboard = document.getElementById('score-container');
      scoreboard.classList.add('flex');
      scoreboard.classList.remove('none');

      updateScoreboard(scores);
    }

    return { grid, createBoard, addListeners, removeListeners, getScoreboardElements, updateScoreboard, setScoreboard };
  })();

  const Game = (() => {
    let currentPlayer;
    let players;
    let gameOver;
    let score = {
      human: 0,
      cpu: 0
    };

    const setPlayers = (a, b) => {
      console.log("setplayers");
      players = [a, b];
    };

    const switchPlayers = () => {
      console.log("switchplayers");
      currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
      takeTurn();
    };

    const getPlayerName = (symbol) => {
      console.log("getplayername");
      const player = players.find((player) => player.symbol === symbol);
      const name = player.name;
      return name;
    };

    const start = (userName) => {
      console.log("start");
      const human = Player(userName, 'X');
      const computer = Player("The Computer", 'O');
      currentPlayer = human;
      setPlayers(human, computer);
      Gameboard.createBoard();
      gameOver = false;
      console.log("start - gameover", gameOver);
      Gameboard.setScoreboard([score['human'], score['cpu']]);
      Game.takeTurn();
    };

    const checkWin = () => {
      console.log("checkwin");
      let winner = "";

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

      if (winner === "" && CPU.validMoves().length === 0) {
        console.log("checkwin - tie");
        winner = "Tie";
      }

      // End game
      if (winner !== "") {
        endGame(winner);
      }
    };

    const addMark = (id) => {
      console.log("addMark");

      Gameboard.grid[id] = currentPlayer.symbol;
      Gameboard.createBoard();
      checkWin();
      if (!gameOver) {
        switchPlayers();
      }
    };

    const getMove = (e) => {
      console.log("getmove");
      const id = e.target.dataset.id;
      if (Gameboard.grid[id] === "") {
        Gameboard.grid[id] === currentPlayer.symbol;
      } else {
        alert("Choose an empty space");
      }

      addMark(id);
    };

    const endGame = (winner) => {
      console.log("endgame");
      gameOver = true;
      Gameboard.removeListeners();
      Gameboard.grid = ["", "", "", "", "", "", "", "", ""];

      let msg = "";
      if (winner === "Tie") {
        msg = "It's a tie!";
      } else {
        const name = Game.getPlayerName(winner);
        msg = `${name} wins!`;

        if (name === 'The Computer') {
          score['cpu']++;
        } else {
          score['human']++;
        }
        Gameboard.updateScoreboard([score['human'], score['cpu']])
      }
      const modal = Modal("end");
      modal.openModal("end", gameOver, msg);
      winner = "";
    };

    const startGame = () => {
      console.log("startgame");
      const startBtn = document.getElementById("start-btn");
      startBtn.addEventListener("click", () => {
        const modal = Modal("start");
        modal.openModal("start", gameOver);
      });
    };

    const test1 = () => {
      console.log("test1");
      const userName = players[0].name;

      return userName;
    };

    const test2 = () => {
      console.log("test2");
      const input = document.getElementById("user-name");
      const userName = input.value;

      const container = document.querySelector(".gameboard");
      container.classList.remove("small");
      container.classList.add("grow");
      const startContainer = document.getElementById("start-container");
      startContainer.classList.add("small");
      startContainer.remove();

      Gameboard.setScoreboard([0, 0]);

      return userName;
    };

    const getUserName = async () => {
      console.log("getusername");
      let userName;

      if (players !== undefined) {
        console.log("getusername - if");
        userName = await test1();
      } else {
        console.log("getusername - else");
        userName = await test2();
      }
      Game.newGame(userName);
    };

    const newGame = (userName) => {
      console.log("newgame");
      const modal = Modal("end");
      modal.closeModal();
      Game.start(userName);
    };

    const takeTurn = () => {
      console.log("taketurn");
      if (currentPlayer.name === "The Computer") {
        console.log("computer turn");
        Gameboard.removeListeners();
        setTimeout(() => {
          CPU.makeMove();
        }, "1000");
      } else {
        console.log("player turn");
        Gameboard.addListeners();
      }
    };


    const winningCombos = () => {
      const combos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]
    }

    return {
      start,
      addMark,
      startGame,
      newGame,
      getUserName,
      getPlayerName,
      getMove,
      takeTurn,
      test1,
      winningCombos
    };
  })();

  const Modal = (type) => {
    const popup = document.getElementById(`${type}Modal`);
    const span = document.querySelector(".close-modal-btn");
    const startSubmitBtn = document.querySelector(".start-game-btn");
    const endSubmitBtn = document.querySelector(".end-game-btn");

    const openModal = (type, gameOver, msg) => {
      console.log("openmodal - type", type);
      console.log("openmodal - gameover", gameOver);
      if (type === "start") {
        // nothing
      } else {
        const h1 = document.getElementById(`${type}-heading`);
        h1.textContent = msg;
      }
      popup.classList.add("grow");
    };

    const closeModal = () => {
      console.log("closemodal");
      popup.classList.remove("grow");
    };

    startSubmitBtn.addEventListener("click", () => {
      closeModal();
      console.log("listener - start");
      Game.getUserName();
    });

    endSubmitBtn.addEventListener("click", () => {
      console.log("listener - end");
      let userName = Game.test1();
      console.log(userName)
      Game.getUserName();

    });

    span.addEventListener("click", () => {
      closeModal();
      Game.getUserName();
    });

    return { openModal, closeModal };
  };

  Game.startGame();
