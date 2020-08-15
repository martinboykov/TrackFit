import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopTrainingComponent } from './stop-training.component';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('StopTrainingComponent', () => {
    let component: StopTrainingComponent;
    let fixture: ComponentFixture<StopTrainingComponent>;
    const model: StopTrainingComponent = {
        passedData: {},
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StopTrainingComponent],
            imports: [MatDialogModule],
            providers: [
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: model,
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StopTrainingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
