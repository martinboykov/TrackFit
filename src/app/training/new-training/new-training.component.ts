import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Training } from '../training.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
    exercisesSub: Subscription;
    exercises: Training[];
    constructor(private trainingS: TrainingService) {}

    ngOnInit(): void {
        this.exercisesSub = this.trainingS.exercisesSub.subscribe(
            (exercises) => {
                this.exercises = exercises;
            }
        );
    }
    ngOnDestroy() {
        this.exercisesSub.unsubscribe();
    }
    onSubmit(f: NgForm) {
        this.trainingS.addToCurrent(f.value.exercise);
        this.trainingS.changeTabTo(2);
    }
}
