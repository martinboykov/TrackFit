import { Component, OnInit, Input, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Training, TrainingState, BodyPart } from '../training.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-past-training',
    templateUrl: './past-training.component.html',
    styleUrls: ['./past-training.component.scss'],
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    pastTrainingSub: Subscription;
    displayedColumns = ['dateStart', 'name', 'progress', 'state'];
    pastTrainings = new MatTableDataSource<Training>();
    constructor(private trainingS: TrainingService) {}

    ngOnInit() {
        this.trainingS.getAllPast();
        this.pastTrainingSub = this.trainingS.pastTrainingsSub.subscribe(
            (trainings) => {
                this.pastTrainings.data = trainings;
            }
        );
    }
    ngAfterViewInit() {
        this.pastTrainings.sort = this.sort;
        this.pastTrainings.paginator = this.paginator;
    }
    ngOnDestroy() {
        this.pastTrainingSub.unsubscribe();
    }
    doFilter(value) {
        this.pastTrainings.filter = value.trim().toLowerCase();
    }
    // toDeleteTraining() {
    //     this.trainingS.deleteFromPast(this.training.id);
    // }
}
