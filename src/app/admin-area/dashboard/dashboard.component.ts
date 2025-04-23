import { Component, computed, inject, OnInit, signal, untracked } from '@angular/core';
import { LoginService } from '../../login-area/services/login.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/users';
import { Stamp } from '../../shared/models/stamp';
import { StampService } from '../../employee-area/services/stamp.service';
import { IEnrichedStamp } from '../../shared/models/IEnrichedStamp';
import { Column, TableComponent } from '../../shared/components/table/table.component';
import { RouterModule } from '@angular/router';
import { WorkedHoursService } from '../../shared/services/worked-hours.service';
import { TodayStampsPipe } from '../../shared/pipes/today-stamps.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CardComponent, TableComponent, RouterModule, TodayStampsPipe, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  public logService = inject(LoginService);
  private _userService = inject(UsersService);
  private _stampService = inject(StampService);
  private _workedHoursService = inject(WorkedHoursService);

  public modalContext: { title: string; body: string } | null = null;
  public anomalyresult: string[] = [];


  protected readonly userList = signal<User[]>([]);
  protected readonly stampList = signal<Stamp[]>([]);

  ngOnInit(): void {
    // Inizializza i dati al caricamento del componente
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
    { key: 'type', label: 'Tipo', type: 'stampType' },
    { key: 'workedHours', label: 'Ore lavorate', type: 'number' },
  ];

  protected readonly rows = computed(() =>
    this.stampList().filter(s => this.isStampToday(s))
      .map<IEnrichedStamp>(s => {
        const user = this.userList().find(u =>
          u.id?.trim().toLowerCase() === s.userID?.trim().toLowerCase()
        );

        return {
          username: user ? `${user.name} ${user.surname}` : s.userID ?? 'N/A',
          role: user?.role ?? 'N/A',
          department: user?.department ?? 'N/A',
          date: s.date,
          time: s.time,
          type: s.type,
          workedHours: user ? this._workedHoursService.calculateWorkedHoursForUserOnDate(s.userID!, new Date(s.date), this.stampList()) : 0
        };
      })
  );


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
  protected readonly anomalyCount = computed(() => this.getTodayAnomalies().length);

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

  // Funzione per ottenere le anomalie di oggi
  private getTodayAnomalies(): string[] {
    const users = this.userList();
    const stamps = this.stampList();
    const result: string[] = [];

    if (users.length && stamps.length) {
      const todayStamps = stamps.filter(stamp => this.isStampToday(stamp));

      users.forEach(user => {
        if (user.role !== 'employee') return;

        const userStamps = todayStamps
          .filter(stamp => stamp.userID === user.id)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        const workedHours = this._workedHoursService.calculateWorkedHours(userStamps);

        if (workedHours < 4 && workedHours > 0) {
          result.push(`Anomalia per ${user.name} ${user.surname}: ore lavorate = ${workedHours}.`);
        }
      });
    }
    return result;
  }

  protected readonly items = computed(() => [
    {
      title: 'Numero totale dei dipendenti:',
      text: this.totalEmployees(),
      action: { type: 'link', label: 'Gestione dipendenti', link: 'team-management' }
    },
    {
      title: 'Timbrature di oggi:',
      text: this.todayStampsCount(),
      action: { type: 'button', label: 'Disabled' }
    },
    {
      title: 'Percentuale presenti:',
      text: `${this.todayPresencePercentage()}%`,
      action: { type: 'modal', label: 'Dettagli', modalId: 'AttendanceRateModal' }
    },
    {
      title: 'Anomalie:',
      text: this.anomalyCount(),
      action: { type: 'modal', label: 'Dettagli', modalId: 'AnomalyModal' }
    },
  ]);

  protected readonly anomalyList = computed(() => this.getTodayAnomalies());

  // Funzione per aprire il modal
  getModalContext(modalId: string): any {
    switch (modalId) {
      case 'AnomalyModal':
        return {
          title: 'Dettagli Anomalia',
          body: this.anomalyList().join('\n') // o mostrare come elenco se il template lo supporta
        };

      case 'AttendanceRateModal':
        return {
          title: 'Presenze di oggi',
          body: `Percentuale di presenza oggi: ${this.todayPresencePercentage()}%`
        };

      default:
        return { title: 'N/A', body: 'N/A' };
    }
  }
}