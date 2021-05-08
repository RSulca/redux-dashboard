import { createReducer, on } from '@ngrx/store';
import * as actions from './ui.actions';

export interface State {
    isLoading: boolean
}

export const initialState: State = {
    isLoading: false
};

const _loadingReducer = createReducer(
    initialState,
    on(actions.isLoading, (state) => ({ ...state, isLoading: true })),
    on(actions.stopLoading, (state) => ({ ...state, isLoading: false }))
);

export function loadingReducer(state, action) {
    return _loadingReducer(state, action);
}