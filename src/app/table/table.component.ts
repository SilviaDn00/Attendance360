import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Stamp } from '../models/stamp';
import { User } from '../models/users';

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
export class TableComponent<T extends User | Stamp > {

  @Input() public columns: Column<T>[] = [];

  @Input() public rows: T[] = []; 

}
