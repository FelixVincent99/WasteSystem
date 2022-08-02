DROP DATABASE IF EXISTS dbtssmartsystem;
CREATE DATABASE dbtssmartsystem;
USE dbtssmartsystem;

CREATE TABLE tbltruck(
    truckID INT NOT NULL AUTO_INCREMENT,
    truckNo VARCHAR(10) NOT NULL,
    operationStartDate DATETIME NOT NULL,
    operationEndDate DATETIME NULL,
    truckType INT(1) NOT NULL,
    averageFuelConsumption INT(6) NULL,
    milage INT(6) NULL,    
    status INT(1) NOT NULL,
    createdDateTime DATETIME NOT NULL,
    PRIMARY KEY (truckID)
);

CREATE TABLE tblarea(
    areaID INT NOT NULL AUTO_INCREMENT,
    areaCode VARCHAR(16) NOT NULL,
    status INT(1) NOT NULL,
    createdDateTime DATETIME NOT NULL,
    PRIMARY KEY (areaID)
);

CREATE TABLE tbllorong(
    lorongID INT NOT NULL AUTO_INCREMENT,
    lorongName TEXT NOT NULL,
    areaID INT NOT NULL,
    numberOfBins INT(5) NULL,
    averageWeight INT(6) NULL,
    averageFuelConsumption INT(6) NULL,
    status INT(1) NOT NULL,
    createdDateTime DATETIME NOT NULL,
    PRIMARY KEY (lorongID)
);

CREATE TABLE tblmanpower(
    mpID INT NOT NULL AUTO_INCREMENT,
    mpName TEXT NOT NULL,
    mpAge INT(2) NOT NULL,
    role INT(1) NOT NULL,
    gender INT(1) NOT NULL,
    operationStartDate DATETIME NOT NULL,
    operationEndDate DATETIME NULL,
    status INT(1) NOT NULL,
    createdDateTime DATETIME NOT NULL,
    PRIMARY KEY (mpID)
);

CREATE TABLE tblschedule(
    scheduleID INT NOT NULL AUTO_INCREMENT,    
    scheduleDate DATE NOT NULL,
    startDateTime DATETIME NOT NULL,
    endDateTime DATETIME NOT NULL,
    areaID INT NOT NULL,
    truckID INT NOT NULL,
    driverID INT NOT NULL,
    loaderID INT NOT NULL,
    weightFromSensor INT(6) NULL,
    actualWeight INT(6) NULL,
    fuelConsumption INT(6) NULL,
    totalMilage INT(6) NULL,
    status INT(1) NOT NULL,
    createdDateTime DATETIME NOT NULL,
    PRIMARY KEY (scheduleID)
);

CREATE TABLE tblroute(
    routeID INT NOT NULL AUTO_INCREMENT,
    scheduleID INT NOT NULL,
    lorongID INT NOT NULL,    
    status INT(1) NOT NULL,
    createdDateTime DATETIME NOT NULL,
    PRIMARY KEY (routeID)
);

CREATE TABLE tblcollection(
    collectionID INT NOT NULL AUTO_INCREMENT,
    routeID INT,
    weight INT(6),
    lat TEXT,
    lng TEXT,
    collectionTime DATETIME,
    PRIMARY KEY (collectionID)
);

CREATE TABLE tblbincollection(
    binCollectionID INT NOT NULL AUTO_INCREMENT,
    collectionID INT NOT NULL,
    binID INT NOT NULL,
    weight INT(6) NOT NULL,
    lat TEXT NOT NULL,
    lng TEXT NOT NULL,
    PRIMARY KEY (binCollectionID)
);

CREATE TABLE tblbin(
    binID INT NOT NULL AUTO_INCREMENT,
    lorongID INT NOT NULL,
    binType INT(1) NOT NULL,
    binCapacity TEXT NOT NULL,
    PRIMARY KEY (binID)
);