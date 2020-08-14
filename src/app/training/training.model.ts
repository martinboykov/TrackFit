export enum BodyPart {
    lower = 'lower',
    upper = 'upper',
    full = 'full',
}
export enum TrainingState {
    started = 'started',
    cancelled = 'cancelled',
    completed = 'completed',
}

export interface Training {
    id: string;
    name: string;
    type: BodyPart;
    // sets: number;
    reps: number;
    duration: number;
    progress: number;
    state: TrainingState;
    dateStart?: Date | any;
    dateEnd?: Date | any;
}
