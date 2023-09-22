// Gameboard?
const grid = [
    "X", "", "X",
    "O", "", "O",
    "X", "X", "X"
];

// Game?
const winCombos = [
    [0, 1, 2], // X _ X -- Possible win     a b c
    [3, 4, 5], // O _ O -- Possible block   d e f
    [6, 7, 8], // X X X -- Win              g h i
    [0, 3, 6], // X O X --                  a d g
    [1, 4, 7], // _ _ X --                  b e h
    [2, 5, 8], // X O X --                  c f i
    [0, 4, 8], // X _ X -- Possible win     a e i
    [6, 4, 2]  // X _ X -- Possible win     g e c
];

// CPU
const validMoves = () => {
    const moves = [];

    for (let i = 0; i < 9; i++) {
        if (grid[i] === "") {
            moves.push(i);
        }
    }
    return moves;
}

// CPU
const randomMove = () => {

}

// CPU
const bestMove = () => {

}

// CPU
const makeMove = () => {

}

const checkBoard = () => {
    let xMoves = [];
    let oMoves = [];
    let wins = false;
    for (let i = 0; i < 8; i++) {
        let combo = winCombos[i];
        let row = [grid[combo[0]], grid[combo[1]], grid[combo[2]]];

        let xCount = count(row, 'X');
        let oCount = count(row, 'O');

        if (xCount === 3 || oCount === 3) {
            wins = true;
        }
         else if (xCount === 2) {
            for (let j = 0; j < 3; j++) {
                let item = combo[j];
                let square = grid[item];

                if (square === '') {
                    xMoves.push(winCombos[i][j]);
                }
            }
        }
        else if (oCount === 2) {
            for (let j = 0; j < 3; j++) {
                let item = combo[j];
                let square = grid[item];

                if (square === '') {
                    oMoves.push(winCombos[i][j]);
                }
            }
        }
    }

    return {
        wins: wins,
        xMoves: xMoves,
        oMoves: oMoves
    }
};

const count = (arr, val) => {
    return arr.reduce((a,v) => (v === val ? a + 1 : a), 0);
};

console.log('wins:', checkBoard()['wins']);
console.log('xmoves:',checkBoard()['xMoves']);
console.log('omoves:',checkBoard()['oMoves']);
console.log('valid', validMoves())
