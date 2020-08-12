import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from 'src/environments/secret';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    // private user: User = null;
    authChange$ = new BehaviorSubject<boolean>(false);
    constructor(private router: Router, private fireAuthS: AngularFireAuth) {}
    authListener() {
        this.fireAuthS.authState.subscribe((user) => {
            if (user) {
                this.onAuthStatusChange(true, '/training');
            } else {
                this.onAuthStatusChange(false, '/login');
            }
        });
    }
    signup(authData: AuthData) {
        this.fireAuthS.auth
            .createUserWithEmailAndPassword(authData.email, authData.password)
            .then((response) => {
                console.log(response);
                this.onAuthStatusChange(true, '/training');
            })
            .catch((error) => {
                console.log(error);
                this.onAuthStatusChange(false);
            });
    }
    login(authData: AuthData) {
        this.fireAuthS.auth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then((response) => {
                console.log(response);
                this.onAuthStatusChange(true, '/training');
            })
            .catch((error) => {
                console.log(error);
                this.onAuthStatusChange(false);
            });
    }
    logout() {
        this.onAuthStatusChange(false, '/login');
        localStorage.removeItem(
            `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
        );
    }
    getUser() {
        // return { ...this.user }; // return new user object => no obj mutation
    }

    isAuth() {
        return this.authChange$.getValue();
    }

    onAuthStatusChange(isAuth, toRoute = null) {
        this.authChange$.next(isAuth);
        if (toRoute) {
            this.router.navigate([toRoute]);
        }
    }
}
