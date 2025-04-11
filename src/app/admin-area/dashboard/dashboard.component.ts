import { Component, computed, inject, signal } from '@angular/core';
import { LoginService } from '../../login-area/services/login.service';
import { CardComponent } from '../../card/card.component';
import { UsersService } from '../../login-area/services/users.service';
import { User } from '../../models/users';
import { Stamp, StampType } from '../../models/stamp';
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


   // CARD "NUMERO TOTALE DEI DIPENDENTI"
   protected readonly totalEmployees = computed(() =>
    this.users().filter(user => user.role === 'employee').length
  );


  // Funzione per verificare se una timbratura è avvenuta oggi
  private isStampToday(stamp: Stamp): boolean {
    const today = new Date();
    const stampDate = new Date(stamp.date);
    return (
      stampDate.getDate() === today.getDate() &&
      stampDate.getMonth() === today.getMonth() &&
      stampDate.getFullYear() === today.getFullYear()
    );
  }


  // CARD "TIMBRATURE DI OGGI"
  protected readonly todayStampsCount = computed(() => {
    const allStamps = this.stamps();
    return allStamps?.filter(stamp => this.isStampToday(stamp)).length || 0;
  });


  // CARD "PERCENTUALE DI PRESENZA" 
  protected readonly todayPresencePercentage = computed(() => {
    const totalEmployees = this.totalEmployees();
    if (totalEmployees === 0) return 0;

    const stampsToday = this.stamps().filter(stamp => this.isStampToday(stamp));
    const presentUsers = new Set<string>();

    stampsToday.forEach(stamp => {
      if (!stamp.username) return;
      if (stamp.type === 'ingresso') presentUsers.add(stamp.username);
      else if (stamp.type === 'uscita') presentUsers.delete(stamp.username);
    });

    return Math.round((presentUsers.size / totalEmployees) * 100);
  });


  // Converte l'orario (HH:MM) in minuti
  private parseTimeInMinutes(timeString: string): number {
    const [hours, minutes] = timeString.split(':').map(num => parseInt(num, 10));
    return hours * 60 + minutes;
  }


  // CARD "ALERT SULLE ANOMALIE" 
  protected readonly anomalyAlerts = computed(() => {
    const users = this.users();
    const stampsToday = this.stamps().filter(stamp => this.isStampToday(stamp));
    let anomalie = 0;

    users.forEach(user => {
      if (user.role !== 'employee') return;

      console.log(`Analizzando le timbrature per ${user.name} ${user.surname}`);

      const userStamps = stampsToday.filter(stamp => stamp.username === `${user.name} ${user.surname}`)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      let totalMinutes = 0;

      for (let i = 0; i < userStamps.length - 1; i += 2) {
        const ingresso = userStamps[i];
        const uscita = userStamps[i + 1];

        if (ingresso.type === 'ingresso' && uscita.type === 'uscita') {
          const ingressoTime = this.parseTimeInMinutes(ingresso.time);
          const uscitaTime = this.parseTimeInMinutes(uscita.time);
          const diffInMinutes = uscitaTime - ingressoTime;

          console.log(`Timbratura ingresso: ${ingresso.time} - tipo: ingresso`);
          console.log(`Timbratura uscita: ${uscita.time} - tipo: uscita`);
          console.log(`Differenza ore: ${diffInMinutes / 60} ore`);

          totalMinutes += diffInMinutes;
        }
      }

      console.log(`Totale ore per ${user.name} ${user.surname}: ${totalMinutes / 60} ore`);

      // Se le ore totali sono meno di 240 minuti (4 ore), conta come anomalia
      if (totalMinutes < 240 && userStamps.length > 0) {
        console.log(`Anomalia per ${user.name} ${user.surname}: totale ore < 4`);
        anomalie++;
      }
    });

    console.log(`Totale anomalie: ${anomalie}`);
    return anomalie;
  });


  protected readonly Items = computed(() => [
    { title: 'Numero totale dei dipendenti:', text: this.totalEmployees(), action: 'pulsante' },
    { title: 'Timbrature di oggi:', text: this.todayStampsCount(), action: 'pulsante' },
    { title: 'Percentuale presenti:', text: `${this.todayPresencePercentage()}%`, action: 'pulsante' },
    { title: 'Alert sulle anomalie', text: this.anomalyAlerts(), action: 'pulsante' },
  ]);
}