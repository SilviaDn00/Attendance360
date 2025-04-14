import { Component, inject, OnInit } from '@angular/core';
import { Column, TableComponent } from '../../table/table.component';
import { StampService } from '../../employee-area/services/stamp.service';
import { UsersService } from '../../login-area/services/users.service';
import { User } from '../../models/users';
import { Stamp } from '../../models/stamp';
import { IEnrichedStamp } from '../../models/IEnrichedStamp';
import { FilterComponent } from '../../filter/filter.component';
import { IFilters } from '../../models/IFilter';


@Component({
  selector: 'app-admin-table',
  imports: [TableComponent, FilterComponent],
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
    { key: 'type', label: 'Tipo', type: 'stampType' }
  ];
  public rows: IEnrichedStamp[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this._userService.getUsers().subscribe((users: User[]) => {
      console.log('Users ricevuti:', users);
      this._stampService.GetStamp().subscribe((stamps: Stamp[]) => {
        this.rows = stamps.map(stamp => {
          const user = users.find(u => u.id?.trim().toLowerCase() === stamp.userID?.trim().toLowerCase());
          return {
            username: user ? `${user.name} ${user.surname}` : stamp.userID ?? 'N/A',
            role: user?.role ?? 'N/A',
            department: user?.department ?? 'N/A',
            date: stamp.date,
            time: stamp.time,
            type: stamp.type
          };
        }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      });
    });
  }

  onFiltersChanged(filters: IFilters) {
    this.currentFilters = filters;
  }
}
