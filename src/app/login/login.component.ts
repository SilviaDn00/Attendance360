import { Component, inject, OnInit } from '@angular/core';
import { User } from '../models/users';
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

  private _loginService: LoginService = inject(LoginService)
  public formBuild = inject(FormBuilder);
  private _router: Router = inject(Router);


  loginFormGroup: FormGroup;

  constructor() {
    this.loginFormGroup = this.formBuild.group({
      username: [''],
      password: [''],
    });
  }

  onLogin() {
    if (this.loginFormGroup.value.username && this.loginFormGroup.value.password) {
      if (this._loginService.login(this.loginFormGroup.value.username, this.loginFormGroup.value.password))
        this._router.navigate(["/dashboard"]);
      else
        alert('login fallito')
    }
  }

}
