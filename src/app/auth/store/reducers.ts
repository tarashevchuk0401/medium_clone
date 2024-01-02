import {createFeature, createReducer, on} from '@ngrx/store';
import {AuthStateInterface} from '../types/authState.interface';
import {authActions} from './actions';
import {routerNavigationAction} from '@ngrx/router-store';
import {state} from '@angular/animations';

const initialState: AuthStateInterface = {
    isSubmitting: false,
    isLoading: false,
    currentUser: undefined,
    validationErrors: null,
};

const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        initialState,
        on(authActions.register, (state) => ({
            ...state,
            isSubmitting: true,
            validationErrors: null,
        })),
        on(authActions.registerSuccess, (state, action) => ({
            ...state,
            isSubmitting: false,
            currentUser: action.currentUser,
        })),
        on(authActions.registerFailed, (state, action) => ({
            ...state,
            isSubmitting: false,
            validationErrors: action.errors,
        })),

        /////

        on(authActions.login, (state) => ({
            ...state,
            isSubmitting: true,
            validationErrors: null,
        })),
        on(authActions.loginSuccess, (state, action) => ({
            ...state,
            isSubmitting: false,
            currentUser: action.currentUser,
        })),
        on(authActions.loginFailed, (state, action) => ({
            ...state,
            isSubmitting: false,
            validationErrors: action.errors,
        })),
        on(routerNavigationAction, (state) => ({
            ...state,
            validationError: null,
        })),
        //
        on(authActions.login, (state) => ({
            ...state,
            isSubmitting: true,
        })),
        on(authActions.getCurrentUserSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            currentUser: action.currentUser,
        })),
        on(authActions.getCurrentUserFailed, (state, action) => ({
            ...state,
            isLoading: false,
           currentUser: null,
        })),
      

    ),
});

export const {
    name: authFeatureKey,
    reducer: authReducer,
    selectIsSubmitting,
    selectCurrentUser,
    selectValidationErrors,
} = authFeature;
