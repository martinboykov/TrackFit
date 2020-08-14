import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from './training.service';
import { Training } from './training.model';
import { Subscription } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
    selector: 'app-training',
    templateUrl: './training.component.html',
    styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit, OnDestroy {
    selectedTab: number;
    selectedTabSub: Subscription;
    currentTrainings: Training[];
    currentTrainingsSub: Subscription;
    pastTrainings: Training[];
    pastTrainingsSub: Subscription;
    constructor(private trainingS: TrainingService) {}

    ngOnInit(): void {
        this.selectedTabSub = this.trainingS.tabSub.subscribe((tab) => {
            this.selectedTab = tab;
        });

        this.trainingS.getAllExcersises();
        this.trainingS.getAllCurrent$();
        this.currentTrainingsSub = this.trainingS.currentTrainingsSub.subscribe(
            (trainings) => {
                console.log(trainings);

                this.currentTrainings = trainings;
            }
        );

    }
    ngOnDestroy() {
        this.currentTrainingsSub.unsubscribe();
        this.selectedTabSub.unsubscribe();
    }
    onTabClick(tab: MatTabChangeEvent) {
        this.trainingS.changeTabTo(tab.index);
    }
}
