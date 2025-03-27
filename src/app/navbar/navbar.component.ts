import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from '../login-area/services/login.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  logService = inject(LoginService)

  protected readonly employeeItems = [
    { displayName: 'HOME', link: 'employee-management' },
    { displayName: 'employee', link: 'AAAAAAAAA' },
  ]

  protected readonly adminItems = [
    { displayName: 'DASHBOARD', link: 'dashboard' },
    { displayName: 'admin', link: 'AAAAAAA' },
  ]

  get menuItems() {
    return this.logService.getRole() === 'admin' ? this.adminItems : this.employeeItems;
  }
}
