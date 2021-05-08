import { createReducer, on } from '@ngrx/store';
import * as actions from '../auth/auth.actions';
import { User } from '../models/user';

export interface State {
    user: User
}

export const initialState: State = {
    user: null
};

const _userReducer = createReducer(
    initialState,
    on(actions.setUser, (state, { user }) => ({ ...state, user: { ...user } })),
    on(actions.unSetUser, (state) => ({ ...state, user: null }))
);

export function userReducer(state, action) {
    return _userReducer(state, action);
}