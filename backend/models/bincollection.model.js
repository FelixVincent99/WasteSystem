module.exports = (sequelize, DataTypes) => {
    const Bincollection = sequelize.define("Bincollection", {
        collectionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'collections',
                key: 'id'
            }
        },
        binId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'bins',
                key: 'id'
            }
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