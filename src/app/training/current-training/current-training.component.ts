import {
    Component,
    OnInit,
    Input,
    AfterViewInit,
    ViewChildren,
    ViewChild,
} from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { Training, TrainingState } from '../training.model';
import { TrainingService } from '../training.service';
import { MatSlider } from '@angular/material/slider';

@Component({
    selector: 'app-current-training',
    templateUrl: './current-training.component.html',
    styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent implements OnInit, AfterViewInit {
    @ViewChild('sliderRef') sliderRef: MatSlider;
    mode: ProgressSpinnerMode;
    timer: any;
    @Input() training: Training;
    @Input() index: number;
    inProgress: boolean;
    isFinished: boolean;
    iterations: number[];
    maxRepCount = 1;
    constructor(
        private dialog: MatDialog,
        private trainingS: TrainingService
    ) {}

    ngOnInit(): void {
        this.mode = 'determinate';
        this.inProgress = false;
        this.isFinished = false;
    }
    ngAfterViewInit() {
        this.sliderRef.valueChange.subscribe((value) => {
            this.training.progress = Math.round(
                (value / this.training.reps) * 100
            );
            if (this.training.progress === 100) {
                this.isFinished = true;
            } else {
                this.isFinished = false;
            }
        });
    }

    onStart() {
        this.progressInit();
        this.inProgress = true;
    }
    onPause() {
        clearInterval(this.timer);
        this.inProgress = false;
    }
    onTerminate() {
        const dialogRef = this.dialog.open(StopTrainingComponent, {
            autoFocus: false,
            data: {
                progress: this.training.progress,
            },
        });
        clearInterval(this.timer);
        dialogRef.afterClosed().subscribe((result) => {
            if (result === false) {
                // this.trainingS.updateCurrent(this.training);
                this.inProgress = true;
                this.progressInit();
            } else if (result === true) {
                this.inProgress = false;
                this.sentToPast(TrainingState.cancelled);
            }
        });
    }
    onFinished() {
        this.sentToPast(TrainingState.completed);
        clearInterval(this.timer);
    }
    progressInit() {
        this.timer = setInterval(() => {
            this.training.duration = this.training.duration + 1;
        }, 1000);
    }
    sentToPast(state) {
        this.trainingS.addToPast(this.training, state);
        this.trainingS.changeTabTo(2);
        this.trainingS.deleteFromCurrent(this.training.id);
    }
    formatLabel(value: number) {
        if (value >= 1) {
            return Math.round(value * (100 / this.maxRepCount));
        }
        console.log(this.maxRepCount);

        return value;
    }
}
