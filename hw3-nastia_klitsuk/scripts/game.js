import { Cell } from './cell';
import { events } from './events';

export class Game {
    get board() { return this._board; }

    constructor(rowsCount, columnsCount) {
        this._board = [];
        this._columnsCount = rowsCount;
        this._rowsCount = columnsCount;

        for (let rowIndex = 0; rowIndex < this._rowsCount; rowIndex++) {
            this._board[rowIndex] = [];
            for (let columnIndex = 0; columnIndex < this._columnsCount; columnIndex++) {
                this._board[rowIndex][columnIndex] = new Cell(rowIndex, columnIndex);
            }
        }
    }

    _isNeighbour(rowIndex, columnIndex, rowNeighbour, columnNeighbour) {
        var isRowNeighbourIndexValid = false;
        var isColumnNeighbourIndexValid = false;

        if ((rowIndex !== rowNeighbour) || (columnIndex !== columnNeighbour)) {
            if ((rowNeighbour >= 0) && (rowNeighbour < this._rowsCount)) {
                isRowNeighbourIndexValid = true;
            }
            if ((columnNeighbour >= 0) && (columnNeighbour < this._columnsCount)) {
                isColumnNeighbourIndexValid = true;
            }
        }

        return isRowNeighbourIndexValid && isColumnNeighbourIndexValid;
    }

    _getAliveNeighboursCount(rowIndex, columnIndex) {
        let neighboursCount = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (this._isNeighbour(rowIndex, columnIndex, rowIndex + i, columnIndex + j)) {
                    if (this._board[rowIndex + i][columnIndex + j].isAlive) {
                        neighboursCount = neighboursCount + 1;
                    }
                }
            }
        }

        return neighboursCount;
    }

    _isCellAliveInNextGeneration(isAlive, aliveNeighboursCount) {
        if ((!isAlive) && (aliveNeighboursCount === 3)) {
            return true;
        }
        else if (isAlive) {
            if ((aliveNeighboursCount < 2) || (aliveNeighboursCount > 3)) {
                return false;
            }
            else if ((aliveNeighboursCount === 2) || (aliveNeighboursCount === 3)) {
                return true;
            }
        }
        return false;
    }

    _updateNextGeneartionLifeStatus() {
        for (let rowIndex = 0; rowIndex < this._rowsCount; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this._columnsCount; columnIndex++) {
                this._board[rowIndex][columnIndex].updateNextGenerationStatus();
            }
        }
    }

    buildNextGenertion() {
        for (let rowIndex = 0; rowIndex < this._rowsCount; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this._columnsCount; columnIndex++) {
                let aliveNeighboursCount = this._getAliveNeighboursCount(rowIndex, columnIndex);
                let cell =  this._board[rowIndex][columnIndex];
                cell.isAliveInNextGeneration = this._isCellAliveInNextGeneration(cell.isAlive, aliveNeighboursCount);
            }
        }
        this._updateNextGeneartionLifeStatus();
    }
}