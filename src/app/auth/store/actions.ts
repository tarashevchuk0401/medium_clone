import {createAction, createActionGroup, emptyProps, props} from '@ngrx/store';
import {RegisterRequestInterface} from '../types/registerRequest.interface';
import {currentUser} from '../../shared/types/currentUser.interface';
import {BackendErrorsInterface} from '../../shared/types/backendErrors.interface';
import {LoginRequestInterface} from '../types/loginRequest.interface';

// export const register = createAction(
//     '[Auth] Register',
//     props<{request: RegisterRequestInterface}>()
// );
// export const registerSuccess = createAction(
//     'Success',
//     props<{request: RegisterRequestInterface}>()
// );
// export const registerFailed = createAction(
//     '[Auth] Register Failed',
//     props<{request: RegisterRequestInterface}>()
// );

export const authActions = createActionGroup({
    source: 'auth',
    events: {
        Register: props<{request: RegisterRequestInterface}>(),
        'Register success': props<{currentUser: currentUser}>(),
        'Register failed': props<{errors: BackendErrorsInterface}>(),

        Login: props<{request: LoginRequestInterface}>(),
        'Login success': props<{currentUser: currentUser}>(),
        'Login failed': props<{errors: BackendErrorsInterface}>(),

        'Get current user': emptyProps(),
        'Get current user success': props<{currentUser: currentUser}>(),
        'Get current user failed': emptyProps(),
    },
});

authActions.register;
