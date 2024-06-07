using Bogus;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Microsoft.Extensions.Logging;
using Microsoft.Data.Sqlite;
using System.Configuration;

namespace RentalPlace.Model
{
    public class RentalDb : DbContext
    {
        public RentalDb()
        {
            Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        public RentalDb(DbContextOptions<RentalDb> options) : base(options)
        {
            Database.EnsureDeleted();
            Database.EnsureCreated();
        }
        private RentalDb(List<Person> people, List<Vehicle> vehicles, List<Rental> rentals)
        {
            /*People = people;
            Vehicles = vehicles;
            Rentals = rentals;*/
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlite(ConfigurationManager.ConnectionStrings["RentalCon"].ConnectionString);
            }
        }

        public virtual DbSet<Person> People { get; set; } = null!;
        public virtual DbSet<Vehicle> Vehicles { get; set; } = null!;
        public virtual DbSet<Rental> Rentals { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Person>().ToTable("Person");
            modelBuilder.Entity<Vehicle>().ToTable("Vehicle");
            modelBuilder.Entity<Rental>().ToTable("Rental");
        }

        public static RentalDb FromMockup()
        {
            var faker = new Faker();
            Randomizer.Seed = new Random(16030829);

            var people = new Faker<Person>()
                .CustomInstantiator(f => new Person(
                    name: f.Name.FullName(),
                    age: f.Random.Int(18, 75),
                    phoneNumber: f.Phone.PhoneNumber(),
                    email: f.Internet.Email()
                ))
                .Generate(50);

            var vehicles = new Faker<Vehicle>()
                .CustomInstantiator(f => new Vehicle(
                    model: f.Vehicle.Model(),
                    condition: f.Random.Word(),
                    year: f.Date.Past(10).Year,
                    vehicleType: f.PickRandom<VehicleType>(),
                     history: new History(
                        km: f.Random.Int(0, 200000),
                        timesRented: f.Random.Int(0, 100))

                ))
                .Generate(100);

            var rentals = new Faker<Rental>()
                .CustomInstantiator(f => new Rental(
                    date: f.Date.Recent(),
                    renter: f.PickRandom(people),
                    vehicle: f.PickRandom(vehicles)
                ))
                .Generate(200);

            return new RentalDb(people, vehicles, rentals);
        }
    }
}
