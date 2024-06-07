using System.Collections.Generic;

namespace RentalPlace.Model
{
    public class Person
    {
        private static int lastId = 0;

        public Person(string name, int age, string phoneNumber, string email)
        {
            Id = ++lastId;
            Name = name;
            Age = age;
            PhoneNumber = phoneNumber;
            Email = email;
            RentedVehicles = new HashSet<Vehicle>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }

        public virtual ICollection<Vehicle> RentedVehicles { get; set; }  // One-to-many relationship
    }
}
