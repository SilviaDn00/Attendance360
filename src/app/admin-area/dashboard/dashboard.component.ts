import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { LoginService } from '../../login-area/services/login.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.DTO';
import { IEnrichedStamp } from '../../shared/models/enrichedStamp.interface';
import { Column, TableComponent } from '../../shared/components/table/table.component';
import { RouterModule } from '@angular/router';
import { TodayStampsPipe } from '../../shared/pipes/today-stamps.pipe';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EnrichedStampService } from '../services/enriched-stamp.service';

@Component({
  selector: 'app-dashboard',
  imports: [CardComponent, TableComponent, RouterModule, TodayStampsPipe, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  public logService = inject(LoginService);
  private _userService = inject(UsersService);
  private _enrichedStampService = inject(EnrichedStampService);

  public modalContext: { title: string; body: string } | null = null;

  protected readonly userList = signal<User[]>([]);
  protected readonly enrichedStampList = signal<IEnrichedStamp[]>([]);

  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this._userService.getUsers().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(userData => {
      this.userList.set(userData);
    });

    this._enrichedStampService.getTodayEnrichedStamps().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      this.enrichedStampList.set(data);
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

  protected readonly rows = computed(() => this.enrichedStampList());

  protected readonly totalEmployees = computed(() =>
    this.userList().filter(user => user.role === 'employee').length
  );

  protected readonly todayStampsCount = computed(() => this.enrichedStampList().length);

  protected readonly todayPresencePercentage = computed(() => {
    const total = this.totalEmployees();
    if (total === 0) return 0;

    const presentUsers = new Set<string>();

    this.enrichedStampList().forEach(stamp => {
      if (!stamp.userId) return;
      if (stamp.type === 'ingresso') presentUsers.add(stamp.userId);
      else if (stamp.type === 'uscita') presentUsers.delete(stamp.userId);
    });

    return Math.round((presentUsers.size / total) * 100);
  });

  protected readonly anomalyCount = computed(() => this.anomalyList().length);

  protected readonly anomalyList = computed(() => {
    const users = this.userList();
    const stamps = this.enrichedStampList();
    const anomalies: string[] = [];

    if (users.length && stamps.length) {
      users.forEach(user => {
        if (user.role !== 'employee') return;

        const userStamps = stamps.filter(s => s.userId === user.id);
        const totalWorked = userStamps.reduce((acc, s) => acc + (s.workedHours ?? 0), 0);

        if (totalWorked > 0 && totalWorked < 4) {
          anomalies.push(`Anomalia per ${user.name} ${user.surname}: ore lavorate = ${totalWorked.toFixed(2)}.`);
        }
      });
    }

    return anomalies;
  });

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

  getModalContext(modalId: string): any {
    switch (modalId) {
      case 'AnomalyModal':
        return {
          title: 'Dettagli Anomalia',
          body: this.anomalyList().join('\n')
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
