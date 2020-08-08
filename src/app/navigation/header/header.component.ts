import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav/drawer';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    @Input() drawer;
    constructor() {}

    ngOnInit(): void {}
}
