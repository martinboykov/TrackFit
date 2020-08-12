import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    sideNavOpen: boolean;
    hasBackdrop: boolean;
    constructor(private authS: AuthService) {}
    ngOnInit() {
        this.authS.authListener();
    }
}
