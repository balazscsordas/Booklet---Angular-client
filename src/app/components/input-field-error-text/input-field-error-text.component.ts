import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-field-error-text',
  templateUrl: './input-field-error-text.component.html',
})
export class InputFieldErrorTextComponent {
  @Input() errorText: string | undefined;
}
