import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-side-nav-list',
    templateUrl: './side-nav-list.component.html',
    styleUrls: ['./side-nav-list.component.scss'],
})
export class SideNavListComponent implements OnInit, OnDestroy {
    @Input() drawer;
    isAuth: boolean;
    authSub: Subscription;
    constructor(private authS: AuthService) {}

    ngOnInit(): void {
        this.authSub = this.authS.authChange.subscribe((authStatus) => {
            this.isAuth = authStatus;
        });
    }
    ngOnDestroy() {
        this.authSub.unsubscribe();
    }
    onLogout() {
        this.authS.logout();
    }
}
