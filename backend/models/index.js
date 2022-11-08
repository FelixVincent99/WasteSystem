const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//for auth
db.users = require("./user.model.js")(sequelize, Sequelize);
db.roles = require("./role.model.js")(sequelize, Sequelize);
db.roles.belongsToMany(db.users, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.users.belongsToMany(db.roles, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});
db.ROLES = ["admin", "manager", "supervisor"];

db.trucks = require("./truck.model.js")(sequelize, Sequelize);
db.areas = require("./area.model.js")(sequelize, Sequelize);
db.stops = require("./stop.model.js")(sequelize, Sequelize);
db.manpowers = require("./manpower.model.js")(sequelize, Sequelize);
db.schedules = require("./schedule.model.js")(sequelize, Sequelize);
db.routes = require("./route.model.js")(sequelize, Sequelize);
db.collections = require("./collection.model.js")(sequelize, Sequelize);
db.bins = require("./bin.model.js")(sequelize, Sequelize);
db.bincollections = require("./bincollection.model.js")(sequelize, Sequelize);

module.exports = db;