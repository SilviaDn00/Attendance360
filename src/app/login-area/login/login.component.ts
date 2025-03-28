import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../models/users';
import { UsersService } from '../services/users.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private _loginService: LoginService = inject(LoginService);
  private _router: Router = inject(Router);
  public formBuild = inject(FormBuilder);

  loginFormGroup: FormGroup;

  constructor() {
    this.loginFormGroup = this.formBuild.group({
      email: [''],
      password: [''],
    });
  }

  onLogin() {
    if (this.loginFormGroup.value.email && this.loginFormGroup.value.password) 
      {
      if (this._loginService.login(this.loginFormGroup.value.email.trim(), this.loginFormGroup.value.password))
        this._router.navigate(['/dashboard']);
      else alert('login fallito');
    }
  }
}
