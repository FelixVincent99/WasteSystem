module.exports = {
    HOST: "localhost",
    USER: "felix",
    PASSWORD: "August@2022",
    DB: "dbtssmartsystem",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};