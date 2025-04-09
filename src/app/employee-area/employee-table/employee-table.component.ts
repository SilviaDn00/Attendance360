import { Component, inject, OnInit } from '@angular/core';
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
export class EmployeeTableComponent implements OnInit {
  loginService = inject(LoginService);
  private _employeeService = inject(StampService);

  public columns: Column<Stamp>[] = [
    { key: 'date', label: 'Data', type: 'date' },
    { key: 'time', label: 'Orario', type: 'string' },
    { key: 'type', label: 'Tipo di timbratura', type: 'string' }
  ];

  public allRows: Stamp[] = [];
  public filteredRows: Stamp[] = [];
  public rows: Stamp[] = [];

  public rowsPerPage = 8;
  public currentPage = 1;

  ngOnInit(): void {
    this._employeeService.GetStamp().subscribe(response => {
      this.allRows = response.sort((a, b) => new Date(`${b.date}`).getTime() - new Date(`${a.date}`).getTime());
      this.filteredRows = [...this.allRows];
      this.updatePaginatedRows();
    });
  }

  updatePaginatedRows() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    this.rows = this.filteredRows.slice(start, start + this.rowsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredRows.length / this.rowsPerPage);
  }

  get pageNumbers(): number[] {
    return [...Array(this.totalPages).keys()].map(i => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedRows();
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedRows();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedRows();
    }
  }

  applyFilters(filters: { start: Date | null, end: Date | null, type: string | null }) {
    this.filteredRows = this.allRows.filter(row => {
      const rowDate = new Date(`${row.date}`);

      const matchStart = !filters.start || rowDate >= filters.start;
      const matchEnd = !filters.end || rowDate <= filters.end;
      const matchType = !filters.type || row.type === filters.type;

      return matchStart && matchEnd && matchType;
    });

    this.currentPage = 1;
    this.updatePaginatedRows();
  }
}
