module.exports = (sequelize, DataTypes) => {
    const Bin = sequelize.define("Bin", {
        stopId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        binType: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        binCapacity: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Bin;
};