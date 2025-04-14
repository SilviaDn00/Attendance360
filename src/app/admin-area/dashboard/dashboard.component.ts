import { Component, computed, inject, signal, untracked } from '@angular/core';
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


  protected readonly userList = signal<User[] | null>(null);
  protected readonly stampList = signal<Stamp[] | null>(null);

  constructor() {
    // Carica utenti e timbrature in modo asincrono
    this.userService.getUsers().subscribe(userData => {
      this.userList.set(userData);
    });

    this.stampService.GetStamp().subscribe(stampData => {
      this.stampList.set(stampData);
    });
  }


  // CARD "NUMERO TOTALE DEI DIPENDENTI"
  protected readonly totalEmployees = computed(() =>
    (this.userList() ?? []).filter(user => user.role === 'employee').length
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
    const stamps = this.stampList() ?? [];
    return stamps.filter(stamp => this.isStampToday(stamp)).length;
  });


  // CARD "PERCENTUALE DI PRESENZA"
  protected readonly todayPresencePercentage = computed(() => {
    const total = this.totalEmployees();
    if (total === 0) return 0;
  
    const todayStamps = (this.stampList() ?? []).filter(stamp => this.isStampToday(stamp));
    const presentUsers = new Set<string>();
  
    todayStamps.forEach(stamp => {
      if (!stamp.userID) return;
      if (stamp.type === 'ingresso') presentUsers.add(stamp.userID);
      else if (stamp.type === 'uscita') presentUsers.delete(stamp.userID);
    });
  
    return Math.round((presentUsers.size / total) * 100);
  });


  // Converte l'orario (HH:MM) in minuti
  private parseTimeInMinutes(timeString: string): number {
    const [hours, minutes] = timeString.split(':').map(num => parseInt(num, 10));
    return hours * 60 + minutes;
  }


  // CARD "ALERT SULLE ANOMALIE"
  protected readonly anomalyCount = computed(() => {
    const users = this.userList() ?? [];
    const stamps = this.stampList() ?? [];
    const todayStamps = stamps.filter(stamp => this.isStampToday(stamp));
    let anomalies = 0;
  
    users.forEach(user => {
      if (user.role !== 'employee') return;
  
      console.log(`\nAnalizzando timbrature per ${user.name} ${user.surname}`);
  
      const userStamps = todayStamps
        .filter(stamp => stamp.userID === `${user.name} ${user.surname}`)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
      let totalMinutes = 0;
      let validPairs = 0;
  
      for (let i = 0; i < userStamps.length - 1; i += 2) {
        const checkIn = userStamps[i];
        const checkOut = userStamps[i + 1];
  
        if (checkIn.type === 'ingresso' && checkOut.type === 'uscita') {
          const checkInMinutes = this.parseTimeInMinutes(checkIn.time);
          const checkOutMinutes = this.parseTimeInMinutes(checkOut.time);
          const diffInMinutes = checkOutMinutes - checkInMinutes;
  
          console.log(`  - Ingresso alle ${checkIn.time}, Uscita alle ${checkOut.time}`);
          console.log(`    → Differenza: ${diffInMinutes / 60} ore`);
  
          totalMinutes += diffInMinutes;
          validPairs++;
        }
      }
  
      console.log(`  → Totale ore per ${user.name} ${user.surname}: ${(totalMinutes / 60).toFixed(2)} ore`);
  
      if (validPairs > 0 && totalMinutes < 240) {
        console.log(`  ⚠️ Anomalia: meno di 4 ore lavorate`);
        anomalies++;
      }
    });
  
    console.log(`\n✅ Totale anomalie rilevate: ${anomalies}`);
    return anomalies;
  });
  

  protected readonly Items = computed(() => [
    { title: 'Numero totale dei dipendenti:', text: this.totalEmployees(), action: 'pulsante' },
    { title: 'Timbrature di oggi:', text: this.todayStampsCount(), action: 'pulsante' },
    { title: 'Percentuale presenti:', text: `${this.todayPresencePercentage()}%`, action: 'pulsante' },
    { title: 'Alert sulle anomalie', text: this.anomalyCount(), action: 'pulsante' },
  ]);
}