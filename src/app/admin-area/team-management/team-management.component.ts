import { Component, inject, OnInit } from '@angular/core';
import { Column, TableComponent } from '../../table/table.component';
import { IEnrichedStamp } from '../../models/IEnrichedStamp';
import { IUser, User } from '../../models/users';
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

  ngOnInit(): void {
    this._userService.getUsers().subscribe(users => {
      const userList = users
        .filter(u => u.role === 'employee')
        .map(u => ({
          ...u,
          button: [
            new ButtonProperties('bi bi-pencil-square', undefined, () => this._userService.UpdateUsers(u)),
            new ButtonProperties('bi bi-person-wheelchair', undefined, () => this.disableUser(u.id)),
            new ButtonProperties('bi bi-person-vcard-fill', `/dashboard/employee-details/${u.id}`)
          ]
        }));

      this.rows = userList;
    });
  }

  // disableUser(id: string): void {
  //   this._userService.getUserById(id).subscribe(() => {
  //     const userList = this.rows.filter((us : User) => us.id !== id).map(u => {
  //       console.log(u.id);
  //       const c= u.id === id ? { ...u, enabled: false } : u;
  //       console.log(c);
  //       console.log(id);        
  //       console.log(c.enabled);
  //      return c;
  //     }
  //     );
  //   });
  // }

  disableUser(id: string): void {
    this._userService.UpdateUserEnabled(id).subscribe(updatedUser => {
      this.rows = this.rows.map(u =>
        u.id === updatedUser.id ? { ...u, enabled: updatedUser.enabled } : u
      );
    });
    
  }
  

}