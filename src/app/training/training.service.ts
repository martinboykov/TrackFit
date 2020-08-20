import { Injectable, OnInit } from '@angular/core';
import { Training, BodyPart, TrainingState } from './training.model';
import { BehaviorSubject, pipe } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root',
})
export class TrainingService {
    tabSub = new BehaviorSubject<number>(0);

    exercises: Training[] = [];
    exercisesSub = new BehaviorSubject<Training[]>(this.exercises);

    currentTrainings: Training[] = [];
    currentTrainingsSub = new BehaviorSubject<Training[]>(
        this.currentTrainings
    );
    pastTrainings: Training[] = [];
    pastTrainingsSub = new BehaviorSubject<Training[]>(this.pastTrainings);

    constructor(
        private db: AngularFirestore,
        private fireAuthS: AngularFireAuth,
        private authS: AuthService
    ) {}

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
                        return this.extractData(data);
                    });
                })
            )
            .subscribe(
                (exercises: Training[]) => {
                    this.exercisesSub.next(exercises);
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
                    return this.extractData(data);
                })
            );
    }
    getAllCurrent() {
        const user = this.authS.authChange.getValue();
        this.db
            .collection<Training>('currentTraining', (ref) =>
                ref.where('uid', '==', user.uid)
            )
            .snapshotChanges()
            .pipe(
                take(1),
                map((response) => {
                    return response.map((data) => {
                        return this.extractData(data);
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
        const user = this.authS.authChange.getValue();
        console.log(user);

        const newCurrentTraining = {
            ...training,
            uid: user.uid,
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
            .collection('currentTraining')
            .doc(id)
            .delete()
            .then(() => {
                this.getAllCurrent();
            });
    }
    getAllPast() {
        const user = this.authS.authChange.getValue();
        this.db
            .collection<Training>('pastTraining', (ref) =>
                ref.where('uid', '==', user.uid)
            )
            .snapshotChanges()
            .pipe(
                take(1),
                map((response) => {
                    return response.map((data) => {
                        return this.extractData(data);
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
        const user = this.authS.authChange.getValue();
        console.log(user);

        const newPastTraining = {
            ...training,
            uid: user.uid,
            dateEnd: new Date(),
            state,
        };
        this.db
            .collection('pastTraining')
            .add(newPastTraining)
            .then(() => {
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
    extractData(data) {
        const training: Training = {
            id: data.payload.doc.id,
            name: data.payload.doc.data().name,
            type: data.payload.doc.data().type,
            reps: data.payload.doc.data().reps,
            repsCompleted: data.payload.doc.data().repsCompleted,
            duration: data.payload.doc.data().duration,
            progress: data.payload.doc.data().progress,
        };
        if (data.payload.doc.data().state) {
            training.state = data.payload.doc.data().state;
        }
        if (data.payload.doc.data().dateStart) {
            training.dateStart = data.payload.doc.data().dateStart.toDate();
        }
        if (data.payload.doc.data().lastModified) {
            training.lastModified = data.payload.doc
                .data()
                .lastModified.toDate();
        }
        return training;
    }
}
