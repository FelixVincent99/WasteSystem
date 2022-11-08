module.exports = (sequelize, DataTypes) => {
    const Manpower = sequelize.define("Manpower", {
        mpName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mpAge: {
            type: DataTypes.INTEGER
        },
        role: {
            type: DataTypes.INTEGER
        },
        gender: {
            type: DataTypes.INTEGER
        },
        operationStartDate: {
            type: DataTypes.DATE
        },
        operationEndDate: {
            type: DataTypes.DATE
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Manpower;
};