import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [],
  template: '<div>{{message}}</div>',
  styleUrl: './errorMessage.component.scss'
})
export class ErrorMessageComponent {
  @Input() message :string = 'Something whent wrong';



}
