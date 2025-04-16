import { CanDeactivateFn } from '@angular/router';
import { EmployeeManagementComponent } from '../employee-management/employee-management.component';

export const unsavedChangesGuard: CanDeactivateFn<EmployeeManagementComponent> = (component, _currentRoute, _currentState, _nextState) => {
  return component.stampFormGroup.dirty ? confirm('Hai delle modifiche non salvate. Vuoi uscire senza salvare?') : true;
};
