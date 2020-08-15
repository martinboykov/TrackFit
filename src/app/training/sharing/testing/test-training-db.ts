import { Training, BodyPart, TrainingState } from '../../training.model';

export function getTestExercises(): Training[] {
    return [
        {
            id: '0',
            name: 'mock',
            type: BodyPart.upper,
            reps: 10,
            repsCompleted: 0,
            duration: 0,
            progress: 0,
            state: TrainingState.started,
            dateStart: new Date(),
        },
    ];
}
export function getTestCurrentTraining(): Training {
    return {
        id: '0',
        name: 'mock',
        type: BodyPart.upper,
        reps: 10,
        repsCompleted: 0,
        duration: 0,
        progress: 0,
        state: TrainingState.started,
        dateStart: new Date(),
    };
}
