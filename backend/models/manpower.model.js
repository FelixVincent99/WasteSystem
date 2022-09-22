module.exports = (sequelize, Sequelize) => {
    const Manpower = sequelize.define("Manpower", {
        mpName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        mpAge: {
            type: Sequelize.INTEGER
        },
        role: {
            type: Sequelize.INTEGER
        },
        gender: {
            type: Sequelize.INTEGER
        },
        operationStartDate: {
            type: Sequelize.DATE
        },
        operationEndDate: {
            type: Sequelize.DATE
        },
        status: {
            type: Sequelize.INTEGER
        }
    });
    return Manpower;
};