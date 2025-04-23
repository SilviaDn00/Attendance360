import { Component, inject, Input, OnInit } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { IUser } from '../../shared/models/IUser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  imports: [RouterLink],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss'
})
export class EmployeeDetailsComponent implements OnInit {

  @Input() id: string | null = null;

  private _userService = inject(UsersService);

  public user!: IUser;

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    if (!this.id) return;

    this._userService.getUserById(this.id).subscribe(user => {
      this.user = user;
    });
  }
}
