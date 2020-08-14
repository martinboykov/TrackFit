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
                map((response) => {
                    return response.map((data) => {
                        return {
                            id: data.payload.doc.id,
                            name: data.payload.doc.data().name,
                            type: data.payload.doc.data().type,
                            // sets: data.payload.doc.data().sets,
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
    getCurrent(id: string) {
        return this.db
            .collection<Training>('currentTraining')
            .doc<Training>(id)
            .snapshotChanges()
            .pipe(
                map((data) => {
                    // return response.map((data) => {
                    return {
                        id: data.payload.id,
                        name: data.payload.data().name,
                        type: data.payload.data().type,
                        // sets: data.payload.doc.data().sets,
                        reps: data.payload.data().reps,
                        duration: data.payload.data().duration,
                        progress: data.payload.data().progress,
                        state: data.payload.data().state,
                        dateStart: data.payload.data().dateStart.toDate(),
                    };
                    // });
                })
            );
    }
    getAllCurrent$() {
        this.db
            .collection<Training>('currentTraining')
            .snapshotChanges()
            .pipe(
                map((response) => {
                    return response.map((data) => {
                        return {
                            id: data.payload.doc.id,
                            name: data.payload.doc.data().name,
                            type: data.payload.doc.data().type,
                            // sets: data.payload.doc.data().sets,
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
                (trainings: Training[]) => {
                    this.currentTrainingsSub.next(trainings);
                    this.currentTrainings = trainings;
                },
                (error) => {
                    console.log(error);
                }
            );
    }
    updateCurrent(training: Training) {
        this.db.collection('currentTraining').doc(training.id).update({
            progress: training.progress,
            duration: training.duration,
            reps: training.reps,
        });
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
            .collection<Training>('pastTraining')
            .snapshotChanges()
            .pipe(
                map((response) => {
                    return response.map((data) => {
                        return {
                            id: data.payload.doc.id,
                            name: data.payload.doc.data().name,
                            type: data.payload.doc.data().type,
                            // sets: data.payload.doc.data().sets,
                            reps: data.payload.doc.data().reps,
                            duration: data.payload.doc.data().duration,
                            progress: data.payload.doc.data().progress,
                            state: data.payload.doc.data().state,
                            dateStart: data.payload.doc
                                .data()
                                .dateStart.toDate(),
                            dateEnd: data.payload.doc.data().dateEnd.toDate(),
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
