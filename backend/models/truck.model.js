module.exports = (sequelize, DataTypes) => {
    const Truck = sequelize.define("Truck", {
        truckNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        operationStartDate: {
            type: DataTypes.DATE
        },
        operationEndDate: {
            type: DataTypes.DATE
        },
        truckType: {
            type: DataTypes.INTEGER
        },
        averageFuelConsumption: {
            type: DataTypes.FLOAT
        },
        milage: {
            type: DataTypes.FLOAT
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Truck;
};