import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import { User } from './models/user';
import * as auth from './auth/auth.reducer';

export interface AppState {
    isLoading: ui.State,
    user: auth.State
}

export const appReducers: ActionReducerMap<AppState> = {
    isLoading: ui.loadingReducer,
    user: auth.userReducer
}