import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../service/users.service';
import { User } from '../../models/users';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit{
  

  private _userService = inject(UsersService);
  public formBuild = inject(FormBuilder);

  public userFormGroup!: FormGroup;

  ngOnInit(): void {
     this.userFormGroup = this.formBuild.group({
     name : [],
     surname : [],
     username : [],
     password : [],
     email : [],
     role : ['employee'],
     department : [],
     enabled : [true],
   });
 }

  AddUser(){
    if (this.userFormGroup.valid) {
          const newUser: User = this.userFormGroup.value;    
          this._userService.PostUsers(newUser).subscribe(() => {
          });
          console.log('User:', newUser);
          this.userFormGroup.reset(); // Reset the form after submission          
        }
    alert('Schiavo aggiunto con successo!');

  }

}
