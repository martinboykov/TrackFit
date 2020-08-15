import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '../auth.service';
import { authMockService } from '../sharing/testing';
import { FormsModule } from '@angular/forms';

describe('SignupComponent', () => {
    let component: SignupComponent;
    let fixture: ComponentFixture<SignupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SignupComponent],
            imports: [FormsModule],
            providers: [{ provide: AuthService, useValue: authMockService }],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
