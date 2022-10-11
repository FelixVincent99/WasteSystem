module.exports = (sequelize, DataTypes) => {
    const Area = sequelize.define("Area", {
        areaCode: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER
        }
    });
    return Area;
};