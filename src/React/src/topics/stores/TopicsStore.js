import {EventEmitter} from 'events'
import {AppDispatcher} from '../../core/AppDispatcher';
import {LOAD_TOPICS_SUCCESS} from '../actions/TopicsActions';

let state = { topics: [] };
export class TopicsStore extends EventEmitter {
    constructor() {
        super();
        this.register();
    }

    getState() {
        return state;
    }

    addChangeListener(callback) {
        this.on('change', callback);
    }

    removeChangeListener(callback) {
        this.removeListener('change', callback);
    }

    emitChange() {
        this.emit('change');
    }

    register() {
        AppDispatcher.register((action) => {
            switch (action.actionType) {
                case LOAD_TOPICS_SUCCESS:
                    state = { topics: action.data.topics };
                    this.emitChange();
                    break;
            }
        })
    }
}