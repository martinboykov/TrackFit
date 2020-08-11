import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private user: User = null;
    constructor() {}
    signup(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString(),
        };
    }
    login(authData: AuthData) {
        this.user = {
            email: authData.email,
        };
    }
    logout() {
        this.user = null;
    }
    getUser() {
        return { ...this.user }; // return new user object => no obj mutation
    }

    isAuth() {
        return this.user != null;
    }
}
