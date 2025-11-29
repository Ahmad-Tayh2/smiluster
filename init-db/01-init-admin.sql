-- Initialize Smiluster Database
-- This script creates the default admin user and license

USE smiluster;

-- Create default license (expires in 1 year from now)
INSERT INTO Licenses (expirationDate, licenseKey) VALUES
(DATE_ADD(NOW(), INTERVAL 1 YEAR), "SMILUSTER-DEFAULT-LICENSE-2025");

-- Get the license ID (will be 1 if this is the first insert)
SET @license_id = LAST_INSERT_ID();

-- Create default admin user
-- Email: admin@smiluster.com
-- Password: smiluster
INSERT INTO Users (email, password, firstName, lastName, phone, role, licenseID) VALUES
("admin@smiluster.com", "$2b$10$d0mLPy4UiFSDpxsgjTwgeOuC7lomIpLA8EhJ2DEhU4Aq014hC7Tce", "Admin", "User", 1234567890, "Doctor", @license_id);

-- Create default settings for the license
INSERT INTO Settings (licenseID, clinicName, address, phone, email, workingHours) VALUES
(@license_id, "Smiluster Dental Clinic", "123 Main Street", "1234567890", "admin@smiluster.com", "{\"monday\": \"9:00-18:00\", \"tuesday\": \"9:00-18:00\", \"wednesday\": \"9:00-18:00\", \"thursday\": \"9:00-18:00\", \"friday\": \"9:00-18:00\"}");
