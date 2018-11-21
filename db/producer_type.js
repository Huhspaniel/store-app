module.exports = function(connection, Sequelize) {
    const producer_type = connection.define('producer_type', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        }
    })

    producer_type.associate = function (models) {
        // producer_type.hasMany(models.producer, {
        //     foreignKey: {
        //         allowNull: false,
        //         name: 'type'
        //     }
        // });
    }

    return producer_type;
}