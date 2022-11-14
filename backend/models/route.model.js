module.exports = (sequelize, DataTypes) => {
    const Route = sequelize.define("Route", {
        scheduleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'schedules',
                key: 'id'
            }
        },
        stopId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'stops',
                key: 'id'
            }
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Route;
};