import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireAuthStub } from './sharing/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { mockRouter } from '../testing';
import { AngularFirestore } from 'angularfire2/firestore';
import { angularFirestoreStub } from '../training/sharing/testing';

describe('AuthService', () => {
    let service: AuthService;
    let angularFirestore: AngularFirestore;
    let angularFireAuth: AngularFireAuth;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([])],
            providers: [
                { provide: AngularFirestore, useValue: angularFirestoreStub },
                { provide: AngularFireAuth, useValue: AngularFireAuthStub },
                { provide: Router, useValue: mockRouter },
            ],
        });
        service = TestBed.inject(AuthService);
        angularFirestore = TestBed.inject(AngularFirestore);
        angularFireAuth = TestBed.inject(AngularFireAuth);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
