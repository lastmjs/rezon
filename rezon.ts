//TODO use immutableJS potentially for efficiency

let _store = new Proxy({}, {
    set: (target: any, name: string, value: any) => {
        _state[name] = value;
        return true;
    }
});

let _state: {
    target: any
};
let _subscribers: any[] = [];
let _logActions = false;
let _actionName = '';

const proxySettings = {
    set: (target: any, name: string, value: any) => {
        if (!_actionName) {
            throw 'Changes must have an action name. Call actionName before making changes to the store.';
        }

        if (_logActions) {
            console.log(`REZON_SET ${name}: ${value}`);
        }

        _state = new Proxy(Object.assign({}, _state.target, {
            [name]: value
        }), proxySettings);
        
        return true;
    },
    get: (target: any, name: string) => {
        if (name === 'target') {
            return target;
        }
    }
};

function createStore(initialState: any) {
    _state = new Proxy(initialState, proxySettings);
    return _store;
}

function getStore() {
    return _store;
}

function actionName(actionName: string) {
    _actionName = actionName;
    if (_logActions) {
        console.log(`REZON_ACTION ${actionName}`);
    }
}

function getState() {
    return _state.target;
}

function subscribe(subscriber: any) {
    _subscribers.push(subscriber);
}

function publish() {
    _actionName = '';
    _subscribers.forEach((subscriber) => {
        subscriber(_state.target);
    });
}

function log(on: boolean) {
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

export const Rezon = {
    createStore,
    actionName,
    getState,
    getStore,
    subscribe,
    publish,
    log
};
