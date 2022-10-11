module.exports = (sequelize, Sequelize) => {
    const Truck = sequelize.define("Truck", {
        truckNo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        operationStartDate: {
            type: Sequelize.DATE
        },
        operationEndDate: {
            type: Sequelize.DATE
        },
        truckType: {
            type: Sequelize.INTEGER
        },
        averageFuelConsumption: {
            type: Sequelize.FLOAT
        },
        milage: {
            type: Sequelize.FLOAT
        },
        status: {
            type: Sequelize.INTEGER
        }
    });
    return Truck;
};