import { TestBed } from '@angular/core/testing';

import { TrainingService } from './training.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { angularFirestoreStub } from './sharing/testing';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireAuthStub } from '../auth/sharing/testing';
import { Router } from '@angular/router';
import { mockRouter } from '../testing';

describe('TrainingService', () => {
    let service: TrainingService;
    let angularFirestore: AngularFirestore;
    let angularFireAuth: AngularFireAuth;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TrainingService,
                { provide: AngularFirestore, useValue: angularFirestoreStub },
                { provide: AngularFireAuth, useValue: AngularFireAuthStub },
                { provide: Router, useValue: mockRouter },
            ],
        });
        service = TestBed.inject(TrainingService);
        angularFirestore = TestBed.inject(AngularFirestore);
        angularFireAuth = TestBed.inject(AngularFireAuth);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
