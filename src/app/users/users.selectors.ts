import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '@app/core/core.state';
// import { UserState } from '@app/users/users.reducers';

import * as users from './users.reducers';

// export const selectUserState = createFeatureSelector<AppState, UserState>(
//   'user'
// );

// export const selectUser = createSelector(
//   selectUserState,
//   (state: UserState) => state
// );

/**********************************************************
 * Users Selectors
 *********************************************************/

export const getUsersState = (state: AppState) => state.user;

export const getAuthenticatedUser = createSelector(
  getUsersState,
  users.getAuthenticatedUser
);

/**
 * Returns the authentication error.
 * @function getAuthenticationError
 * @param {State} state
 * @param {any} props
 * @return {Error}
 */
export const getAuthenticationError = createSelector(
  getUsersState,
  users.getAuthenticationError
);

/**
 * Returns true if the user is authenticated
 * @function isAuthenticated
 * @param {State} state
 * @param {any} props
 * @return {boolean}
 */
export const isAuthenticated = createSelector(
  getUsersState,
  users.isAuthenticated
);

/**
 * Returns true if the user is authenticated
 * @function isAuthenticated
 * @param {State} state
 * @param {any} props
 * @return {boolean}
 */
export const isAuthenticatedLoaded = createSelector(
  getUsersState,
  users.isAuthenticatedLoaded
);

/**
 * Returns true if the authentication request is loading.
 * @function isAuthenticationLoading
 * @param {State} state
 * @param {any} props
 * @return {boolean}
 */
export const isAuthenticationLoading = createSelector(
  getUsersState,
  users.isLoading
);

/**
 * Returns the sign out error.
 * @function getSignOutError
 * @param {State} state
 * @param {any} props
 * @return {Error}
 */
export const getSignOutError = createSelector(
  getUsersState,
  users.getSignOutError
);

/**
 * Returns the sign up error.
 * @function getSignUpError
 * @param {State} state
 * @param {any} props
 * @return {Error}
 */
export const getSignUpError = createSelector(
  getUsersState,
  users.getSignUpError
);
