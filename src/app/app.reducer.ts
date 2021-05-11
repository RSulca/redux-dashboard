import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
// import * as monto from './ing-egr/ingreso-egreso.reducer';

export interface AppState {
    isLoading: ui.State,
    user: auth.State
    // monto: monto.State
}

export const appReducers: ActionReducerMap<AppState> = {
    isLoading: ui.loadingReducer,
    user: auth.userReducer,
    // monto: monto.montoReducer
}