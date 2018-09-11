import { Injectable } from '@angular/core';

// import @ngrx
import { Effect, Actions, ofType } from '@ngrx/effects';

// import rxjs
import { Observable, of } from 'rxjs';

// import services
import { UserService } from '../core/services/user.service';

// import actions
import {
  ActionTypes,
  AuthenticatedErrorAction,
  AuthenticatedSuccessAction,
  AuthenticationErrorAction,
  AuthenticationSuccessAction,
  SignOutErrorAction,
  SignOutSuccessAction,
  SignUpErrorAction,
  SignUpSuccessAction
 } from './users.actions';


import { catchError, map, switchMap, debounceTime } from 'rxjs/operators';
import { User } from '@app/core/models';



@Injectable()
export class UserEffects {

  /**
   * Authenticate user.
   * @method authenticate
   */
  @Effect()
  public authenticate = this.actions.pipe(
    ofType(ActionTypes.AUTHENTICATE),
    debounceTime(500),
      map(action => (action as any).payload),
      switchMap(payload => {
      return this.userService.authenticate(payload.email, payload.password).pipe(
        map(user => new AuthenticationSuccessAction({user: user})),
        catchError(error => of(new AuthenticationErrorAction({error: error}))));
    }));

  @Effect()
  public authenticated = this.actions.pipe(
    ofType(ActionTypes.AUTHENTICATED),
    switchMap(() => {
      return this.userService.authenticatedUser().pipe(
        map(user => new AuthenticatedSuccessAction({authenticated: (user !== null), user: user})),
        catchError(error => of(new AuthenticatedErrorAction({error: error}))));
    }));

  @Effect()
  public createUser = this.actions.pipe(
    ofType(ActionTypes.SIGN_UP),
    map(action => (action as any).payload),
    switchMap(payload => {
      return this.userService.create(payload.user).pipe(
        map(user => new SignUpSuccessAction({user: user})),
        catchError(error => of(new SignUpErrorAction({error: error}))));
    }));

  @Effect()
  public signOut = this.actions.pipe(
    ofType(ActionTypes.SIGN_OUT),
    switchMap(() => {
      return this.userService.signout().pipe(
        map(() => new SignOutSuccessAction()),
        catchError(error => of(new SignOutErrorAction({error: error}))));
    }));

  /**
   * @constructor
   * @param {Actions }actions
   * @param {UserService} userService
   */
  constructor(private actions: Actions,
              private userService: UserService) {
  }
}
