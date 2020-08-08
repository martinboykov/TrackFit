import { Injectable, OnInit } from '@angular/core';
import { Training, BodyPart } from './training.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TrainingService {
    tabSub = new BehaviorSubject<number>(0);
    dummyDb = [
        {
            title: 'pushups',
            type: BodyPart.upper,
            reps: 12,
            sets: 5,
            pause: 60,
            duration: 30,
            progress: 0,
        },
        {
            title: 'pullups',
            type: BodyPart.upper,
            reps: 12,
            sets: 5,
            pause: 60,
            duration: 30,
            progress: 0,
        },
        {
            title: 'squats',
            type: BodyPart.full,
            reps: 12,
            sets: 5,
            pause: 60,
            duration: 30,
            progress: 0,
        },
    ];
    currentTrainings = [];
    currentTrainingsSub = new BehaviorSubject<Training[]>(
        this.currentTrainings
    );
    pastTrainings = [];
    pastTrainingsSub = new BehaviorSubject<Training[]>(this.pastTrainings);
    exercises: Training[] = [...this.dummyDb];
    exercisesSub = new BehaviorSubject<Training[]>(this.exercises);
    constructor() {}
    getAllCurrent(): Training[] {
        return this.currentTrainings;
    }
    addToCurrent(training: Training) {
        this.currentTrainingsSub.next([...this.currentTrainings, training]);
    }
    deleteFromCurrent(index: number) {
        this.currentTrainingsSub.next([
            ...this.currentTrainings.filter((training, i) => i !== index),
        ]);
    }
    getAllPast(): Training[] {
        return this.pastTrainings;
    }
    addToPast(training: Training) {
        this.pastTrainingsSub.next([...this.pastTrainings, training]);
    }
    deleteFromPast(index: number) {
        this.pastTrainingsSub.next([
            ...this.pastTrainings.filter((training, i) => i !== index),
        ]);
    }
    getAllExcersises(): Training[] {
        return this.exercises;
    }
    changeTabTo(tab) {
        this.tabSub.next(tab);
        console.log(tab);
    }
}
