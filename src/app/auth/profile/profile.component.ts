import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import { Subscription, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
    user: User;
    authSub: Subscription;
    photoURL: string;
    constructor(private authS: AuthService) {}

    ngOnInit(): void {
        this.authSub = this.authS.authChange.subscribe((user) => {
            this.user = user;
        });
    }
    ngOnDestroy() {
        if (this.authSub) {
            this.authSub.unsubscribe();
        }
    }
    onLogout() {
        this.authS.logout();
    }
}
