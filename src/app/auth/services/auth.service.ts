import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RegisterRequestInterface} from '../types/registerRequest.interface';
import {Observable, map} from 'rxjs';
import {currentUser} from '../../shared/types/currentUser.interface';
import {AuthResponseInterface} from '../types/authResponse.interface';
import {environment} from '../../../environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    url: string = environment.apiUrl + '/users';

    constructor(private http: HttpClient) {}

    register(data: RegisterRequestInterface): Observable<currentUser> {
        return this.http
            .post<AuthResponseInterface>(this.url, data)
            .pipe(map((response) => response.user));
    }
}
