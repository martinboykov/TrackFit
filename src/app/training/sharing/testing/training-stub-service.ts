import { getTestExercises } from './test-training-db';

const exercises = getTestExercises();

export const trainingServiceStub = {
    getExercises: () => {
        return exercises;
    },
};
