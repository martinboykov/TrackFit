import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastTrainingComponent } from './past-training.component';
import { TrainingService } from '../training.service';
import { trainingServiceStub } from '../sharing/testing';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
describe('PastTrainingComponent', () => {
    let component: PastTrainingComponent;
    let fixture: ComponentFixture<PastTrainingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PastTrainingComponent, MatSort, MatPaginator],
            providers: [
                { provide: TrainingService, useValue: trainingServiceStub },
            ],

        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PastTrainingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
