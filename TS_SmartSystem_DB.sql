DROP DATABASE IF EXISTS dbtssmartsystem;
CREATE DATABASE dbtssmartsystem;
USE dbtssmartsystem;

CREATE TABLE trucks(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    truckNo VARCHAR(10) NOT NULL,
    operationStartDate DATETIME NOT NULL,
    operationEndDate DATETIME NULL,
    truckType INT(1) NOT NULL,
    averageFuelConsumption INT(6) NULL,
    milage INT(6) NULL,    
    status INT(1) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

CREATE TABLE areas(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    areaCode VARCHAR(16) NOT NULL,
    status INT(1) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

CREATE TABLE stops(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    stopName VARCHAR(255) NOT NULL,
    areaId INT NOT NULL,
    binAmount INT NULL,
    averageWeight FLOAT NULL,
    averageFuelConsumption FLOAT NULL,
    status INT(1) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

CREATE TABLE manpowers(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    mpName TEXT NOT NULL,
    mpAge INT(2) NOT NULL,
    role INT(1) NOT NULL,
    gender INT(1) NOT NULL,
    operationStartDate DATETIME NOT NULL,
    operationEndDate DATETIME NULL,
    status INT(1) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

CREATE TABLE schedules(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,    
    scheduleDate DATE NOT NULL,
    startDateTime DATETIME NOT NULL,
    endDateTime DATETIME NOT NULL,
    areaId INT NOT NULL,
    truckId INT NOT NULL,
    driverId INT NOT NULL,
    loaderId INT NOT NULL,
    weightFromSensor FLOAT NULL,
    actualWeight FLOAT NULL,
    fuelConsumption FLOAT NULL,
    totalMilage FLOAT NULL,
    status INT(1) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

CREATE TABLE tblroute(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    scheduleId INT NOT NULL,
    stopId INT NOT NULL,    
    status INT(1) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

CREATE TABLE collections( --single
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    routeID INT,
    weight INT(6),
    lat TEXT,
    lng TEXT,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

CREATE TABLE bins( --single
    binID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    stopId INT NOT NULL,
    binType INT(1) NOT NULL,
    binCapacity FLOAT NOT NULL,
    status INT(1) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

CREATE TABLE bincollections( --single
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    collectionId INT NOT NULL,
    binId INT NOT NULL,
    weight FLOAT NOT NULL,
    lat TEXT NOT NULL,
    lng TEXT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

CREATE TABLE roles(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

CREATE TABLE users(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role INT NOT NULL,
    status INT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);