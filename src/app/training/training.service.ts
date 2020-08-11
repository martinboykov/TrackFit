import { Injectable, OnInit } from '@angular/core';
import { Training, BodyPart, TrainingState } from './training.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TrainingService {
    tabSub = new BehaviorSubject<number>(1);
    dummyDb: Training[] = [
        {
            id: '1',
            name: 'pushups',
            type: BodyPart.upper,
            reps: 12,
            sets: 5,
            duration: 30,
            progress: 0,
            dateStart: new Date(),
            state: TrainingState.started,
        },
        {
            id: '2',
            name: 'pullups',
            type: BodyPart.upper,
            reps: 12,
            sets: 5,
            duration: 30,
            progress: 0,
            dateStart: new Date(),
            state: TrainingState.started,
        },
        {
            id: '3',
            name: 'squats',
            type: BodyPart.full,
            reps: 12,
            sets: 5,
            duration: 30,
            progress: 0,
            dateStart: new Date(),
            state: TrainingState.started,
        },
    ];
    currentTrainings = [];
    currentTrainingsSub = new BehaviorSubject<Training[]>(
        this.currentTrainings
    );
    pastTrainings = [...this.dummyDb];
    pastTrainingsSub = new BehaviorSubject<Training[]>(this.pastTrainings);
    exercises: Training[] = this.dummyDb;
    exercisesSub = new BehaviorSubject<Training[]>(this.exercises);
    constructor() {}
    getAllCurrent(): Training[] {
        return this.currentTrainings;
    }
    addToCurrent(training: Training) {
        this.currentTrainingsSub.next([
            ...this.currentTrainings,
            { ...training },
        ]);
    }
    deleteFromCurrent(id: string) {
        this.currentTrainingsSub.next([
            ...this.currentTrainings.filter(
                (training, i) => training.id !== id
            ),
        ]);
    }
    getAllPast(): Training[] {
        return [...this.pastTrainings];
    }
    addToPast(training: Training, state: TrainingState) {
        const newPastTraining = {
            ...training,
            date: new Date(),
            state,
        };
        this.pastTrainingsSub.next([...this.pastTrainings, newPastTraining]);
        this.pastTrainings.push(newPastTraining);
        this.deleteFromCurrent(training.id);
    }
    deleteFromPast(id: string) {
        this.pastTrainingsSub.next([
            ...this.pastTrainings.filter((training, i) => training.id !== id),
        ]);
    }
    getAllExcersises(): Training[] {
        return this.exercises;
    }
    changeTabTo(tab) {
        this.tabSub.next(tab);
    }
}
