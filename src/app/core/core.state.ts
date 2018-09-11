import {
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '@env/environment';

import { initStateFromLocalStorage } from './meta-reducers/init-state-from-local-storage.reducer';
import { debug } from './meta-reducers/debug.reducer';
import { AuthState } from './auth/auth.models';
import { authReducer } from './auth/auth.reducer';
import * as users from '../users/users.reducers';

import * as fromRouter from '@ngrx/router-store';


export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  routerReducer: fromRouter.routerReducer,
  user: users.reducer
};

export const metaReducers: MetaReducer<AppState>[] = [
  initStateFromLocalStorage
];
if (!environment.production) {
  metaReducers.unshift(storeFreeze);
  if (!environment.test) {
    metaReducers.unshift(debug);
  }
}

export const selectAuthState = createFeatureSelector<AppState, AuthState>(
  'auth'
);
export const selectRouterState = createFeatureSelector<AppState, AuthState>(
  'routerReducer'
);
export const selectUserState = createFeatureSelector<AppState, AuthState>(
  'user'
);

export interface AppState {
  auth: AuthState;
  routerReducer: fromRouter.RouterReducerState;
  user: users.UserState;
}
