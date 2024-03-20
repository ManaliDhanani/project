export class Task {
    constructor(
        public stakeHolder?: Array<number>,
        public name?: string,
        public description?: string,
        // public assignedTo: string,
        public createDate?: string,
        public tag?: Array<number>,
        public id?: string,
        public createdAt?: Date,
        public updatedAt?: Date,
        public tags?: any
    ){}
}