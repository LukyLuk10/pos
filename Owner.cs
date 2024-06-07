using System.Collections.Generic;

namespace RentalPlace.Model
{
    public class Owner
    {
        private static int lastId = 0;

        public Owner(string name, string contact)
        {
            Id = ++lastId;
            Name = name;
            Contact = contact;
            Vehicles = new HashSet<Vehicle>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Contact { get; set; }

        public virtual ICollection<Vehicle> Vehicles { get; set; }  // One-to-many relationship
    }
}
