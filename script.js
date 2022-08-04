const wrapperElement = document.getElementById('wrapper');

const winningCombinationsObject = (() => {
    const winningCombinations = [
        ["x","x","x","","","","","","",],
        ["","","","x","x","x","","","",],
        ["","","","","","","x","x","x",],
        ["x","","","x","","","x","","",],
        ["","x","","","x","","","x","",],
        ["","","x","","","x","","","x",],
        ["x","","","","x","","","","x",],
        ["","","x","","x","","x","","",],
    ];

    return {winningCombinations}
})();

const gameBoardObject = (() => {

    const gameBoard = Array(9).fill("");
    const gameBoardCurrent = ["x","x","x","x","x","x","x","x","x",];
    const gameBoard3 = ["1","2","3","4","5","6","7","8","9",];

    const setCell = (board, marker, index) => {
        board[index] = marker;
        // return(board);
    }

    const getBoard = () => {
        return [...gameBoard];
    } 
    return {getBoard, setCell};
})();

const displayController = (() => {


    const displayGameBoard = (board) => {

        removePreviousGameBoard();
        for (const space of board) {
            const spaceElement = document.createElement('div');
            spaceElement.className = "clickable-space";
            spaceElement.textContent = space;
            wrapperElement.appendChild(spaceElement);
        }
    }

    const removePreviousGameBoard = () => {

        while (wrapperElement.lastChild) {
            wrapperElement.removeChild(wrapperElement.lastChild);
        }

    }
    return {displayGameBoard};
})();

const player = (name, marker) => {
    return {
        name,marker
    };
}

const game = (() => {
    const player1 = player("jaleel","x");
    const player2 = player("hm","o");

    let currentPlayer = player1;

    const changePlayer = () => {
        if (currentPlayer == player1 ? currentPlayer = player2 : currentPlayer = player1);
    }

    const board = gameBoardObject.getBoard();

    displayController.displayGameBoard(board);

    // const spaces = document.querySelectorAll(".clickable-space");


    document.addEventListener('click', function(e) {
        if (e.target.className == 'clickable-space') {
            let space = e.target;
            let index = Array.from(space.parentNode.children).indexOf(space);
            
            if (space.textContent == "") {
                gameBoardObject.setCell(board,currentPlayer.marker, index);
                displayController.displayGameBoard(board);
                changePlayer();

            }

        }
    })

    // spaces.forEach((e, index) => {
    //     e.addEventListener('click', function(event) {
    //         gameBoardObject.setCell(board, player1.marker, index);
    //         console.log(board);

    //         displayController.displayGameBoard(board);

    //         changePlayer();
    //         console.log(currentPlayer.marker);
    //     });
    // });
})();