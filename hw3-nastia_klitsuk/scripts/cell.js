import { events } from './events';

export class Cell {
    constructor(rowIndex, columnIndex, isAlive = false) {
        this._isAlive = isAlive;
        this._rowIndex = rowIndex;
        this._columnIndex = columnIndex;
        this._isAliveInNextGeneration = false;

        events.on('update-life-state', (...args) => {
            if ((this._rowIndex === args[0]) && (this._columnIndex === args[1])) {
                this._isAlive = args[2];
            }
        });
    }

    get isAlive() { return this._isAlive; }
    set isAlive(value) { this._isAlive = value; }
    get lifeStatusChanged() { return this._lifeStatusChanged; }
    set isAliveInNextGeneration(value) { this._isAliveInNextGeneration = value; }
    get isAliveInNextGeneration() { return this._isAliveInNextGeneration; }
    
    updateNextGenerationStatus() {
        if (this._isAlive !== this._isAliveInNextGeneration) {
            this._isAlive = this._isAliveInNextGeneration;
            this._isAliveInNextGeneration = false;
            this._lifeStatusChanged = true;
        }
        else {
            this._lifeStatusChanged = false;
            this._isAliveInNextGeneration = false;
        }
    }
}
