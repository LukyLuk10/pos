namespace RentalPlace.Model
{
    public class History
    {
        private static int lastId = 0;

        public History(int km, int timesRented)
        {
            Id = ++lastId;
            Km = km;
            TimesRented = timesRented;
        }

        // Parameterless constructor
#pragma warning disable CS8618 // Non-nullable field is uninitialized. Consider declaring as nullable.
        public History()
        {
        }
#pragma warning restore CS8618

        public int Id { get; set; }  // Property must be settable
        public int Km { get; set; }
        public int TimesRented { get; set; }
        public int VehicleId { get; set; } // Foreign key for Vehicle
        public Vehicle Vehicle { get; set; }  // One-to-one relationship
    }
}
