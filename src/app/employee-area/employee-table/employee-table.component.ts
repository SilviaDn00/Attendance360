import { Component, inject } from '@angular/core';
import { Stamp } from '../../models/stamp';
import { StampService } from '../services/stamp.service';
import { Column, TableComponent } from '../../table/table.component';
import { LoginService } from '../../login-area/services/login.service';
import { FilterComponent } from '../../filter/filter.component';

@Component({
  selector: 'app-employee-table',
  imports: [TableComponent, FilterComponent],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss'
})
export class EmployeeTableComponent {
  loginService = inject(LoginService)
  private _employeeService = inject(StampService);

  public columns: Column<Stamp>[] = [
    { key: 'date', label: 'Data', type: 'date' },
    { key: 'time', label: 'Orario', type: 'string' },
    { key: 'type', label: 'Tipo di timbratura', type: 'string' }
  ];

  public allRows: Stamp[] = [...this._employeeService.listaStamp]
    .sort((a, b) => new Date(`${b.date}`).getTime() - new Date(`${a.date}`).getTime());

  public rowsPerPage = 8;
  public currentPage = 1;

  get paginatedRows(): Stamp[] {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    return this.allRows.slice(start, start + this.rowsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.allRows.length / this.rowsPerPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }


  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }


}
