module.exports = (sequelize, DataTypes) => {
    const Route = sequelize.define("Route", {
        scheduleId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stopId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Route;
};