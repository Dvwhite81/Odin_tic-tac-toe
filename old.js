const gameGrid = (() => {
    // const grid = new Array(9).fill('');
    const grid = ['', 'X', '', 'O', '', '', '', '', ''];
    const squares = Array.from(document.getElementsByClassName('square'));
    let currentPlayer = 'X';
    let gameOver = false;

    const resetGrid = () => {
        for (let i = 0; i < grid.length; i++) {
            grid[i] = '';
        }
    }

    const setSpace = (index, mark) => {
        grid[index] = mark;
    }

    const getSpace = (index) => {
        return grid[index];
    }

    const openSpaces = () => {
        let open = [];
        grid.forEach(space => {
            if (space === '') {
                open.push(space);
            }
        });

        return open;
    }

    return {grid, resetGrid, setSpace, getSpace, openSpaces};
})();

const Player = (symbol) => {

    const getSymbol = () => {
        return symbol;
    }

    return {getSymbol};
}

const htmlBoard = () => {
    const squares = document.querySelectorAll('.square');
    console.log(squares)
    squares.forEach((square) => {
        let i = square.dataset.id;
        let symbol;
        if (gameGrid.getSpace(i) === '') {
            // nothing
        }
        else {
            const img = document.createElement('img');

            if (gameGrid.getSpace(i) === 'X') symbol = './images/x-symbol.png';
            else if (gameGrid.getSpace(i) === 'O') symbol = './images/o-symbol.png';

            img.setAttribute('src', symbol);
            square.appendChild(img);

            square.addEventListener('click', () => {
                gameGrid.setSpace()
            });
        }

    });
}


const playGame = (() => {
    const human = Player('X');
    const computer = Player('O');

    let gameOver = false;
    let currentPlayer = human;

    const availableMoves = gameGrid.openSpaces();

    const makeMove = (e) => {
        const index = e;
        console.log('index',index)
        gameGrid.setSpace(index, currentPlayer.getSymbol());
        htmlBoard();
    }

    return {makeMove}

})();

htmlBoard();

const squares = Array.from(document.querySelectorAll('.square'));
squares.forEach((square) => {
    square.addEventListener('click', () => {
        playGame.makeMove();
        htmlBoard();
    })
});


const createBoard = () => {
    console.log('a')
    let html = '';
    grid.forEach((index, symbol) => {
        const imgSymbol = getSymbol(index, symbol);

        html += `
            <div class="square" id="square-${index}">${imgSymbol}</div>
        `;
        console.log(html)
    });

    container.append(html);
}
