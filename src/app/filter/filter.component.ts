import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { User } from '../models/users';
import { Stamp } from '../models/stamp';


interface Filters {
  start: Date | null;
  end: Date | null;
  type: string | null;
}

@Component({
  selector: 'app-filter',
  imports: [MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, MatRadioModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent<T extends User | Stamp> {

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  @Input() typeOptions: string[] = [];
  @Output() filtersChanged = new EventEmitter<{ start: Date | null; end: Date | null; type: string | null }>();

  public selectedType: string | null = null;

  constructor() {
    this.range.valueChanges.subscribe(() => {
      this.emitFilters();
    });
  }

  emitFilters() {
    const start = this.range.value.start ?? null;
    const end = this.range.value.end ?? null;

    // Costruire il filtro in modo condizionale, ma tipizzato
    const filters: Filters = {
      start: start,
      end: end,
      type: this.selectedType
    };

    this.filtersChanged.emit(filters); // Emissione con tipo specifico
  }

  resetFilters() {
    this.range.reset();
    this.selectedType = null;
    this.emitFilters();
  }

  onTypeChange(type: string | null) {
    this.selectedType = type;
    this.emitFilters();
  }
}