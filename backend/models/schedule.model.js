module.exports = (sequelize, DataTypes) => {
    const Schedule = sequelize.define("Schedule", {
        scheduleDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        scheduleTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        startDateTime: {
            type: DataTypes.DATE,            
        },
        endDateTime: {
            type: DataTypes.DATE,
        },
        truckId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        areaId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        driverId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        loaderId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        weightFromSensor: {
            type: DataTypes.FLOAT
        },
        actualWeight: {
            type: DataTypes.FLOAT
        },
        fuelConsumption: {
            type: DataTypes.FLOAT
        },
        totalMilage: {
            type: DataTypes.FLOAT
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Schedule;
};