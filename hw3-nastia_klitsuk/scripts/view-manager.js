import { Game } from './game';
import { events, EventEmitter } from './events';

export class ViewManager {
    constructor(rowsCount, columnsCount) {
        this._columnsCount = rowsCount;
        this._rowsCount = columnsCount;

        (() => {
            let board = $("#board");
            for (let i = 0; i < this._rowsCount; i++) {
                let row = $('<div class="div-table-row"></div>').appendTo(board);
                for (let j = 0; j < this._columnsCount; j++) {
                    $('<div class="div-table-col"></div>').appendTo(row);
                    let lastAddedCell = '#board .div-table-row:nth-child(' + (i + 1) + ') .div-table-col:nth-child(' + (j + 1) + ')';
                    $(lastAddedCell).click(function () {
                        if ($(lastAddedCell).css('background-color') === 'rgb(0, 0, 0)') {
                            $(lastAddedCell).css('background-color', 'rgb(255, 255, 255)');
                            events.onCellStateChanged(i, j, false);
                        }
                        else {
                            $(lastAddedCell).css('background-color', 'rgb(0, 0, 0)');
                            events.onCellStateChanged(i, j, true);
                        }
                    });
                }
            }
        })();
    }

    drawBoard(gameBoard) {
        for (let rowIndex = 0; rowIndex < this._rowsCount; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this._columnsCount; columnIndex++) {
                if (gameBoard.board[rowIndex][columnIndex].lifeStatusChanged) {
                    let nthCell = '#board .div-table-row:nth-child(' + (rowIndex + 1) + ') .div-table-col:nth-child(' + (columnIndex + 1) + ')';
                    if (gameBoard._board[rowIndex][columnIndex].isAlive) {
                        $(nthCell).css('background-color', 'rgb(0, 0, 0)');
                    }
                    else {
                        $(nthCell).css('background-color', 'rgb(255, 255, 255)');
                    }
                }
            }
        }
    }
}