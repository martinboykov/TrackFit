import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
    maxDate: Date;
    checked: boolean;
    constructor(private authS: AuthService) {}

    ngOnInit(): void {
        this.maxDate = new Date();
        this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
        this.checked = false;
    }
    onSubmit(f: NgForm) {
        this.authS.signup({
            email: f.value.email,
            password: f.value.password,
        });
    }
}
