import { Component, inject } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {

  private _logService: LoginService = inject(LoginService);
  private _router: Router = inject(Router);

ngOnInit() {
    this._logService.logout();
    this._router.navigate(['/login']);
  }
}
