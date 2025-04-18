import { Component, inject, OnInit } from '@angular/core';
import { Column, TableComponent } from '../../table/table.component';
import { StampService } from '../../employee-area/services/stamp.service';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../models/users';
import { IStamp } from '../../models/stamp';
import { IEnrichedStamp } from '../../models/IEnrichedStamp';
import { FilterComponent } from '../../filter/filter.component';
import { IFilters } from '../../models/IFilter';
import { ButtonProperties } from '../../models/buttonProperties';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-admin-table',
  imports: [TableComponent, FilterComponent, RouterLink],
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.scss'
})
export class AdminTableComponent implements OnInit {

  private _stampService = inject(StampService);
  private _userService = inject(UsersService);
  public currentFilters: IFilters | null = null;

  public columns: Column<IEnrichedStamp>[] = [
    { key: 'username', label: 'Dipendente', type: 'string' },
    { key: 'department', label: 'Reparto', type: 'string' },
    { key: 'role', label: 'Ruolo', type: 'string' },
    { key: 'date', label: 'Data', type: 'date' },
    { key: 'time', label: 'Orario', type: 'string' },
    { key: 'type', label: 'Tipo', type: 'stampType' },
    { key: 'workedHours', label: 'Ore ', type: 'number' },
    { key: 'button', label: 'Azione', type: 'button' },
  ];
  public rows: IEnrichedStamp[] = [];

  ngOnInit(): void {
    this.restoreSavedFilters();
    this.loadData();
  }

  private loadData(): void {
    this._userService.getUsers().subscribe((users: IUser[]) => {
      this._stampService.GetStamp().subscribe((stamps: IStamp[]) => {
        this.rows = stamps.map(stamp => {
          const user = users.find(u => u.id?.trim().toLowerCase() === stamp.userID?.trim().toLowerCase());
          var username =user ? `${user.name} ${user.surname}` : stamp.userID ?? 'N/A';
          return {
            username: user ? `${user.name} ${user.surname}` : stamp.userID ?? 'N/A',
            role: user?.role ?? 'N/A',
            department: user?.department ?? 'N/A',
            date: stamp.date,
            time: stamp.time,
            type: stamp.type,
            workedHours: user?.workedHours ?? 0,
            button: [
              new ButtonProperties('bi bi-person-vcard-fill', `/dashboard/stamping-details/${stamp.id}/${(username)}`),
            ],
          };
          
        }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      });
    });
  }

  onFiltersChanged(filters: IFilters) {
    this.currentFilters = filters;
    localStorage.setItem('admin-filters', JSON.stringify(filters));
  }

  private restoreSavedFilters(): void {
    const savedFilters = localStorage.getItem('admin-filters');
    if (savedFilters) {
      const parsed: IFilters = JSON.parse(savedFilters);
      // ricostruisci le date perché da JSON sono stringhe
      this.currentFilters = {
        start: parsed.start ? new Date(parsed.start) : null,
        end: parsed.end ? new Date(parsed.end) : null,
        type: parsed.type ?? null,
      };
    }
  }

}
