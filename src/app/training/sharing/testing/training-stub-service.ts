import { getTestExercises, getTestCurrentTraining } from './test-training-db';
import { of } from 'rxjs';

const exercises = getTestExercises();

export const trainingServiceStub = {
    tabSub: of(0),
    changeTabTo: () => {},
    exercisesSub: of(exercises),
    pastTrainingsSub: of(exercises),
    currentTrainingsSub: of(exercises),
    getAllExcersises: () => {},
    getAllPast: () => {},
    getAllCurrent: () => {},
};

const trainings = exercises;
const collectionStub = {
    valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of(trainings)),
};
export const angularFirestoreStub = {
    collection: jasmine.createSpy('collection').and.returnValue(collectionStub),
};
