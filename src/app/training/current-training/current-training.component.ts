import {
    Component,
    OnInit,
    Input,
    AfterViewInit,
    ViewChild,
    OnDestroy,
} from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { Training, TrainingState } from '../training.model';
import { TrainingService } from '../training.service';
import { MatSlider } from '@angular/material/slider';
import { timer, Subscription, interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-current-training',
    templateUrl: './current-training.component.html',
    styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent
    implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('sliderRef') sliderRef: MatSlider;
    mode: ProgressSpinnerMode;
    timer: Subscription;
    timerUpdate: Subscription;
    @Input() training: Training;
    @Input() index: number;
    inProgress: boolean;
    isFinished: boolean;
    iterations: number[];
    constructor(
        private dialog: MatDialog,
        private trainingS: TrainingService
    ) {}

    ngOnInit(): void {
        this.mode = 'determinate';
        this.inProgress = false;
        this.isFinished = this.training.progress >= 100 ? true : false;
    }
    ngAfterViewInit() {
        timer(1)
            .pipe(take(1))
            .subscribe(() => {
                this.sliderRef.value = this.training.repsCompleted;
                console.log(this.sliderRef.value, this.training.repsCompleted);
            });

        this.sliderRef.valueChange.subscribe((value) => {
            this.training.repsCompleted = value;
            this.training.progress = Math.round(
                (this.training.repsCompleted / this.training.reps) * 100
            );
            this.trainingS.updateCurrent(this.training);
            if (this.training.progress === 100) {
                this.isFinished = true;
            } else {
                this.isFinished = false;
            }
        });
    }

    ngOnDestroy() {
        this.progressStop();
    }
    onStart() {
        this.progressInit();
        this.inProgress = true;
    }
    onPause() {
        this.progressStop();
        this.inProgress = false;
        this.trainingS.updateCurrent(this.training);
    }
    onTerminate() {
        const dialogRef = this.dialog.open(StopTrainingComponent, {
            autoFocus: false,
            data: {
                progress: this.training.progress,
            },
        });
        this.progressStop();
        dialogRef.afterClosed().subscribe((result) => {
            if (result === false) {
                this.trainingS.updateCurrent(this.training);
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
        this.progressStop();
    }
    progressInit() {
        this.timer = interval(1000).subscribe(() => {
            this.training.duration = this.training.duration + 1;
        });
        this.timerUpdate = interval(1000 * 10).subscribe(() => {
            this.trainingS.updateCurrent(this.training);
        });
    }
    progressStop() {
        if (this.timer) this.timer.unsubscribe();
        if (this.timerUpdate) this.timerUpdate.unsubscribe();
    }
    sentToPast(state) {
        this.trainingS.addToPast(this.training, state);
    }
}
