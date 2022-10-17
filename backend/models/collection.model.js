module.exports = (sequelize, DataTypes) => {
    const Collection = sequelize.define("Collection", {
        routeID: {
            type: DataTypes.INTEGER,
        },
        weight: {
            type: DataTypes.FLOAT,
        },
        lat: {
            type: DataTypes.STRING,
        },
        lng: {
            type: DataTypes.STRING,
        },
    });
    return Collection;
};