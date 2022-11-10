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
        areaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'areas',
                key: 'id'
            }
        },
        truckId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'trucks',
                key: 'id'
            }
        },
        driverId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'manpowers',
                key: 'id'
            }
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