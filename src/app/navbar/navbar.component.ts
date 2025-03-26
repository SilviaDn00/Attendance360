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

  logoutService = inject(LoginService)

  protected readonly items = [
    { displayName: 'HOME', link: 'homepage' },
    { displayName: 'CHI SIAMO', link: 'about-us' },
    { displayName: 'PROGETTI', link: 'projects' },
    { displayName: 'CONTATTI', link: 'contacts-reactive' },
  ]
}
