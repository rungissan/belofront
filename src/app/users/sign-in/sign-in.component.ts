import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @ngrx
import { Store, select } from '@ngrx/store';

// rxjs
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

// actions
import { AuthenticateAction } from '../users.actions';

// reducers
import {
  getAuthenticationError,
  isAuthenticated,
  isAuthenticationLoading,
} from '../users.selectors';
import * as RouterActions from '@app/core/router/router-effect';
import { AppState } from '@app/core/core.state';


/**
 * /users/sign-in
 * @class SignInComponent
 */
@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnDestroy, OnInit {

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
  public form: FormGroup;

  /**
   * Component state.
   * @type {boolean}
   */
  private unsubscribe$: Subject<void> = new Subject<void>();

  /**
   * @constructor
   * @param {FormBuilder} formBuilder
   * @param {Store<State>} store
   */
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) { }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * @method ngOnInit
   */
  public ngOnInit() {
    // set formGroup
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // set error
    this.error = this.store.select(getAuthenticationError);

    // set loading
    this.loading = this.store.select(isAuthenticationLoading);

    // subscribe to success
    this.store.pipe(
      select(isAuthenticated),
      takeUntil(this.unsubscribe$),
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
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
   * To to the sign up page.
   * @method signUp
   */
  public signUp() {
    this.store.dispatch(new RouterActions.RouterGo({
      path: ['/users/sign-up']
    }));
  }

  /**
   * Submit the authentication form.
   * @method submit
   */
  public submit() {
    // get email and password values
    const email: string = this.form.get('email').value;
    const password: string = this.form.get('password').value;

    // trim values
    email.trim();
    password.trim();

    // set payload
    const payload = {
      email: email,
      password: password
    };

    // dispatch AuthenticationAction and pass in payload
    this.store.dispatch(new AuthenticateAction(payload));
  }
}
