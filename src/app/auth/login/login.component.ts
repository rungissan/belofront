import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators
} from '@angular/forms';
// import { AuthSandbox } from '../auth.sandbox';

@Component({
  selector: 'app-coins-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  public submitted = false;
  public username: AbstractControl;
  public password: AbstractControl;
  public otpPassword: AbstractControl;
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder) { } // public authSandbox: AuthSandbox

  ngOnInit() {
    this.initLoginForm();
  }

  /**
   * Builds a form instance (using FormBuilder) with corresponding validation rules
   */
  public initLoginForm(): void {
    this.loginForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        password: ['', Validators.required],
        otpPassword: ['']
      },
      { updateOn: 'submit' }
    );

    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
    this.otpPassword = this.loginForm.controls['otpPassword'];
  }

  /**
   * Handles form 'submit' event. Calls sandbox login function if form is valid.
   *
   * @param event
   * @param form
   */
  public onSubmit(event: Event, form: any): void {
    event.stopPropagation();
    this.submitted = true;
    if (this.loginForm.valid) {
   //   this.authSandbox.login(form);
    }
  }
}
