import { Injectable, OnInit } from '@angular/core';
import { Training, BodyPart, TrainingState } from './training.model';
import { BehaviorSubject, pipe } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
    providedIn: 'root',
})
export class TrainingService {
    tabSub = new BehaviorSubject<number>(1);

    exercises: Training[] = [];
    exercisesSub = new BehaviorSubject<Training[]>(this.exercises);

    currentTrainings: Training[] = [];
    currentTrainingsSub = new BehaviorSubject<Training[]>(
        this.currentTrainings
    );
    pastTrainings: Training[] = [];
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
                take(1),
                map((response) => {
                    return response.map((data) => {
                        return {
                            id: data.payload.doc.id,
                            name: data.payload.doc.data().name,
                            type: data.payload.doc.data().type,
                            reps: data.payload.doc.data().reps,
                            repsCompleted: data.payload.doc.data().repsCompleted,
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
    getCurrent(id: string) {
        return this.db
            .collection<Training>('currentTraining')
            .doc<Training>(id)
            .snapshotChanges()
            .pipe(
                take(1),
                map((data) => {
                    const training: Training = {
                        id: data.payload.id,
                        name: data.payload.data().name,
                        type: data.payload.data().type,
                        reps: data.payload.data().reps,
                        repsCompleted: data.payload.data().repsCompleted,
                        duration: data.payload.data().duration,
                        progress: data.payload.data().progress,
                        state: data.payload.data().state,
                        dateStart: data.payload.data().dateStart.toDate(),
                    };
                    if (data.payload.data().lastModified) {
                        training.lastModified = data.payload
                            .data()
                            .lastModified.toDate();
                    }
                    return training;
                })
            );
    }
    getAllCurrent() {
        this.db
            .collection<Training>('currentTraining')
            .snapshotChanges()
            .pipe(
                take(1),
                map((response) => {
                    return response.map((data) => {
                        const training: Training = {
                            id: data.payload.doc.id,
                            name: data.payload.doc.data().name,
                            type: data.payload.doc.data().type,
                            reps: data.payload.doc.data().reps,
                            repsCompleted: data.payload.doc.data().repsCompleted,
                            duration: data.payload.doc.data().duration,
                            progress: data.payload.doc.data().progress,
                            state: data.payload.doc.data().state,
                            dateStart: data.payload.doc
                                .data()
                                .dateStart.toDate(),
                        };
                        if (data.payload.doc.data().lastModified) {
                            training.lastModified = data.payload.doc
                                .data()
                                .lastModified.toDate();
                        }
                        return training;
                    });
                })
            )
            .subscribe(
                (trainings: Training[]) => {
                    this.currentTrainingsSub.next(trainings);
                },
                (error) => {
                    console.log(error);
                }
            );
    }
    updateCurrent(training: Training) {
        training.lastModified = new Date();
        this.db.collection('currentTraining').doc(training.id).update({
            progress: training.progress,
            duration: training.duration,
            repsCompleted: training.repsCompleted,
            lastModified: training.lastModified,
        });
    }
    addToCurrent(training: Training) {
        const newCurrentTraining = {
            ...training,
            dateStart: new Date(),
        };
        this.db
            .collection('currentTraining')
            .add(newCurrentTraining)
            .then(() => {
                this.getAllCurrent();
            });
    }
    deleteFromCurrent(id: string) {
        this.db
            .doc('currentTraining/' + id)
            .delete()
            .then(() => {
                this.getAllCurrent();
            });
    }
    getAllPast() {
        this.db
            .collection<Training>('pastTraining')
            .snapshotChanges()
            .pipe(
                take(1),
                map((response) => {
                    return response.map((data) => {
                        const training: Training = {
                            id: data.payload.doc.id,
                            name: data.payload.doc.data().name,
                            type: data.payload.doc.data().type,
                            reps: data.payload.doc.data().reps,
                            repsCompleted: data.payload.doc.data().reps,
                            duration: data.payload.doc.data().duration,
                            progress: data.payload.doc.data().progress,
                            state: data.payload.doc.data().state,
                            dateStart: data.payload.doc
                                .data()
                                .dateStart.toDate(),
                        };
                        if (data.payload.doc.data().lastModified) {
                            training.lastModified = data.payload.doc
                                .data()
                                .lastModified.toDate();
                        }
                        return training;
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
        this.db.collection('pastTraining').add(newPastTraining).then(() => {
            this.deleteFromCurrent(training.id);
            this.getAllPast();
        });
    }
    deleteFromPast(id: string) {
        this.db
            .doc('pastTraining/' + id)
            .delete()
            .then(() => {
                this.getAllPast();
            });
    }
}
