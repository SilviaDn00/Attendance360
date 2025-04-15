import { Component, computed, inject, signal, untracked } from '@angular/core';
import { LoginService } from '../../login-area/services/login.service';
import { CardComponent } from '../../card/card.component';
import { UsersService } from '../../service/users.service';
import { User } from '../../models/users';
import { Stamp, StampType } from '../../models/stamp';
import { StampService } from '../../employee-area/services/stamp.service';
import { IEnrichedStamp } from '../../models/IEnrichedStamp';
import { Column, TableComponent } from '../../table/table.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CardComponent, TableComponent, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  public logService = inject(LoginService);
  private _userService = inject(UsersService);
  private _stampService = inject(StampService);

  protected readonly userList = signal<User[]>([]);
  protected readonly stampList = signal<Stamp[]>([]);

  constructor() {
    // Carica utenti e timbrature in modo asincrono
    this.loadData();
  }

  public loadData() {
    this._userService.getUsers().subscribe(userData => {
      this.userList.set(userData);
    });

    this._stampService.GetStamp().subscribe(stampData => {
      this.stampList.set(stampData);
    });
  }

  public columns: Column<IEnrichedStamp>[] = [
    { key: 'username', label: 'Dipendente', type: 'string' },
    { key: 'department', label: 'Reparto', type: 'string' },
    { key: 'role', label: 'Ruolo', type: 'string' },
    { key: 'date', label: 'Data', type: 'date' },
    { key: 'time', label: 'Orario', type: 'string' },
    { key: 'type', label: 'Tipo', type: 'stampType' }
  ];

  protected readonly rows = computed(() =>
    this.stampList().map<IEnrichedStamp>(s => {
      const user = this.userList().find(u =>
        u.id?.trim().toLowerCase() === s.userID?.trim().toLowerCase()
      );

      return {
        username: user ? `${user.name} ${user.surname}` : s.userID ?? 'N/A',
        role: user?.role ?? 'N/A',
        department: user?.department ?? 'N/A',
        date: s.date,
        time: s.time,
        type: s.type
      };
    })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10))



  // CARD "NUMERO TOTALE DEI DIPENDENTI"
  protected readonly totalEmployees = computed(() =>
    this.userList().filter(user => user.role === 'employee').length
  );


  // CARD "TIMBRATURE DI OGGI"
  protected readonly todayStampsCount = computed(() => {
    const stamps = this.stampList();
    return stamps.filter(stamp => this.isStampToday(stamp)).length;
  });


  // CARD "PERCENTUALE DI PRESENZA"
  protected readonly todayPresencePercentage = computed(() => {
    const total = this.totalEmployees();
    if (total === 0) return 0;

    const todayStamps = this.stampList().filter(stamp => this.isStampToday(stamp));
    const presentUsers = new Set<string>();

    todayStamps.forEach(stamp => {
      if (!stamp.userID) return;
      if (stamp.type === 'ingresso') presentUsers.add(stamp.userID);
      else if (stamp.type === 'uscita') presentUsers.delete(stamp.userID);
    });

    return Math.round((presentUsers.size / total) * 100);
  });


  // CARD "ALERT SULLE ANOMALIE"
  protected readonly anomalyCount = computed(() => {
    const users = this.userList();
    const stamps = this.stampList();
    let anomalies = 0;

    if (users.length && stamps.length) {
      const todayStamps = stamps.filter(stamp => this.isStampToday(stamp));

      users.forEach(user => {
        if (user.role !== 'employee') return;

        const userStamps = todayStamps
          .filter(stamp => stamp.userID === user.id)
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

            totalMinutes += diffInMinutes;
            validPairs++;
          }
        }

        if (validPairs > 0 && totalMinutes < 240) {
          anomalies++;
        }
      });
    }
    return anomalies;
  });


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


  // Converte l'orario (HH:MM) in minuti
  private parseTimeInMinutes(timeString: string): number {
    const [hours, minutes] = timeString.split(':').map(num => parseInt(num, 10));
    return hours * 60 + minutes;
  }


  protected readonly items = computed(() => [
    { title: 'Numero totale dei dipendenti:', text: this.totalEmployees(), action: 'pulsante' },
    { title: 'Timbrature di oggi:', text: this.todayStampsCount(), action: 'pulsante' },
    { title: 'Percentuale presenti:', text: `${this.todayPresencePercentage()}%`, action: 'pulsante' },
    { title: 'Alert sulle anomalie', text: this.anomalyCount(), action: 'pulsante' },
  ]);



}