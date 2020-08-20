import { Injectable } from '@angular/core';
import { User, AuthData } from './user.model';
import { BehaviorSubject, of } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from 'src/environments/secret';
import { AngularFirestore } from 'angularfire2/firestore';
import { take, map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    authChange = new BehaviorSubject<User>(null);
    constructor(
        private router: Router,
        private fireAuthS: AngularFireAuth,
        private db: AngularFirestore
    ) {}
    authListener() {
        this.fireAuthS.authState
            .pipe(
                switchMap((user) => {
                    if (user) {
                        return this.getUser(user.uid);
                    } else {
                        return of(null);
                    }
                })
            )
            .subscribe((user) => {
                if (user) {
                    console.log(user);

                    this.onAuthStatusChange(user, '/training');
                } else {
                    this.onAuthStatusChange(null, '/login');
                }
            });
    }
    async signup(authData: AuthData) {
        const userData = await this.fireAuthS.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password
        );
        const newUser = new User({ ...this.getUserData(userData.user) });
        console.log(newUser);

        await this.addUserToDB(newUser);
        if (userData) return this.onAuthStatusChange(newUser, '/training');
        this.onAuthStatusChange(null);
    }
    addUserToDB(user: User) {
        console.log({ ...user });

        return this.db
            .collection<User>('users')
            .doc<User>(user.uid)
            .set({ ...user }, { merge: true });
    }

    async login(authData: AuthData) {
        await this.fireAuthS.auth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then((userData) => {
                const currUser = this.getUserData(userData.user);
                this.onAuthStatusChange(currUser, '/training');
            })
            .catch((error) => {
                console.log(error);
                this.onAuthStatusChange(null);
            });
    }
    logout() {
        this.onAuthStatusChange(null, '/login');
        // localStorage.removeItem(
        //     `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
        // );
        if (window.indexedDB) {
            indexedDB.deleteDatabase('firebaseLocalStorageDb');
        }
    }
    private getUserData(userData) {
        console.log(userData);

        return {
            uid: userData.uid,
            email: userData.email,
            displayName: userData.displayName,
            photoURL: userData.photoURL,
        };
    }
    getUser(uid: string) {
        console.log(uid);

        return this.db
            .collection<User>('users')
            .doc<User>(uid)
            .snapshotChanges()
            .pipe(
                take(1),
                map((userData) => userData.payload.data()),
                map((userData) => {
                    const user: User = {
                        uid: userData.uid,
                        email: userData.email,
                        displayName: userData.displayName,
                        photoURL: userData.photoURL,
                        dataCreated: userData.dataCreated.toDate(),
                        roles: { ...userData.roles },
                    };
                    return user;
                })
            );
    }

    isAuth() {
        return this.authChange.getValue();
    }

    onAuthStatusChange(isAuth, toRoute = null) {
        this.authChange.next(isAuth);
        if (toRoute) {
            this.router.navigate([toRoute]);
        }
    }
}
