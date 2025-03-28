import { Component, inject } from '@angular/core';
import { LoginService } from '../../login-area/services/login.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  public logService = inject(LoginService);
  
}
