import { Component, OnInit, Input } from '@angular/core';
import { Training } from '../training.model';
import { TrainingService } from '../training.service';

@Component({
    selector: 'app-past-training',
    templateUrl: './past-training.component.html',
    styleUrls: ['./past-training.component.scss'],
})
export class PastTrainingComponent implements OnInit {
    @Input() training: Training;
    @Input() index: number;
    constructor(private trainingS: TrainingService) {}

    ngOnInit(): void {}
    toDeleteTraining() {
        this.trainingS.deleteFromPast(this.index);
    }
}
