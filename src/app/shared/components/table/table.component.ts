import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ContentChildren, inject, Input, OnChanges, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { IFilters } from '../../models/filter.interface';
import { RouterModule } from '@angular/router';
import { CommandService } from '../../../admin-area/services/commands.service';
import { TableColumnDirective } from '../../directives/table-column.directive';

export type Column<T> = {
  key: keyof T;
  label: string;
  type: 'number' | 'date' | 'string' | 'boolean' | 'stampType' | 'userID' | 'department' | 'role' | 'time' | 'button' | 'custom';
  cellTemplate?: string | TemplateRef<any> ;
}


@Component({
  selector: 'app-table',
  imports: [CommonModule, RouterModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
})
export class TableComponent<T> implements OnChanges, AfterContentInit {

  protected commandsService = inject(CommandService);
  @Input() public family: string = '';

  @Input() public columns: Column<T>[] = [];
  @Input() public rows: T[] = [];
  @Input() public rowsPerPage = 10;
  @Input() public typeOptions: string[] = [];

  @Input() public showFilters: boolean = true;  // Imposta la visibilità dei filtri

  @Input() set filters(value: IFilters | null) {
    this._filters = value;
    if (value) {
      this.applyFilters(value);
    } else {
      this.filteredRows = [...this.rows]; // Se non ci sono filtri, mostra tutto
      this.updatePaginatedRows();
    }
  }

  //query contentChildren
  @ContentChildren(TableColumnDirective) tableColumns!: QueryList<TableColumnDirective>;


  private _filters: IFilters | null = null;

  public filteredRows: T[] = [];
  public paginatedRows: T[] = [];
  public currentPage = 1;
  public visiblePages: number[] = [];  // Proprietà per gestire le pagine visibili

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rows']) {
      if (this._filters) {
        this.applyFilters(this._filters); // Riapplica i filtri alle nuove righe
      } else {
        this.filteredRows = [...this.rows];
        this.currentPage = 1;
        this.updatePaginatedRows();
      }
    }
  }


  ngAfterContentInit(): void {
    this.tableColumns.map(c => ({ //mettere le parentesi tonde prima delle graffe serve a far si che ql'arrow function restituisca un object literal
      name: c.templateName,
      templateRef: c.template
    })).forEach(template => {
      this.columns.filter(
        col => col.cellTemplate === template.name
      ).forEach(col =>
        col.cellTemplate = template.templateRef
      )
    })
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
      const matchUsername = !filters.username || (row as any)['username']?.toLowerCase().includes(filters.username.toLowerCase());
      const matchDepartment = !filters.department || (row as any)['department']?.toLowerCase().includes(filters.department.toLowerCase());

      return matchStart && matchEnd && matchType && matchUsername && matchDepartment;
    });

    this.currentPage = 1;
    this.updatePaginatedRows();
  }


  updateVisiblePages(): void {
    const totalPages = this.totalPages;

    // Se ci sono meno di 5 pagine totali, mostriamo tutte le pagine
    if (totalPages <= 5) {
      this.visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1);
      return;
    }
    // Prima pagina fissa
    const pages = [1];

    // Se la pagina corrente è troppo vicina alla prima o all'ultima, dobbiamo limitare il numero di pagine centrali visibili
    let startPage = Math.max(2, this.currentPage - 2);  // Almeno 2 pagine prima della pagina corrente
    let endPage = Math.min(totalPages - 1, this.currentPage + 2);  // Almeno 2 pagine dopo la pagina corrente

    // Se siamo alle prime o ultime pagine, dobbiamo aggiustare il range
    if (this.currentPage <= 3) {
      startPage = 2;  // Spostiamo la pagina centrale più in basso
      endPage = Math.min(totalPages - 1, 5);  // La pagina finale non può andare oltre 5
    } else if (this.currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - 4);  // Limitiamo a 5 le pagine finali
      endPage = totalPages - 1;
    }

    // Aggiungi le 3 pagine centrali
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Ultima pagina fissa
    pages.push(totalPages);

    // Imposta la visibilità delle pagine centrali
    this.visiblePages = pages;
  }

  updatePaginatedRows() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    this.paginatedRows = this.filteredRows.slice(start, start + this.rowsPerPage);
    this.updateVisiblePages();  // Chiamare questa funzione ogni volta che aggiorniamo le righe
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
