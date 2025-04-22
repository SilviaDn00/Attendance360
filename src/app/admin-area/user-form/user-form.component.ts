import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { IUser, User } from '../../models/users';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {

  private _userService = inject(UsersService);
  public formBuild = inject(FormBuilder);
  
  private route = inject(ActivatedRoute);
  public id: string | null = null;

  public userFormGroup!: FormGroup;
  public user!: IUser;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userFormGroup = this.formBuild.group({
      id : [],
      name: [, [ Validators.required,  Validators.minLength(1), Validators.maxLength(30)]],
      surname: [, [ Validators.required,  Validators.minLength(1), Validators.maxLength(30)]],
      username: [],
      password:[, [ Validators.required,  Validators.minLength(3), Validators.maxLength(30)]],
      email: [, [Validators.required, Validators.minLength(1), Validators.maxLength(30), Validators.pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)]],
      role: ['employee'],
      department: [, [ Validators.required,  Validators.minLength(1), Validators.maxLength(30)]],
      enabled: [true],
    });
    this.loadData();
  }

  AddUser() {
    this.userFormGroup.markAllAsTouched();
    if (this.userFormGroup.valid) {
      const newUser: User = this.userFormGroup.value;
      this._userService.PostUsers(newUser).subscribe(() => {
      });
      this.userFormGroup.reset(); // Reset the form after submission          
      alert('Dipendente aggiunto con successo!');
    }
  }

  EditUser() {
    this.userFormGroup.markAllAsTouched();
    if (this.userFormGroup.valid) {
      const newUser: User = this.userFormGroup.value;
      this._userService.UpdateUsers(newUser).subscribe(() => {
      });       
      alert('Dipendente modificato con successo!');
    }
  }

  
    private loadData(): void {
      if (!this.id) return;
  
      this._userService.getUserById(this.id).subscribe(user => {
        this.user = user;
        this.userFormGroup.patchValue(user);
      });
    }

}
