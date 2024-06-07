namespace RentalPlace.Model
{
    public class Vehicle
    {
        private static int lastId = 0;

        public Vehicle(string model, string condition, int year, string vehicleType, Owner owner, Person renter)
        {
            Id = ++lastId;
            Model = model;
            Condition = condition;
            Year = year;
            VehicleType = vehicleType;
            Owner = owner;
            Renter = renter;
        }

#pragma warning disable CS8618 // Non-nullable field is uninitialized. Consider declaring as nullable.
        public Vehicle()
        {
        }
#pragma warning restore CS8618

        public int Id { get; set; }  // Property must be settable
        public string Model { get; set; }
        public string Condition { get; set; }
        public int Year { get; set; }
        public string VehicleType { get; set; }
        public History History { get; set; }  // One-to-one relationship
        public Owner Owner { get; set; }  // Many-to-one relationship with Owner
        public Person Renter { get; set; }  // Many-to-one relationship with Person (renter)
    }
}
