module.exports = (sequelize, Sequelize) => {
    const Area = sequelize.define("Area", {
        areaCode: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        status: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });
    return Area;
};