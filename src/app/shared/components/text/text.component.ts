import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text',
  imports: [CommonModule],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextComponent),
      multi: true
    }
  ],
})
/**
 * TextComponent is a reusable component for input fields.
 * It implements ControlValueAccessor to integrate with Angular forms.
 * It allows for different types of inputs (text, email, password) and provides a label.
 */
export class TextComponent implements ControlValueAccessor {

  @Input() label = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() id = '';
  @Input() placeholder = '';
  @Input() control?: AbstractControl | null;


  value = '';
  disabled = false;

  // private onValidatorChange = () => { };
  protected onChange = (value: string) => { };
  protected onTouched = () => { };


  //CONTROL VALUE ACCESSOR
  // per aggiornare il valore dell'input
  writeValue(value: string): void {
    this.value = value;
  }

  // per registrare la funzione di callback per il cambiamento del valore
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  // per registrare la funzione di callback per il tocco dell'input
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // aggiorna il valore dell'input quando l'utente digita
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    // this.onValidatorChange();
  }
}
