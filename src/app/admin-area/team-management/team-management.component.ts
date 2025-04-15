import { Component, inject, OnInit } from '@angular/core';
import { Column, TableComponent } from '../../table/table.component';
import { IEnrichedStamp } from '../../models/IEnrichedStamp';
import { IUser } from '../../models/users';
import { UsersService } from '../../service/users.service';
import { ButtonProperties } from '../../models/buttonProperties';

@Component({
  selector: 'app-team-management',
  imports: [TableComponent],
  templateUrl: './team-management.component.html',
  styleUrl: './team-management.component.scss'
})
export class TeamManagementComponent implements OnInit {

  private _userService = inject(UsersService);

  public columns: Column<IUser>[] = [
    { key: 'name', label: 'Nome', type: 'string' },
    { key: 'surname', label: 'Cognome', type: 'string' },
    { key: 'department', label: 'Reparto', type: 'string' },
    { key: 'role', label: 'Ruolo', type: 'string' },
    { key: 'button', label: 'Azioni', type: 'button' },
  ]

  public rows: IUser[] = [];

  // ngOnInit(): void {
  //   this._userService.getUsers().subscribe(users => {
  //     const userList = users.filter(u => u.role === 'employee').map( u => ({
  //       ...u,
  //       button: [
  //         new ButtonProperties('bi bi-pencil-square', ciao() ),
  //         new ButtonProperties ('bi bi-person-wheelchair',''),
  //         new ButtonProperties ('bi bi-person-vcard-fill','')
  //       ]
  //     }));
  //     this.rows = userList
  //   }
  //   )
  // }

  ngOnInit(): void {
    this._userService.getUsers().subscribe(users => {
      const userList = users
        .filter(u => u.role === 'employee')
        .map(u => ({
          ...u,
          button: [
            new ButtonProperties('bi bi-pencil-square', undefined, () => this.editUser(u)),
            new ButtonProperties('bi bi-person-wheelchair', undefined, () => this.disableUser(u)),
            new ButtonProperties('bi bi-person-vcard-fill', `dashboard/employee-details/${u.id}`)
          ]
        }));
      this.rows = userList;
    });
  }


  editUser(user: IUser): void {
    console.log('Editing user:', user);
    // logica di modifica
  }
  
  disableUser(user: IUser): void {
    console.log('Disabling user:', user);
    // logica di disattivazione
  }
  
  

  // public buttons: ButtonProperties[] = [ 
  //   {icon: 'icon', link: 'jfdsh'},
  //   {icon: 'AA', link: ''},
  //   {icon: 'AA', link: ''},
  // ]



}


