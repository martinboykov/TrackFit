import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireAuthStub } from './sharing/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { mockRouter } from '../testing';

describe('AuthService', () => {
    let service: AuthService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([])],
            providers: [
                { provide: AngularFireAuth, useValue: AngularFireAuthStub },
                { provide: Router, useValue: mockRouter },
            ],
        });
        service = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
