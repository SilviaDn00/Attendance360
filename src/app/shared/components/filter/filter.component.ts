import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { IFilters } from '../../models/filter.interface';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-filter',
  imports: [MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, MatRadioModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FilterComponent implements OnInit {
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  public selectedType: string | null = null;
  public usernameControl = new FormControl<string | null>(null);
  public departmentControl = new FormControl<string | null>(null);

  @Input() initialFilters: IFilters | null = null;
  @Input() typeOptions: string[] = [];
  @Output() filtersChanged = new EventEmitter<IFilters>();

  ngOnInit(): void {
    if (this.initialFilters) {
      this.range.patchValue({
        start: this.initialFilters.start ? new Date(this.initialFilters.start) : null,
        end: this.initialFilters.end ? new Date(this.initialFilters.end) : null
      });

      this.selectedType = this.initialFilters.type;
      this.usernameControl.setValue(this.initialFilters.username ?? null);
      this.departmentControl.setValue(this.initialFilters.department ?? null);

      setTimeout(() => this.emitFilters());
    }

    this.range.valueChanges.subscribe(() => this.emitFilters());

    this.usernameControl.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(() => this.emitFilters());

    this.departmentControl.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(() => this.emitFilters());
  }

  emitFilters() {
    const filters: IFilters = {
      start: this.range.value.start ?? null,
      end: this.range.value.end ?? null,
      type: this.selectedType,
      username: this.usernameControl.value ?? null,
      department: this.departmentControl.value ?? null,
    };

    this.filtersChanged.emit(filters);
  }

  resetFilters() {
    this.range.reset();
    this.selectedType = null;
    this.usernameControl.reset();
    this.departmentControl.reset();
    this.emitFilters();
    localStorage.removeItem('employee-filters');
    localStorage.removeItem('admin-filters');
  }

  onTypeChange(type: string | null) {
    this.selectedType = type;
    this.emitFilters();
  }
}
