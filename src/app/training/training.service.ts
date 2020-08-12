import { Injectable, OnInit } from '@angular/core';
import { Training, BodyPart, TrainingState } from './training.model';
import { BehaviorSubject, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';

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
            duration: 0,
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
            duration: 0,
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
            duration: 0,
            progress: 0,
            dateStart: new Date(),
            state: TrainingState.started,
        },
    ];
    exercises: Training[];
    exercisesSub = new BehaviorSubject<Training[]>(this.exercises);

    currentTrainings = [];
    currentTrainingsSub = new BehaviorSubject<Training[]>(
        this.currentTrainings
    );
    pastTrainings = [];
    pastTrainingsSub = new BehaviorSubject<Training[]>(this.pastTrainings);

    constructor(private db: AngularFirestore) {}

    changeTabTo(tab) {
        this.tabSub.next(tab);
    }

    getAllExcersises() {
        this.db
            .collection<Training>('exercises')
            .snapshotChanges()
            .pipe(
                map((response) => {
                    return response.map((data) => {
                        return {
                            id: data.payload.doc.id,
                            name: data.payload.doc.data().name,
                            type: data.payload.doc.data().type,
                            sets: data.payload.doc.data().sets,
                            reps: data.payload.doc.data().reps,
                            duration: data.payload.doc.data().duration,
                            progress: data.payload.doc.data().progress,
                        };
                    });
                })
            )
            .subscribe(
                (exercises: Training[]) => {
                    this.exercisesSub.next(exercises);
                    console.log(exercises);

                },
                (error) => {
                    console.log(error);
                }
            );
    }

    getAllCurrent() {
        this.db
            .collection<any>('currentTraining')
            .snapshotChanges()
            .pipe(
                map((response) => {
                    return response.map((data) => {
                        return {
                            id: data.payload.doc.id,
                            name: data.payload.doc.data().name,
                            type: data.payload.doc.data().type,
                            sets: data.payload.doc.data().sets,
                            reps: data.payload.doc.data().reps,
                            duration: data.payload.doc.data().duration,
                            progress: data.payload.doc.data().progress,
                            state: data.payload.doc.data().state,
                            dateStart: data.payload.doc
                                .data()
                                .dateStart.toDate(),
                        };
                    });
                })
            )
            .subscribe(
                (exercises: Training[]) => {
                    this.currentTrainingsSub.next(exercises);

                },
                (error) => {
                    console.log(error);
                }
            );
    }
    updateCurrent(training: Training) {
        this.db
            .collection('currentTraining')
            .doc(training.id)
            .update({ progress: training.progress });
    }
    addToCurrent(training: Training) {
        const newCurrentTraining = {
            ...training,
            dateStart: new Date(),
        };
        this.db.collection('currentTraining').add(newCurrentTraining);
        // this.currentTrainingsSub.next([
        //     ...this.currentTrainings,
        //     newCurrentTraining,
        // ]);
    }
    deleteFromCurrent(id: string) {
        this.db.doc('currentTraining/' + id).delete();
        // this.currentTrainingsSub.next([
        //     ...this.currentTrainings.filter(
        //         (training, i) => training.id !== id
        //     ),
        // ]);
    }
    getAllPast() {
        this.db
            .collection<any>('pastTraining')
            .snapshotChanges()
            .pipe(
                map((response) => {
                    return response.map((data) => {
                        return {
                            id: data.payload.doc.id,
                            name: data.payload.doc.data().name,
                            type: data.payload.doc.data().type,
                            sets: data.payload.doc.data().sets,
                            reps: data.payload.doc.data().reps,
                            duration: data.payload.doc.data().duration,
                            progress: data.payload.doc.data().progress,
                            state: data.payload.doc.data().state,
                            dateStart: data.payload.doc
                                .data()
                                .dateStart.toDate(),
                            dateEnd: data.payload.doc.data().dateStart.toDate(),
                        };
                    });
                })
            )
            .subscribe(
                (exercises: Training[]) => {
                    this.pastTrainingsSub.next(exercises);
                },
                (error) => {
                    console.log(error);
                }
            );
    }
    addToPast(training: Training, state: TrainingState) {
        const newPastTraining = {
            ...training,
            dateEnd: new Date(),
            state,
        };
        this.db.collection('pastTraining').add(newPastTraining);
        // this.pastTrainingsSub.next([...this.pastTrainings, newPastTraining]);
        // this.pastTrainings.push(newPastTraining);
        this.deleteFromCurrent(training.id);
    }
    deleteFromPast(id: string) {
        // this.pastTrainingsSub.next([
        //     ...this.pastTrainings.filter((training, i) => training.id !== id),
        // ]);
    }
}
