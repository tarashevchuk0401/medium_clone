import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RegisterRequestInterface} from '../types/registerRequest.interface';
import {Observable, map} from 'rxjs';
import {currentUser} from '../../shared/types/currentUser.interface';
import {AuthResponseInterface} from '../types/authResponse.interface';
import {environment} from '../../../environments/environment.development';
import {LoginRequestInterface} from '../types/loginRequest.interface';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}

    getUser(response: AuthResponseInterface): currentUser{
        return response.user
    }

    register(data: RegisterRequestInterface): Observable<currentUser> {
        const url: string = environment.apiUrl + '/users';
        return this.http
            .post<AuthResponseInterface>(url, data)
            .pipe(map(this.getUser))
    }

    login(data: LoginRequestInterface): Observable<currentUser> {
        const url: string = environment.apiUrl + '/users/login';

        return this.http
            .post<AuthResponseInterface>(url, data)
            .pipe(map(this.getUser));
    }

    getCurrentUser(): Observable<currentUser>{
        const url: string = environment.apiUrl + '/user';
        return this.http
            .get<AuthResponseInterface>(url)
            .pipe(map(this.getUser))
    }
}
