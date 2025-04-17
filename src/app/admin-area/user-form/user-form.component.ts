import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../service/users.service';
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
      name: [],
      surname: [],
      username: [],
      password: [],
      email: [],
      role: ['employee'],
      department: [],
      enabled: [true],
    });
    this.loadData();
  }

  AddUser() {
    if (this.userFormGroup.valid) {
      const newUser: User = this.userFormGroup.value;
      this._userService.PostUsers(newUser).subscribe(() => {
      });
      this.userFormGroup.reset(); // Reset the form after submission          
    }
    alert('Dipendente aggiunto con successo!');
  }

  EditUser() {
    if (this.userFormGroup.valid) {
      const newUser: User = this.userFormGroup.value;
      this._userService.UpdateUsers(newUser).subscribe(() => {
      });
      console.log('Utente modificato:', newUser);
      this.userFormGroup.reset(); // Reset the form after submission          
    }
    alert('Dipendente modificato con successo!');
  }

  
    private loadData(): void {
      if (!this.id) return;
  
      this._userService.getUserById(this.id).subscribe(user => {
        this.user = user;
        this.userFormGroup.patchValue(user);
      });
    }

}
