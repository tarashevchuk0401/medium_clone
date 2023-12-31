import {Component} from '@angular/core';
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {Store} from '@ngrx/store';
import {authActions} from '../../store/actions';
import {RegisterRequestInterface} from '../../types/registerRequest.interface';
import {RouterLink} from '@angular/router';
import {selectIsSubmitting, selectValidationErrors} from '../../store/reducers';
import {AuthStateInterface} from '../../types/authState.interface';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {combineLatest} from 'rxjs';
import {BackendErrorMessages} from '../../../shared/components/backendErrorMessages/backendErrorMessages.component';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        BackendErrorMessages,
        CommonModule,
        ReactiveFormsModule,
        RouterLink,
        HttpClientModule,
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
})
export class RegisterComponent {
    form = this.fb.nonNullable.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
    });

    isSubmitting$ = this.store.select(selectIsSubmitting);
    backendErrors$ = this.store.select(selectValidationErrors);

    constructor(
        private fb: FormBuilder,
        private store: Store<{auth: AuthStateInterface}>,
        private authService: AuthService
    ) {}

    onSubmit() {
        const request: RegisterRequestInterface = {
            user: this.form.getRawValue(),
        };

        this.store.dispatch(authActions.register({request}));
    }
}
