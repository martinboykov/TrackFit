import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    constructor(private authS: AuthService) {}

    ngOnInit(): void {}

    onSubmit(f: NgForm) {
        this.authS.login({
            email: f.value.email,
            password: f.value.password,
        });
    }
}
