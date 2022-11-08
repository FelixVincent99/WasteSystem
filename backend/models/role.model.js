module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    return Role;
};