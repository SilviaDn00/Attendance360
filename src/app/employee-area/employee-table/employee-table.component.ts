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
  loginService = inject(LoginService)
  private _employeeService = inject(StampService);
  
  public columns: Column<Stamp>[] = [
    { key: 'date', label: 'Data', type: 'date' },
    { key: 'time', label: 'Orario', type: 'string' },
    { key: 'type', label: 'Tipo di timbratura', type: 'string' }
  ];

  public rows: Stamp[] = [];
  public allRows: Stamp[] = [];
  public rowsPerPage = 8;
  public currentPage = 1;

  ngOnInit(): void {
    // Carica le timbrature dalla API e ordina le righe
    this._employeeService.GetStamp().subscribe(response => {
      console.log('Timbrature:', response);
      
      // Ordina le timbrature dalla più recente alla più vecchia
      this.allRows = response.sort((a, b) => new Date(`${b.date}`).getTime() - new Date(`${a.date}`).getTime());
      
      // Imposta le righe visibili per la prima pagina
      this.rows = this.paginatedRows;
    });
  }

  // Logica di paginazione
  get paginatedRows(): Stamp[] {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    return this.allRows.slice(start, start + this.rowsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.allRows.length / this.rowsPerPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.rows = this.paginatedRows; // Aggiorna le righe quando cambi pagina
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.rows = this.paginatedRows;
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.rows = this.paginatedRows;
    }
  }
}
