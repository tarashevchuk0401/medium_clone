import {Component, Input, OnInit} from '@angular/core';
import {BackendErrorsInterface} from '../../types/backendErrors.interface';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-backend-error-messages',
    templateUrl: './backendErrorMessages.component.html',
    standalone: true,
    imports: [CommonModule],
})
export class BackendErrorMessages implements OnInit {
    @Input() backendErrors: BackendErrorsInterface | null = {};

    errorMessages: string[] = [];

    ngOnInit(): void {
        if (!this.backendErrors) {
            return;
        }
        this.errorMessages = Object.keys(this.backendErrors).map(
            (name: string) => {
                const messages = this.backendErrors![name].join(' ');
                return `${name} ${messages}`;
            }
        );
    }
}
