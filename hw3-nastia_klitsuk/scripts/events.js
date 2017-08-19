import Emitter from 'es6-event-emitter';

class IsAliveEmitter extends Emitter {
    constructor() {
        super();
    }
    
    onCellStateChanged(...args) {
        this.trigger('update-life-state', ...args);
    }
}

export let events = new IsAliveEmitter();