import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class FilterComponent<T extends User | Stamp> implements OnInit {

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  @Input() initialFilters: Filters | null = null;
  @Input() typeOptions: string[] = [];
  @Output() filtersChanged = new EventEmitter<{ start: Date | null; end: Date | null; type: string | null }>();

  public selectedType: string | null = null;

  constructor() {
    this.range.valueChanges.subscribe(() => {
      this.emitFilters();
    });
  }


  ngOnInit(): void {
    if (this.initialFilters) {
      this.range.patchValue({
        start: this.initialFilters.start ? new Date(this.initialFilters.start) : null,
        end: this.initialFilters.end ? new Date(this.initialFilters.end) : null
      });
  
      this.selectedType = this.initialFilters.type;
  
      // aspetta un tick del ciclo Angular per assicurarti che tutto sia visibile
      setTimeout(() => {
        this.emitFilters();
      });
    }
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
    localStorage.removeItem('employee-filters')
    localStorage.removeItem('admin-filters')

  }

  onTypeChange(type: string | null) {
    this.selectedType = type;
    this.emitFilters();
  }
}