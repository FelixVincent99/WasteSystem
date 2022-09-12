module.exports = (sequelize, Sequelize) => {
    const Collection = sequelize.define("Collection", {
        routeID: {
            type: Sequelize.INTEGER,
        },
        weight: {
            type: Sequelize.INTEGER,
        },
        lat: {
            type: Sequelize.STRING,
        },
        lng: {
            type: Sequelize.STRING,
        },
    });
    return Collection;
};