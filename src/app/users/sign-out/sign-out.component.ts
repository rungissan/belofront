import { Component, OnDestroy, OnInit } from '@angular/core';

// @ngrx
import { Store } from '@ngrx/store';

// rxjs
import * as RouterActions from '@app/core/router/router-effect';
// actions
import { SignOutAction } from '../users.actions';

// reducers
import {
  getSignOutError,
  isAuthenticated,
  isAuthenticationLoading,
} from '../users.selectors';
import { AppState } from '@app/core/core.state';

@Component({
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnDestroy, OnInit {

  /**
   * Component state.
   * @type {boolean}
   */

  /**
   * @constructor
   * @param {Store<State>} store
   */
  constructor(private store: Store<AppState>) { }

  /**
   *  Lifecycle hook that is called when a directive, pipe or service is destroyed.
   */
  public ngOnDestroy() {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit() {
    this.store.dispatch(new SignOutAction());
  }

  /**
   * Go to the home page.
   */
  public home() {
    this.store.dispatch(new RouterActions.RouterGo({
      path: ['/']
    }));
  }

  /**
   * To to the sign up page.
   */
  public signIn() {
    this.store.dispatch(new RouterActions.RouterGo({
      path: ['/users/sign-up']
    }));
  }

}
