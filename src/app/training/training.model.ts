export enum BodyPart {
    lower,
    upper,
    full,
}

export interface TrainingI {
    title: string;
    type: BodyPart;
    reps: number;
    sets: number;
    pause: number;
    duration: number;
    progress: number;
}

export class Training implements TrainingI {
    constructor(
        public title: string,
        public type: BodyPart,
        public reps: number,
        public sets: number,
        public pause: number,
        public duration: number,
        public progress: number
    ) {
        this.title    = title;
        this.type     = type;
        this.reps     = reps;
        this.sets     = sets;
        this.pause    = pause;
        this.duration = duration;
        this.progress = progress;
    }
}
