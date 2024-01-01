import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "rxjs/internal/scheduler/Action";
import { AuthService } from "../services/auth.service";
import { authActions } from "./actions";
import { catchError, map, of, switchMap } from "rxjs";
import { currentUser } from "../../shared/types/currentUser.interface";
import { HttpErrorResponse } from "@angular/common/http";

export const registerEffect = createEffect(
    (actions$ = inject(Actions),
    authService = inject( AuthService)

) => {
    return actions$.pipe(
        ofType(authActions.register),
        switchMap(({request})=> {
            return authService.register(request).pipe(
                map((currentUser: currentUser)=> {
                    return authActions.registerSuccess({currentUser})
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(authActions.registerFailed({
                        errors: errorResponse.error.errors
                    }))
                })
            )
        })
    )
},{functional: true })