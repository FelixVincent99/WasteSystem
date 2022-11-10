module.exports = (sequelize, DataTypes) => {
    const Stop = sequelize.define("Stop", {
        stopName: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        areaId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        binAmount: {
            type: DataTypes.INTEGER
        },
        averageWeight: {
            type: DataTypes.FLOAT
        },
        averageFuelConsumption: {
            type: DataTypes.FLOAT
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Stop;
};