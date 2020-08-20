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
    uid?: string;
    name: string;
    type: BodyPart;
    reps: number;
    repsCompleted: number;
    duration: number;
    progress: number;
    state?: TrainingState;
    dateStart?: Date | any;
    lastModified?: Date | any;
    dateEnd?: Date | any;
}
