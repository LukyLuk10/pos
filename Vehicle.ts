export class Vehicle {
    constructor(
        public vehicle_id: number,
        public make: string,
        public model: string,
        public year: number,
        public renter_id: number,
        public owner_id: number
    ) {}
}
