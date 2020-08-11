import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private user: User = null;
    authChange$ = new BehaviorSubject<boolean>(false);
    constructor(private router: Router) {}
    signup(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString(),
        };
        this.onAuthStatusChange(true, '/training');
    }
    login(authData: AuthData) {
        this.user = {
            email: authData.email,
        };
        this.onAuthStatusChange(true, '/training');
    }
    logout() {
        this.user = null;
        this.onAuthStatusChange(false, '/login');
    }
    getUser() {
        return { ...this.user }; // return new user object => no obj mutation
    }

    isAuth() {
        return this.user != null;
    }

    onAuthStatusChange(isAuth, toRoute) {
        this.authChange$.next(isAuth);
        this.router.navigate([toRoute]);
    }
}
