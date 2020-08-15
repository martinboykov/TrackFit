import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingComponent } from './training.component';
import { TrainingService } from './training.service';
import { trainingServiceStub } from './sharing/testing';
describe('TrainingComponent', () => {
    let component: TrainingComponent;
    let fixture: ComponentFixture<TrainingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TrainingComponent],
            providers: [
                { provide: TrainingService, useValue: trainingServiceStub },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TrainingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
