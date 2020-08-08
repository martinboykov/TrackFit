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
        this.currentTrainingsSub = this.trainingS.currentTrainingsSub.subscribe(
            (trainings) => {
                this.currentTrainings = trainings;
            }
        );
        this.pastTrainingsSub = this.trainingS.pastTrainingsSub.subscribe(
            (trainings) => {
                this.pastTrainings = trainings;
            }
        );
        this.selectedTabSub = this.trainingS.tabSub.subscribe((tab) => {
            this.selectedTab = tab;
        });
    }
    ngOnDestroy() {
        this.currentTrainingsSub.unsubscribe();
        this.pastTrainingsSub.unsubscribe();
        this.selectedTabSub.unsubscribe();
    }
    onTabClick(tab: MatTabChangeEvent) {
        this.trainingS.changeTabTo(tab.index);
    }
}
