import { Component, inject } from '@angular/core';
import { LoginService } from '../../login-area/services/login.service';
import { CardComponent } from '../../card/card.component';

@Component({
  selector: 'app-dashboard',
  imports: [CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  public logService = inject(LoginService);

  protected readonly Items = [
    { title: 'Numero totale dei dipendenti:', text: this.getTotalEmployees(), action: 'pulsante' },
    { title: 'Timbrature di oggi:', text: this.getTodayStampsCount(), action: 'pulsante' },
    { title: 'Percentuale presenti:', text: this.getTodayPresencePercentage(), action: 'pulsante' },
    { title: 'Alert sulle anomalie', text: this.getAnomalyAlerts(), action: 'pulsante' },
  ]

  getTotalEmployees() {
    console.log('ciao')

  }

  getTodayStampsCount() {
    console.log('migheleeeeee')
  }

  getTodayPresencePercentage() {
    console.log('migheleeeeee')
  }

  getAnomalyAlerts() {
    console.log('migheleeeeee')
  }

  

}
