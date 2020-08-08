import { Component, OnInit, Input } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { Training, TrainingI } from '../training.model';
import { TrainingService } from '../training.service';

@Component({
    selector: 'app-current-training',
    templateUrl: './current-training.component.html',
    styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent implements OnInit {
    mode: ProgressSpinnerMode;
    timer: any;
    @Input() training: Training;
    @Input() index: number;
    inProgress: boolean;
    constructor(
        private dialog: MatDialog,
        private trainingS: TrainingService
    ) {}

    ngOnInit(): void {
        this.mode = 'determinate';
        this.inProgress = false;
    }

    onStart() {
        this.progressInit();
        this.inProgress = true;
    }
    onStop() {
        clearInterval(this.timer);
        this.inProgress = false;
        const dialogRef = this.dialog.open(StopTrainingComponent, {
            autoFocus: false,
            data: {
                progress: this.training.progress,
            },
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (!result) {
                this.progressInit();
                this.inProgress = true;
            } else {
                this.inProgress = false;
            }
        });
    }
    progressInit() {
        this.timer = setInterval(() => {
            if (this.training.progress >= 100) {
                clearInterval(this.timer);
                this.trainingS.addToPast(this.training);
                this.trainingS.changeTabTo(1);
                this.trainingS.deleteFromCurrent(this.index);
            } else {
                this.training.progress = this.training.progress + 1;
            }
        }, 50);
    }
}
