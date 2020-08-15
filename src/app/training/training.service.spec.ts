import { TestBed } from '@angular/core/testing';

import { TrainingService } from './training.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { angularFirestoreStub } from './sharing/testing';

describe('TrainingService', () => {
    let service: TrainingService;
    let angularFirestore: AngularFirestore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TrainingService,
                { provide: AngularFirestore, useValue: angularFirestoreStub },
            ],
        });
        service = TestBed.inject(TrainingService);
        angularFirestore = TestBed.inject(AngularFirestore);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
