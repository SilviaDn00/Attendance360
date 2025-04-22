import { CanDeactivateFn } from '@angular/router';
import { UserFormComponent } from '../user-form/user-form.component';

export const unsavedUserGuard: CanDeactivateFn<UserFormComponent> = (component, _currentRoute, _currentState, _nextState) => {
  return component.userFormGroup.dirty ? confirm('Hai delle modifiche non salvate. Vuoi uscire senza salvare?') : true;
};