import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTrainingComponent } from './new-training.component';
import { TrainingService } from '../training.service';
import { trainingServiceStub } from '../sharing/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('NewTrainingComponent', () => {
    let component: NewTrainingComponent;
    let fixture: ComponentFixture<NewTrainingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NewTrainingComponent],
            imports: [FormsModule],
            providers: [
                { provide: TrainingService, useValue: trainingServiceStub },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewTrainingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
