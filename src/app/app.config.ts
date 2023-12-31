import {ApplicationConfig, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideState, provideStore} from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import { authFeatureKey, authReducer } from './auth/store/reducers';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import * as authEffects from './auth/store/effect';
import * as feedEffects from './shared/components/feed/store/effect';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { authInterceptor } from './shared/services/auth.interceptor';
import { feedFeatureKey, feedReducer } from './shared/components/feed/store/reducer';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideStore({
            router: routerReducer
        }),
        provideRouterStore(),
        provideState(authFeatureKey, authReducer),
        provideState(feedFeatureKey, feedReducer),
        provideEffects(
            authEffects,
            feedEffects,
        ),
        provideStoreDevtools({
            maxAge: 25,
            logOnly: !isDevMode,
            autoPause: true,
            trace: false,
            traceLimit: 75,
        }),
    ],
};
