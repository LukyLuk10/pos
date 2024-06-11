-- Create the database
CREATE DATABASE VehicleRental;

-- Use the database
USE VehicleRental;

-- Create the renter table
CREATE TABLE renter (
    renter_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    contact_info VARCHAR(100)
);

-- Create the owner table
CREATE TABLE owner (
    owner_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    contact_info VARCHAR(100)
);

-- Create the vehicles table
CREATE TABLE vehicles (
    vehicle_id INT AUTO_INCREMENT PRIMARY KEY,
    make VARCHAR(50),
    model VARCHAR(50),
    year INT,
    renter_id INT,
    owner_id INT,
    FOREIGN KEY (renter_id) REFERENCES renter(renter_id),
    FOREIGN KEY (owner_id) REFERENCES owner(owner_id)
);

-- Create the history table
CREATE TABLE history (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT,
    rental_date DATE,
    return_date DATE,
    details TEXT,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id)
);
