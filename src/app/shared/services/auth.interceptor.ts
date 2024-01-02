import {HttpInterceptor, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {PersistanceService} from './persistance.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
    const persistanceService = inject(PersistanceService);
    const token : any= persistanceService.get('accessToken');
   
    const tokenString = Array.from(token).slice(3, -3).join('')
 
    request = request.clone({
        setHeaders: {
            Authorization: token ? `Token ${tokenString}` : '',
        },
    });
    return next(request);
};
