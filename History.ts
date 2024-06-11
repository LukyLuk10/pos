export class History {
    constructor(
        public history_id: number,
        public vehicle_id: number,
        public rental_date: Date,
        public return_date: Date,
        public details: string
    ) {}
}
