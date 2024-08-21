
const DisplayController = (function (){
    function printboard(gameboard)
    {
        let board = document.querySelector(".gameboard");
        let boardArr = "["
        gameboard.forEach(element => {
            boardArr += element + ", ";
        });
        boardArr += "]";
        board.textContent = boardArr;a
    }
    return {printboard};
})();
let Game = (function ()
{
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
    
    P1 = newPlayer(playerName1, symbol1);
    P2 = newPlayer(playerName2, symbol2);
    const PlayOnce = function()
    {
        let round = gameRound(P1, P2);
        let game = round.play();
        if (game == 1)
        {
            P1.incScore();
            console.log(P1.getScore());
        }
        if (game == 2)
        {
            P2.incScore();
            console.log(P2.getScore());
        }
        return game;
    }
    return {PlayOnce};
})();
Game.PlayOnce();
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

function gameRound (player1, player2)
{
    var turn = Math.round(Math.random());
    let gameboard = [];  //[undefined, undefined, undefined undefined];
    function play (){
        while (gameboard.length < 9)
        {
            let slot = prompt("what position do you want?");
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
            if (checkResult() != 0 || gameboard.length == 9)
            {
                DisplayController.printboard(gameboard);
                return checkResult();
            }
        }
        function checkResult() {
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
        
            for (const combo of winningCombos) {
                if (gameboard[combo[0]] === player1.symbol && gameboard[combo[1]] === player1.symbol && gameboard[combo[2]] === player1.symbol) {
                    return 1;
                }
                if (gameboard[combo[0]] === player2.symbol && gameboard[combo[1]] === player2.symbol && gameboard[combo[2]] === player2.symbol) {
                    return 2;
                }
            }
            
            // If no win condition is met, return 0
            return 0;
        }

    }
    return {gameboard, play};
}