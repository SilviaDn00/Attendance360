import { Component, computed, inject, signal } from '@angular/core';
import { LoginService } from '../../login-area/services/login.service';
import { CardComponent } from '../../card/card.component';
import { UsersService } from '../../login-area/services/users.service';
import { User } from '../../models/users';
import { Stamp } from '../../models/stamp';
import { StampService } from '../../employee-area/services/stamp.service';

@Component({
  selector: 'app-dashboard',
  imports: [CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  public logService = inject(LoginService);
  public userService = inject(UsersService);
  public stampService = inject(StampService);


  protected readonly users = signal<User[]>([]);
  protected readonly stamps = signal<Stamp[]>([]);


  constructor() {
    // Carica utenti e timbrature in modo asincrono
    this.userService.getUsers().subscribe(userData => {
      this.users.set(userData);
    });

    this.stampService.GetStamp().subscribe(stampData => {
      this.stamps.set(stampData);
    });
  }



  // Card "Numero totale dei dipendenti"
  protected readonly totalEmployees = computed(() =>
    this.users().filter(user => user.role === 'employee').length
  );



 
// Card "Timbrature di oggi"
// Card "Today Timbrations Count"
protected readonly todayStampsCount = computed(() => {
  const today = new Date();
  const allStamps = this.stamps();

  if (!allStamps || allStamps.length === 0) return 0;

  // Filter stamps for today
  const todayStamps = allStamps.filter(stamp => {
    const stampDate = new Date(stamp.date);
    return (
      stampDate.getDate() === today.getDate() &&
      stampDate.getMonth() === today.getMonth() &&
      stampDate.getFullYear() === today.getFullYear()
    );
  });

  return todayStamps.length;
});




// Card "Percentuale di presenza"
protected readonly todayPresencePercentage = computed(() => {
  const total = this.totalEmployees(); // Numero totale di dipendenti (dipendenti effettivi)
  const todayStamps = this.todayStampsCount(); // Numero di presenze (timbrature di oggi)

  // Deduplicazione delle timbrature per evitare di contare più volte lo stesso dipendente
  const uniquePresences = new Set(this.stamps().filter(stamp => {
    const today = new Date();
    const stampDate = new Date(stamp.date);
    
    // Verifica se la timbratura è di oggi
    return (
      stampDate.getDate() === today.getDate() &&
      stampDate.getMonth() === today.getMonth() &&
      stampDate.getFullYear() === today.getFullYear()
    );
  }).map(stamp => stamp.id)); // Usa l'ID del timbro per deduplicare

  const presences = uniquePresences.size; // Numero di timbrature uniche (presenze uniche)

  // Calcolo della percentuale di presenza
  return total > 0 ? Math.round((presences / total) * 100) : 0;
});



  // Card "Alert sulle anomalie"
  getAnomalyAlerts() {

  }


  protected readonly Items = computed(() => [
    { title: 'Numero totale dei dipendenti:', text: this.totalEmployees(), action: 'pulsante' },
    { title: 'Timbrature di oggi:', text: this.todayStampsCount(), action: 'pulsante' },
    { title: 'Percentuale presenti:', text: this.todayPresencePercentage(), action: 'pulsante' },
    { title: 'Alert sulle anomalie', text: this.getAnomalyAlerts(), action: 'pulsante' },
  ]);

}
