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
    reps: number;
    sets: number;
    duration: number;
    progress: number;
    dateStart?: Date;
    dateEnd?: Date;
    state: TrainingState;
}
