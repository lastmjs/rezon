//TODO use immutableJS potentially for efficiency

let store = new Proxy({}, {
    set: (target, name, value) => {
        _state[name] = value;
    }
});

let _state;
let _subscribers = [];
let _logActions = false;
let _actionName = '';

const proxySettings = {
    set: (target, name, value) => {
        if (!_actionName) {
            throw 'Changes must have an action name. Call actionName before making changes to the store.';
        }

        if (_logActions) {
            console.log(`REZON_SET ${name}: ${value}`);
        }

        _state = new Proxy(Object.assign({}, _state.target, {
            [name]: value
        }), proxySettings);
    },
    get: (target, name) => {
        if (name === 'target') {
            return target;
        }
    }
};

function createStore(initialState) {
    _state = new Proxy(initialState, proxySettings);
    //TODO return the store maybe?
}

function actionName(actionName) {
    _actionName = actionName;
    if (_logActions) {
        console.log(`REZON_ACTION ${actionName}`);
    }
}

function getState() {
    return _state.target;
}

function subscribe(subscriber) {
    subscribers.push(subscriber);
}

function publish() {
    _actionName = '';
    subscribers.forEach((subscriber) => {
        subscriber(_state.target);
    });
}

function log(on) {
    if (on === undefined) {
        throw 'Must specify true or false as parameter to log function.';
    }

    if (on) {
        _logActions = true;
    }
    else {
        _logActions = false;
    }
}

// export const Rezon = {
//     createStore
// };
