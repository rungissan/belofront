import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot } from '@angular/router';

// import rxjs
import { Observable } from 'rxjs';

// import @ngrx
import { Store } from '@ngrx/store';
// import { go } from '@ngrx/router-store';
import * as RouterActions from '../core/router/router-effect';

// reducers

import { AppState } from '@app/core/core.state';
import { isAuthenticated } from '@app/users/users.selectors';

/**
 * Prevent unauthorized activating and loading of routes
 * @class AuthenticatedGuard
 */
@Injectable()
export class AuthenticatedGuard implements CanActivate, CanLoad {

  /**
   * @constructor
   */
  constructor(private store: Store<AppState>) {}

  /**
   * True when user is authenticated
   * @method canActivate
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // get observable
    const observable = this.store.select(isAuthenticated);

    // redirect to sign in page if user is not authenticated
    observable.subscribe(authenticated => {
      if (!authenticated) {
        this.store.dispatch(new RouterActions.RouterGo({
          path: ['/users/sign-in']}));
      }
    });

    return observable;
  }

  /**
   * True when user is authenticated
   * @method canLoad
   */
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    // get observable
    const observable = this.store.select(isAuthenticated);

    // redirect to sign in page if user is not authenticated
    observable.subscribe(authenticated => {
      if (!authenticated) {
        this.store.dispatch(new RouterActions.RouterGo({
          path: ['/users/sign-in']
        }));
      }
    });

    return observable;
  }
}
