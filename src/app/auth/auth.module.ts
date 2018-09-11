import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TranslateModule } from '@ngx-translate/core';
// import { AuthSandbox } from './auth.sandbox';

// import { ValidationService } from '../shared/utility';
import { AuthComponent } from './auth.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    AuthComponent,
  ],
  providers: []
})
export class AuthModule {}
