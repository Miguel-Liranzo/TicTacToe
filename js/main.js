/* ----- constants ----- */

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];



/* ----- app's state (variables) ----- */

let board;
let turn = 'X';
let win;



/* ----- cached element references ----- */

const squares = Array.from(document.querySelectorAll('#board div'));
const messages = document.querySelector('h2');
const image = document.getElementById('winning-gif');



/* ----- event listeners ----- */

function addEventListeners() {
    document.getElementById('board').addEventListener('click', handleTurn);
    document.getElementById('reset-button').addEventListener('click', init);
}


/* ----- functions ----- */

init();

function init() {
    board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];

    addEventListeners();

    turn = 'X';
    win = undefined;

    image.style.display = 'none';

    render();
}

function render() {
    board.forEach( (mark, index) => {
        console.log(mark, index);
        squares[index].textContent = mark;
    });

    messages.textContent = win === 'T' ? 'Tie!' : win ? `${win} wins the game!` : `It's ${turn}'s turn!`;
}

function handleTurn(event) {
    let idx = squares.findIndex( square => {
        return square === event.target;
    });

    if (board[idx] === '') {
        board[idx] = turn;
        squares[idx]

        turn = turn === 'X' ? 'O' : 'X';

        win = getWinner();
    }
    
    if (win) {
        document.getElementById('board').removeEventListener('click', handleTurn);
        image.style.display = '';
    }

    render();
}

function getWinner() {
    let winner = null;

    winningCombos.forEach( (combo, index) => {

        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && 
                board[combo[0]] === board[combo[2]]) {
                    winner = board[combo[0]];
                }
    });
    
    return winner ? winner : board.includes('') ? null : 'T';
}