const gameBoardObject = (() => {
    const gameBoard = [[' ','|',' ','|',' ',],
                        ['_','_','_','_','_',],
                        [' ','|',' ','|',' ',],
                        ['_','_','_','_','_',],
                        [' ','|',' ','|',' ',],
                        ];

    return {gameBoard};
})();

const displayController = (() => {

})();

const players = () => {
    const playTurn = () => {
        console.log("place turned");
    }
    return {
        playTurn
    };
}

console.log(gameBoardObject.gameBoard);

const player1 = players();
player1.playTurn();