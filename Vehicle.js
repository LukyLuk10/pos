class Vehicle {
    constructor(vehicle_id = -1, make = "", model = "", year = new Date().getFullYear(), renter_id = -1, owner_id = -1) {
        this.vehicle_id = vehicle_id;
        this.make = make;
        this.model = model;
        this.year = year;
        this.renter_id = renter_id;
        this.owner_id = owner_id;
    }
}

module.exports = Vehicle;
