import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/user.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    @Input() drawer;
    isAuth: User;
    authSub: Subscription;
    constructor(private authS: AuthService) {}

    ngOnInit(): void {
        this.authSub = this.authS.authChange.subscribe((authStatus) => {
            this.isAuth = authStatus;
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
