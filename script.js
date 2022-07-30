const wrapperElement = document.getElementById('wrapper');

const gameBoardObject = (() => {
    let space = '..';
    let xShape = 'X';
    let oShape = 'O';
    const gameBoard = [[xShape,'|',space,'|',space,],
                        ['-','-','-','-','-',],
                        [xShape,'|',oShape,'|',space,],
                        ['-','-','-','-','-',],
                        [space,'|',space,'|',oShape,],
                        ];

    const displayGameBoard = () => {

        for (row of gameBoard) {
            const rowElement = document.createElement('div');
            
            for (space of row) {
                rowElement.append(space);

            }
            wrapperElement.appendChild(rowElement);
            console.log(row);
        }

    }
    return {displayGameBoard};
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

gameBoardObject.displayGameBoard();

const player1 = players();
player1.playTurn();
