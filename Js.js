
let Game = (function ()
{
    const displayController = (function (){
        function printboard(gameboard)
        {
            let cells = document.querySelectorAll(".cell");
            cells.forEach((cell, index) =>
            {
                cell.textContent = gameboard[index] || "";
            })
        }
        function printGameScore(returnedGame, player1, player2)
        {
            let gameText = document.querySelector(".gameScore");
            if (returnedGame == 1)
            {
                gameText.innerHTML = `Congratulations to ${player1.name} you win!`;
            }
            else if (returnedGame == 2)
            {
                gameText.innerHTML = `Congratulations to ${player2.name} you win!`;
            }
            else if (returnedGame == 0)
            {
                gameText.innerHTML = `The game ended with a draw!`;
            }
        }
        function printTotalScore(player1, player2)
        {
            let scoreText = document.querySelector(".totalGameScore");
            scoreText.innerHTML = `The current score is now ${player1.name} ${player1.getScore()} - ${player2.getScore()} ${player2.name}`;
        }
        function printTurn(player1, player2, turn)
        {
            let turnText = document.querySelector(".turn");
            if (turn == 0)
                turnText.innerHTML = `It is now ${player1.name}'s turn`;
            if (turn == 1)
                turnText.innerHTML = `It is now ${player2.name}'s turn`;
        }
        function clearCells()
        {
            let cells = document.querySelectorAll(".cell");
            cells.forEach((cell) =>
            {
                cell.textContent = "";
            })
        }
        return {printboard, printGameScore, printTotalScore, printTurn, clearCells};
    })();
    let initialize = function()
    {
        let cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => 
        {
            cell.addEventListener("click", cellClickListener);
        });
        let playAgain = document.querySelector(".playAgain");
        playAgain.addEventListener("click", () =>
        {
            playOnce();
        });
    };
    let playOnce = () => {
        round = gameRound(P1, P2, displayController);
        displayController.clearCells();
        enableCells(); // Re-enable cells for the new game
    }
    let cellClickListener = function (e) {
        let slot = e.target.dataset.index;
        let game = round.play(slot);
        if (game != null) {
            if (game == 1) {
                P1.incScore();
                displayController.printGameScore(1, P1, P2);
            } else if (game == 2) {
                P2.incScore();
                displayController.printGameScore(2, P1, P2);
            } else if (game == 0) {
                displayController.printGameScore(0, P1, P2);
            }
            displayController.printTotalScore(P1, P2);
            disableCells(); // Disable cells after game ends
        }
    };
    function disableCells() {
        let cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => {
            cell.removeEventListener("click", cellClickListener);
        });
    }

    function enableCells() {
        let cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => {
            cell.addEventListener("click", cellClickListener);
        });
    }

    let playerName1 = prompt("Name of first player: ");
    let symbol1 = prompt("Symbol of first player: ");
    let playerName2;
    do {
        console.log("player two, choose a name different from player one");
        playerName2 = prompt("Name of Second player: ");    
    } while (playerName1 == playerName2);
    
    let symbol2;
    do {
        console.log("player two, choose a symbol different from player one");
        symbol2 = prompt("Symbol of Second player: ");
    } while (symbol1 == symbol2);
    
    const P1 = newPlayer(playerName1, symbol1);
    const P2 = newPlayer(playerName2, symbol2);
    let round = gameRound(P1, P2, displayController);
    return {playOnce, initialize};
})();
Game.initialize();

function gameRound (player1, player2, displayController)
{
    var turn = Math.round(Math.random());
    let gameboard = Array(9).fill(null);
    let counter = 0;



    function play (slot){
                if (gameboard[slot] === null)
                {
                    counter++;
                    displayController.printTurn(player1, player2, turn);
                    if (turn == 0)
                    {
                        gameboard[slot] = player1.symbol;
                        turn = 1;
                    }
                    else
                    {
                        gameboard[slot] = player2.symbol;
                        turn = 0;
                    }
                    displayController.printTurn(player1, player2, turn);
                    displayController.printboard(gameboard);
                if (checkResult() != 0 || counter == 9)
                {
                    return checkResult();
                }
                }
        }



        function checkResult() {
            const winningCombos = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
    
            for (const [a, b, c] of winningCombos) {
                if (gameboard[a] && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c]) {
                    return gameboard[a] === player1.symbol ? 1 : 2;
                }
            }
            return gameboard.every(cell => cell !== null) ? 0 : null; // Return 0 for draw if all cells are filled
        }
        
        return {gameboard, play};
}




function newPlayer(name, symbol)
{
    this.name = name;
    let score = 0;
    this.symbol = symbol
    function getScore()
    {
        return score;
    }
    function incScore()
    {
        score++;
    }
    return {name, symbol, getScore, incScore};
}