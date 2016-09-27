import {Rezon} from '../../rezon.ts';

function turnRed(store: any) {
    Rezon.actionName('SET_RED');
    store.lightColor = 'red';
    Rezon.publish();
}

function turnYellow(store: any) {
    Rezon.actionName('SET_YELLOW');
    store.lightColor = 'yellow';
    Rezon.publish();
}

function turnGreen(store: any) {
    Rezon.actionName('SET_GREEN');
    store.lightColor = 'green';
    Rezon.publish();
}

export const Actions = {
    turnRed,
    turnYellow,
    turnGreen
};
