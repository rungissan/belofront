import { Component, OnInit } from '@angular/core';

// @ngrx
import { Store } from '@ngrx/store';


// rxjs
import { Observable } from 'rxjs';

// reducers
import {
  getAuthenticatedUser,
} from '../users.selectors';
import * as RouterActions from '@app/core/router/router-effect';

// models
import { User } from '../../core/models/user';
import { AppState } from '@app/core/core.state';

/**
 * The user"s account.
 * @class MyAccountComponent
 */
@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  // the authenticated user
  public user: Observable<User>;

  /**
   * @constructor
   */
  constructor(private store: Store<AppState>) { }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * @method ngOnInit
   */
  public ngOnInit() {
    // get authenticated user
    this.user = this.store.select(getAuthenticatedUser);
  }

  /**
   * Go to the home page.
   * @method home
   */
  public home() {
    this.store.dispatch(new RouterActions.RouterGo({
      path: ['/']
    }));
  }

  /**
   * Sign out.
   * @method home
   */
  public signOut() {
    this.store.dispatch(new RouterActions.RouterGo({
      path: ['/users/sign-out']
    }));
  }

}
