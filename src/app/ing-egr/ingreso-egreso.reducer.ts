import { createReducer, on } from '@ngrx/store';
import * as actions from './ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingresoEgreso';
import { AppState } from '../app.reducer';

export interface State {
    monto: IngresoEgreso[]
}

export interface StateWithIE extends AppState{
    ingresoEgreso: State
}

export const initialState: State = {
    monto: []
};

const _montoReducer = createReducer(
    initialState,
    on(actions.setMonto, (state, { montos }) => ({ ...state, monto: [...montos] })),
    on(actions.unSetMonto, (state) => ({ monto: [] }))
);

export function montoReducer(state, action) {
    return _montoReducer(state, action);
}