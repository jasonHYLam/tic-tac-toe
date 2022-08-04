const wrapperElement = document.getElementById('wrapper');


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
            gameContinue = true;


    document.addEventListener('click', function(e) {
        if (e.target.className == 'clickable-space') {
            let space = e.target;
            let index = Array.from(space.parentNode.children).indexOf(space);

        
            
            if (gameContinue) {
                if (space.textContent == "") {
                    gameBoardObject.setCell(board,currentPlayer.marker, index);
                    displayController.displayGameBoard(board);


                    const indii = board.map((element, index) => {
                        if (element == currentPlayer.marker) {
                            return index;
                        };
                    }).filter(element => element >= 0);

                    const isSubset = (arr1, arr2) => {
                        return arr2.every((element) => arr1.includes(element));
                    };

                    // for (combination of winningCombinationsObject.winningCombinations) {
                    //     if (isSubset(indii, combination)) {
                    //         console.log(`${currentPlayer.name} won!`);
                    //         gameContinue = false;
                    //     };
                    // }
                    const thisIsTheOne = () => winningCombinationsObject.winningCombinations.some((e) => {
                        return e.every((element) => indii.includes(element));
                    });

                    if (thisIsTheOne()) {
                        gameContinue = false;
                    }

                    // for (combination of winningCombinationsObject.winningCombinations) {
                    //     if (isSubset(indii, combination)) {
                    //         console.log(`${currentPlayer.name} won!`);
                    //         gameContinue = false;
                    //     };
                    // }
                    changePlayer();
                }

            }
        }
    });

    const winningCombinationsObject = (() => {
        const winningCombinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];

        return {winningCombinations}
    })();
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