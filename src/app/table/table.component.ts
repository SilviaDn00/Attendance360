import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { User } from '../models/users';
import { Stamp } from '../models/stamp';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
})
export class TableComponent< T extends User | Stamp > {

  @Input() public columns: { key: keyof T, label: string }[] = [];

  @Input() public rows: T[] = []; //corretto

}
