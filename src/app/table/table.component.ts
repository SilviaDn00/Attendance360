import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IFilters } from '../models/IFilter';
import { FilterComponent } from '../filter/filter.component';


export type Column<T> = {
  key: keyof T;
  label: string;
  type: 'number' | 'date' | 'string' | 'boolean';
}

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
})
export class TableComponent<T> implements OnChanges {

  @Input() public columns: Column<T>[] = [];
  @Input() public rows: T[] = [];
  @Input() public rowsPerPage = 10;
  @Input() public typeOptions: string[] = [];
  @Input() set filters(value: IFilters | null) {
    if (value) {
      this.applyFilters(value);
    } else {
      this.filteredRows = this.rows;
      this.updatePaginatedRows();
    }
  }
  
  
  public filteredRows: T[] = [];
  public paginatedRows: T[] = [];
  public currentPage = 1;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rows']) {
      this.filteredRows = [...this.rows]; // <-- AGGIUNGI QUESTO!
      this.currentPage = 1;
      this.updatePaginatedRows();
    }
  }
  
  get totalPages(): number {
    return Math.ceil(this.filteredRows.length / this.rowsPerPage);
  }
  
  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  
  applyFilters(filters: IFilters) {
    this.filteredRows = this.rows.filter(row => {
      const rowDate = new Date((row as any)['date']);
      const normalizedRowDate = new Date(rowDate.getFullYear(), rowDate.getMonth(), rowDate.getDate());
      const normalizedStart = filters.start ? new Date(filters.start.getFullYear(), filters.start.getMonth(), filters.start.getDate()) : null;
      const normalizedEnd = filters.end ? new Date(filters.end.getFullYear(), filters.end.getMonth(), filters.end.getDate()) : null;
  
      const matchStart = !normalizedStart || normalizedRowDate >= normalizedStart;
      const matchEnd = !normalizedEnd || normalizedRowDate <= normalizedEnd;
      const matchType = !filters.type || (row as any)['type'] === filters.type;
  
      return matchStart && matchEnd && matchType;
    });
  
    this.currentPage = 1;
    this.updatePaginatedRows();
  }
  
  updatePaginatedRows() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    this.paginatedRows = this.filteredRows.slice(start, start + this.rowsPerPage);
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
  
}
