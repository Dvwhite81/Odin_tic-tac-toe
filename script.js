const gameGrid = (() => {
    // const grid = new Array(9).fill('');
    const grid = ['', 'X', '', 'O', '', '', '', '', '']

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

    return {resetGrid, setSpace, getSpace};
})();

const Player = (symbol) => {

    const getSymbol = () => {
        return symbol;
    }

    return {getSymbol};
}

const squares = document.getElementsByClassName('square');
for (let i = 0; i < 9; i++) {
    const square = squares[i];

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
    }
}
