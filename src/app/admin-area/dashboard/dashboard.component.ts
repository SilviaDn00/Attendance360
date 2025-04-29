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
import { AnomaliesService } from '../services/anomalies.service';

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
  private _anomaliesService = inject(AnomaliesService); // Assuming this is the correct service for worked hours calculation
  private readonly destroyRef = inject(DestroyRef);

  public modalContext: { title: string; body: string } | null = null;

  protected readonly userList = signal<User[]>([]);
  protected readonly anomalyList = signal<string[]>([]);
  protected readonly enrichedStampList = signal<IEnrichedStamp[]>([]);

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this._userService.getUsers().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(userData => {
      this.userList.set(userData);
    });

    this._enrichedStampService.getTodayEnrichedStamps().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      this.enrichedStampList.set(data)
    })

    this._anomaliesService.GetTodayAnomalies().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(anomaliesList => {
      this.anomalyList.set(anomaliesList)
    })
  }

  //tabella con le timbrature
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


  //card sul numero totale dei dipendenti
  protected readonly totalEmployees = computed(() => this.userList().filter(user => user.role === 'employee').length
  );

  //card sul numero di timbrature di oggi
  protected readonly todayStampsCount = computed(() => this.enrichedStampList().length);

  //card su % di presenza
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

  // card sul numero di anomalie
  protected readonly anomaliesCount = computed(() => this.anomalyList().length);

  // lista delle anomalie
  protected readonly anomaliesList = computed(() => this.anomalyList());

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
      text: this.anomaliesCount(),
      action: { type: 'modal', label: 'Dettagli', modalId: 'AnomalyModal' }
    },
  ]);

  // Funzione per aprire il modal
  getModalContext(modalId: string): any {
    switch (modalId) {
      case 'AnomalyModal':
        const anomalies = this.anomalyList(); // <-- prendo direttamente la lista
        const anomalyDetails = anomalies.length
          ? anomalies.map(anomaly => `Anomalia: ${anomaly}`).join('\n')
          : 'Nessuna anomalia rilevata.';

        return {
          title: 'Dettagli Anomalia',
          body: anomalyDetails
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
