import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentTrainingComponent } from './current-training.component';
import { TrainingService } from '../training.service';
import {
    trainingServiceStub,
    getTestCurrentTraining,
} from '../sharing/testing';

import { MatSlider } from '@angular/material/slider';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

class MаtDialogMock {
    // When the component calls this.dialog.open(...) we'll return an object
    // with an afterClosed method that allows to subscribe to the dialog result observable.
    open() {
        return {
            afterClosed: () => of([0]),
        };
    }
}
const currentTraining = getTestCurrentTraining();
describe('CurrentTrainingComponent', () => {
    let component: CurrentTrainingComponent;
    let fixture: ComponentFixture<CurrentTrainingComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CurrentTrainingComponent, MatSlider],
            providers: [
                { provide: TrainingService, useValue: trainingServiceStub },
                { provide: MatDialog, useValue: MаtDialogMock },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CurrentTrainingComponent);
        component = fixture.componentInstance;
        component.training = currentTraining;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
