module.exports = (sequelize, DataTypes) => {
    const Bincollection = sequelize.define("Bincollection", {
        collectionId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        binId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        lat: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lng: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Bincollection;
};