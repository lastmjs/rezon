declare var Polymer: any;

import {Rezon} from '../../../rezon.ts';
import {InitialState} from '../../rezon/initial-state.ts';
import {Actions} from '../../rezon/actions.ts';

const store = Rezon.createStore(InitialState);

class RezonApp {
    public is: string;
    public lightColor: string;

    beforeRegister() {
        this.is = 'rezon-app';
    }

    ready() {
        Rezon.subscribe(this.mapStateToThis());
        Rezon.publish();
    }

    redClick() {
        Actions.turnRed(store);
    }

    yellowClick() {
        Actions.turnYellow(store);
    }

    greenClick() {
        Actions.turnGreen(store);
    }

    mapStateToThis() {
        return (state: any) => {
            this.lightColor = state.lightColor;
        };
    }
}

Polymer(RezonApp);
