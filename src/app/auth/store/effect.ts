import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from 'rxjs/internal/scheduler/Action';
import {AuthService} from '../services/auth.service';
import {authActions} from './actions';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {currentUser} from '../../shared/types/currentUser.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {PersistanceService} from '../../shared/services/persistance.service';
import {Router} from '@angular/router';

export const registerEffect = createEffect(
    (
        actions$ = inject(Actions),
        authService = inject(AuthService),
        persistanceService = inject(PersistanceService)
    ) => {
        return actions$.pipe(
            ofType(authActions.register),
            switchMap(({request}) => {
                return authService.register(request).pipe(
                    map((currentUser: currentUser) => {
                        persistanceService.set(
                            'accessToken',
                            currentUser.token
                        );
                        return authActions.registerSuccess({currentUser});
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        return of(
                            authActions.registerFailed({
                                errors: errorResponse.error.errors,
                            })
                        );
                    })
                );
            })
        );
    },
    {functional: true}
);

export const redirectAfterRegisterEffect = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
        return actions$.pipe(
            ofType(authActions.registerSuccess),
            tap(() => {
                router.navigateByUrl('/');
            })
        );
    },
    {functional: true, dispatch: false}
);

/////////////////////////////////

export const loginEffect = createEffect(
    (
        actions$ = inject(Actions),
        authService = inject(AuthService),
        persistanceService = inject(PersistanceService)
    ) => {
        return actions$.pipe(
            ofType(authActions.login),
            switchMap(({request}) => {
                return authService.login(request).pipe(
                    map((currentUser: currentUser) => {
                        persistanceService.set(
                            'accessToken',
                            currentUser.token
                        );
                        return authActions.loginSuccess({currentUser});
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        return of(
                            authActions.loginFailed({
                                errors: errorResponse.error.errors,
                            })
                        );
                    })
                );
            })
        );
    },
    {functional: true}
);

export const redirectAfterLoginEffect = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
        return actions$.pipe(
            ofType(authActions.loginSuccess),
            tap(() => {
                router.navigateByUrl('/');
            })
        );
    },
    {functional: true, dispatch: false}
);

////

export const getCurrentUserEffect = createEffect(
    (
        actions$ = inject(Actions),
        authService = inject(AuthService),
        persistanceService = inject(PersistanceService)
    ) => {
        return actions$.pipe(
            ofType(authActions.getCurrentUser),
            switchMap(() => {
                const token = persistanceService.get('accessToken');
                if (!token) {
                    return of(authActions.getCurrentUserFailed());
                }
                return authService.getCurrentUser().pipe(
                    map((currentUser: currentUser) => {
                        return authActions.getCurrentUserSuccess({currentUser});
                    }),
                    catchError(() => {
                        return of(authActions.getCurrentUserFailed());
                    })
                );
            })
        );
    },
    {functional: true}
);
