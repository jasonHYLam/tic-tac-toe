const wrapperElement = document.getElementById('wrapper');


const gameBoardObject = (() => {

    const gameBoardOld = [" "," "," "," "," "," "," "," "," ",];
    const gameBoardCurrent = ["x","x","x","x","x","x","x","x","x",];
    const gameBoard = ["1","2","3","4","5","6","7","8","9",];


    const getBoardIndex = (index) => {
        console.log(gameBoard[index]);
    }
    const setCell = (marker, index) => {
        gameBoard[index] = marker;
        console.log(gameBoard);

    }
    return {gameBoard, getBoardIndex, setCell};
})();

const displayController = (() => {

    const gameBoard = gameBoardObject.gameBoard

    const displayGameBoard = () => {

        removePreviousGameBoard();
        for (space of gameBoard) {
            const spaceElement = document.createElement('div');
            spaceElement.className = "clickable-space";
            spaceElement.textContent = space;
            wrapperElement.appendChild(spaceElement);
        }
    }

    const removePreviousGameBoard = () => {

        // if (wrapperElement.firstChild) {
        //     for (child of (wrapperElement.children)) {
        //         child.parentNode.removeLastChild(child);
        //     }
        // }
        while (wrapperElement.lastChild) {
            wrapperElement.removeChild(wrapperElement.lastChild);
        }
        console.log(wrapperElement);

    }
    return {displayGameBoard};

})();

const player = (name, marker) => {

    const playTurn = () => {
        console.log("place turned");
    }
    return {
        name,marker, playTurn
    };
}




const game = (() => {
    player1 = player("jaleel","x");
    player2 = player("hm","o");

    let currentPlayer = player1;

    displayController.displayGameBoard();

    const spaces = document.querySelectorAll(".clickable-space");

    spaces.forEach((e, index) => {
        e.addEventListener('click', function(event) {
            gameBoardObject.getBoardIndex(index);
            gameBoardObject.setCell(currentPlayer.marker, index);

            console.log(gameBoardObject.gameBoard);

            displayController.displayGameBoard();

        })
    });


    console.log(player1.marker)
    console.log("hehe pinf");
    return {
        player1, player2, gameBoardObject
    };

})();

game;