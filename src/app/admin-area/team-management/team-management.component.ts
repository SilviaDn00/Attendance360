import { Component, inject, Injectable, OnInit } from '@angular/core';
import { Column, TableComponent } from '../../shared/components/table/table.component';
import { IUser } from '../../shared/models/user.interface';
import { UsersService } from '../../shared/services/users.service';
import { Router, RouterLink } from '@angular/router';
import { CommandService } from '../services/commands.service';

@Component({
  selector: 'app-team-management',
  imports: [TableComponent, RouterLink],
  templateUrl: './team-management.component.html',
  styleUrl: './team-management.component.scss'
})
export class TeamManagementComponent implements OnInit {

  private _userService = inject(UsersService);
  private _router = inject(Router);

  public columns: Column<IUser>[] = [
    { key: 'name', label: 'Nome', type: 'string' },
    { key: 'surname', label: 'Cognome', type: 'string' },
    { key: 'department', label: 'Reparto', type: 'string' },
    { key: 'role', label: 'Ruolo', type: 'string' },
    { key: 'button', label: 'Azioni', type: 'button' },
  ]

  public rows: IUser[] = [];

  constructor() {
    const commandService = inject(CommandService);

    commandService.registerCommand('navigateToUserForm', {
      icon: 'bi bi-pencil-square',
      action: (user: IUser) => this.navigateToUserForm(user.id),
      family: 'user'
    });

    commandService.registerCommand('disableUser', {
      icon: 'bi bi-person-dash',
      action: (user: IUser) => this.disableUser(user.id),
      family: 'user'
    });

    commandService.registerCommand('navigateToEmployeeDetails', {
      icon: 'bi bi-person-vcard-fill',
      action: (user: IUser) => this.navigateToEmployeeDetails(user.id),
      family: 'user'
    });
  }


 public ngOnInit(): void {
    this._userService.getUsers(true).subscribe(users => {
      const userList = users.map(u => ({
        ...u,
        rowClass: u.enabled ? '' : 'table-row-disabled'
      }));
      this.rows = userList;
    });
  }

  public navigateToUserForm(id: string): void {
    this._router.navigate([`/dashboard/user-form/${id}`]);
  }

  public disableUser(id: string): void {
    this._userService.UpdateUserEnabled(id).subscribe(updatedUser => {
      this.rows = this.rows.map(u =>
        u.id === updatedUser.id ? { ...u, enabled: updatedUser.enabled } : u
      );
    });
  }
  
  public navigateToEmployeeDetails(id: string): void {
    this._router.navigate([`/dashboard/employee-details/${id}`]);
  }
}


