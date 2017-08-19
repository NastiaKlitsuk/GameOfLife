import { Game } from './game';
import { ViewManager } from './view-manager';

$(document).ready(function () {
    const ROWS_COUNT = 28;
    const COLUMNS_COUNT = 28;
    let gameBoard = new Game(ROWS_COUNT, COLUMNS_COUNT);
    let viewManager = new ViewManager(ROWS_COUNT, COLUMNS_COUNT);
    let isStopGame = false;

    let buttonStartGame = document.querySelector('#start-game');
    buttonStartGame.addEventListener("click", () => {
        document.querySelector('#start-game').disabled=true;
        setInterval(() => {
            if (!isStopGame) {
                gameBoard.buildNextGenertion();
                viewManager.drawBoard(gameBoard);
            }
        }, 1000
        )
    });

    let buttonStopGame = document.querySelector('#stop-game');
    buttonStopGame.addEventListener("click", () => {
        isStopGame = true;
    });

    let buttonResetGame = document.querySelector('#reset-game');
    buttonResetGame.addEventListener("click", () => {
        isStopGame = false;
    });
});
