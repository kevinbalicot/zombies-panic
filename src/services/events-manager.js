'use strict';

import * as redux from 'redux';

let events = [];
const emit = (state, action) => {
    for (let event of events) {
        if (action.type === event.action) {
            return event.callback(state, action);
        }
    }

    return null;
}

const emitter = redux.createStore(emit);

export default {
    emitter: emitter,
    events: events
};
