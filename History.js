class History {
    constructor(history_id = -1, vehicle_id = -1, rental_date = new Date(), return_date = new Date(), details = "") {
        this.history_id = history_id;
        this.vehicle_id = vehicle_id;
        this.rental_date = rental_date;
        this.return_date = return_date;
        this.details = details;
    }
}

module.exports = History;
