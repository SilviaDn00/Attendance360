import { Component, inject, OnInit } from '@angular/core';
import { User } from '../models/users';
import { UsersService } from '../services/users.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private _userServices = inject(UsersService);
  public formBuild = inject(FormBuilder);
  private _router : Router = inject(Router);

  private _users: User[] = [];
  loginFormGroup: FormGroup;

  constructor() {
    this.loginFormGroup = this.formBuild.group({
      username: [''],
      password: [''],
    });
  }

  ngOnInit(): void {
    this._userServices.getUsers().subscribe((data) => {
      this._users = data;
    });
  }

  login() {
    if (this.loginFormGroup.valid) { 
      const user = this._users.find((user) => (user.username === this.loginFormGroup.value.username) && (user.password === this.loginFormGroup.value.password) );
      if (user) {
        this._router.navigate(["/dashboard"]);
      } else {
        alert('User not found');
      }
      
    }
  }

}
