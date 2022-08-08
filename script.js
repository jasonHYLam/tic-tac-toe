const gridContainer = document.getElementById('grid-container');

const player1NameInput = document.getElementById("player1-name-input");
const player2NameInput = document.getElementById("player2-name-input");
const playButton = document.getElementById("play-button");

const currentTurnDiv= document.getElementById('current-turn-div');
const currentMarkerDiv= document.getElementById('current-marker-div');

let player1NameText = document.getElementById('player1-name-text');
let player2NameText = document.getElementById('player2-name-text');
let playerNameInput = document.querySelectorAll('name-input');

playButton.addEventListener('click', function(e) {

    e.preventDefault();

    game.gameStart = true;

    game.player1.name = player1NameInput.value ? player1NameInput.value : "Player 1";
    game.player2.name = player2NameInput.value ? player2NameInput.value : "Player 2";

    player1NameInput.style.display = 'none';
    player2NameInput.style.display = 'none';

    player1NameText.style.display = 'inline-block';
    player2NameText.style.display = 'inline-block';

    player1NameText.textContent = game.player1.name;
    player2NameText.textContent = game.player2.name;

    const gameTextContainer = document.getElementById('game-text-container');
    gameTextContainer.style.display = 'grid';

    game.currentPlayer = game.player1;

    game.displayGameText(game.currentPlayer);

    playButton.style.display = 'none';

})

const gameBoardObject = (() => {

    let gameBoard = Array(9).fill("");

    const setCell = (board, marker, index) => {
        board[index] = marker;
    }

    const getBoard = () => {
        return [...gameBoard];
    } 

    const resetBoard = () => {
        gameBoard = Array(9).fill("");
    }
    return {getBoard, setCell, resetBoard};
})();


const displayController = (() => {

    const displayGameBoard = (board) => {

        removePreviousGameBoard();
        for (const space of board) {
            const spaceElement = document.createElement('div');
            spaceElement.classList.add("clickable-space");
            textContainer = document.createElement('div');
            textContainer.className = "text-container";
            textContainer.textContent = space;
            spaceElement.appendChild(textContainer);
            gridContainer.appendChild(spaceElement);
        }
    }

    const removePreviousGameBoard = () => {
        while (gridContainer.lastChild) {
            gridContainer.removeChild(gridContainer.lastChild);
        }
    }

    const declareCurrentCell = (index) => {
        gridContainer.children[index].classList.add('current-cell');
    }

    return {displayGameBoard, declareCurrentCell};
})();

const player = (name, marker) => {
    return {
        name,marker
    };
}

const game = (() => {
    const player1 = player(player1NameInput.value,"x");
    const player2 = player(player2NameInput.value,"o");


    const changePlayer = () => {
        if (currentPlayer == player1 ? currentPlayer = player2 : currentPlayer = player1);
    }

    let board = gameBoardObject.getBoard();

    let currentPlayer = player1;

    displayController.displayGameBoard(board);

    let gameStart = false;
    let gameContinue = true;

        document.addEventListener('click', function(e) {
        gameStart;
        if (gameStart) {
            if (e.target.closest('.clickable-space').classList.contains('clickable-space')) {
                
                let space = e.target.closest('.clickable-space');
                let index = Array.from(space.parentNode.children).indexOf(space);
                
                if (gameContinue) {
                    if (space.textContent == "") {
                        gameBoardObject.setCell(board,currentPlayer.marker, index);
                        displayController.displayGameBoard(board);
                        displayController.declareCurrentCell(index);
                        console.log(board);

                        // logic that checks for wins
                        const currentPlayerMarkerIndexes = board.map((element, index) => {
                            if (element == currentPlayer.marker) {
                                return index;
                            };
                        }).filter(element => element >= 0);

                        const isSubset = (arr1, arr2) => {
                            return arr2.every((element) => arr1.includes(element));
                        };

                        const checkWin = () => winningCombinationsObject.winningCombinations.some((e) => {
                            return isSubset(currentPlayerMarkerIndexes, e);
                        });

                        if (checkWin()) {
                            gameContinue = false;
                            createPopup('win');
                            gameStart = false;
                        } else {
                            
                            if (!board.includes("")) {
                                gameContinue = false;
                                createPopup('tie');
                                gameStart = false;
                            }
                        }

                        //if no win/draw, change player
                        changePlayer();
                        displayGameText(currentPlayer);
                    }

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

    const createPopup = (gameOutcome) => {
        const popupContainer = document.createElement('div');
        popupContainer.id = 'popup-container';

        popupInnerContainer = document.createElement('div');
        popupInnerContainer.id = 'popup-inner-container';
        
        popupContainer.appendChild(popupInnerContainer);

        const gameResultText = document.createElement('p');

        const gameTextContainer = document.getElementById('game-text-container');
        gameTextContainer.style.display = 'none';

        if (gameOutcome == 'win') {
            gameResultText.textContent = `${currentPlayer.name} WINS`;
        } else if (gameOutcome == 'tie') {
            gameResultText.textContent = "It's a tie!";
        }

        popupInnerContainer.appendChild(gameResultText);

        const playAgainButton = document.createElement('button');
        playAgainButton.id = 'play-again-button';
        playAgainButton.textContent = "Play Again?";
        //logic when restarting game
        playAgainButton.addEventListener('click', () => {
            gameBoardObject.resetBoard();
            
            // reset gameboard
            board = gameBoardObject.getBoard();
            displayController.displayGameBoard(board);
            gameContinue = true;

            // display/hide html
            playButton.style.display= 'inline-block';
            body.removeChild(popupContainer);
            player1NameInput.style.display = 'inline-block';
            player2NameInput.style.display = 'inline-block';

            player1NameText.style.display = 'none';
            player2NameText.style.display = 'none';

            player1NameInput.value = "";
            player2NameInput.value = "";




        })
        popupInnerContainer.appendChild(playAgainButton);


        const body = document.querySelector('body');
        body.appendChild(popupContainer);
    }


    const displayGameText = (currentPlayer) => {
        currentTurnDiv.textContent =`${currentPlayer.name}'s turn`;
        currentMarkerDiv.textContent =`${currentPlayer.marker}`;
    }

    const getGamestart = () => {
        return gameStart
    }

    const setGamestart = (boolean) => {
        gameStart = boolean;
    }
    return {
        player1,
        player2,
        displayGameText,
        get currentPlayer(){return currentPlayer},
        set currentPlayer(val){currentPlayer = val},
        get gameStart(){return gameStart},
        set gameStart(boolean){gameStart = boolean},
        }
})();



