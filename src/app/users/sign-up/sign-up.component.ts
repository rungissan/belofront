import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @ngrx
import { Store } from '@ngrx/store';
import * as RouterActions from '@app/core/router/router-effect';
// rxjs
import { Observable } from 'rxjs';

// actions
import { SignUpAction } from '../users.actions';

// reducers
import {
  getSignUpError,
  isAuthenticated,
  isAuthenticationLoading
} from '../users.selectors';

// models
import { User } from '../../core/models/user';
import { AppState } from '@app/core/core.state';
import { takeWhile, filter } from 'rxjs/operators';

/**
 * /users/sign-up
 * @class SignUpComponent
 */
@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnDestroy, OnInit {

  /**
   * The error if authentication fails.
   * @type {Observable<string>}
   */
  public error: Observable<string>;

  /**
   * True if the authentication is loading.
   * @type {boolean}
   */
  public loading: Observable<boolean>;

  /**
   * The authentication form.
   * @type {FormGroup}
   */
  public signupForm: FormGroup;

  /**
   * Component state.
   * @type {boolean}
   */
  private alive = true;

  /**
   * @constructor
   * @param {FormBuilder} formBuilder
   * @param {Store<State>} store
   */
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * @method ngOnInit
   */
  public ngOnInit() {
    // set FormGroup
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // set error
    this.error = this.store.select(getSignUpError);

    // set loading
    this.loading = this.store.select(isAuthenticationLoading);

    // subscribe to success
    this.store.select(isAuthenticated).pipe(
      takeWhile(() => this.alive),
      filter(authenticated => authenticated))
      .subscribe(() => {
        this.store.dispatch(new RouterActions.RouterGo({
          path: ['/users/my-account']
        }));
       });
  }

  /**
   *  Lifecycle hook that is called when a directive, pipe or service is destroyed.
   * @method ngOnDestroy
   */
  public ngOnDestroy() {
    this.alive = false;
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
   * Submit the sign up form.
   * @method submit
   */
  public submit() {
    // create a new User object
    const user: User = new User();
    user.email = this.signupForm.get('email').value;
    user.firstName = this.signupForm.get('firstName').value;
    user.lastName = this.signupForm.get('lastName').value;
    user.password = this.signupForm.get('password').value;

    // trim values
    user.email.trim();
    user.firstName.trim();
    user.lastName.trim();
    user.password.trim();

    // set payload
    const payload = {
      user: user
    };

    // dispatch SignUpAction and pass in payload
    this.store.dispatch(new SignUpAction(payload));
  }
}
