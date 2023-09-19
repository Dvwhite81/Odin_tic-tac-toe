const Player = (symbol) => {
    return symbol;
};

const Gameboard = (() => {
    const grid = ['X', '', '', '', 'O', '', '', '', ''];
    const htmlGrid = [];
    const container = document.querySelector('.gameboard');

    const getSymbol = (index, symbol) => {
        if (symbol === 'X') {
            return `
                <img id="${index}" src="./images/x-symbol.png">
            `;
        }
        else if (symbol === 'O') {
            return `
                <img id="${index}" src="./images/o-symbol.png">
            `
        }
        else return '';
    }

    const createBoard = () => {
        let html = '';
        grid.forEach((symbol, index) => {
            const imgSymbol = getSymbol(index, symbol);

            html += `
                <div class="square" data-id="${index}">${imgSymbol}</div>
            `;
        });

        container.innerHTML = html;

        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.addEventListener('click', Game.addMark)
        })
    }

    return {grid, createBoard};
})();

const Game = (() => {
    let players;
    let currentPlayer;
    console.log('Game', currentPlayer)
    let gameOver = false;

    const start = () => {
        const human = Player('X');
        const computer = Player('O');
        players = [human, computer];
        currentPlayer = human;

        Gameboard.createBoard();
    }

    const addMark = (e) => {
        const id = e.target.dataset.id;

        Gameboard.grid[id] = currentPlayer;
        Gameboard.createBoard();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    return {start, addMark};
})();

const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', () => {
    Game.start();
});
