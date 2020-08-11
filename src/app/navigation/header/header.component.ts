import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    @Input() drawer;
    isAuth: boolean;
    authSub: Subscription;
    constructor(private authS: AuthService) {}

    ngOnInit(): void {
        this.authSub = this.authS.authChange$.subscribe((authStatus) => {
            this.isAuth = authStatus;
            console.log(this.isAuth);
        });
    }

    ngOnDestroy() {
        this.authSub.unsubscribe();
    }
    onLogout() {
        this.authS.logout();
    }
}
