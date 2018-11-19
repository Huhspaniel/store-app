module.exports = function(connection, Sequelize) {
    const producer_type = connection.define('producer_type', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    })

    producer_type.associate = function (models) {
        producer_type.hasMany(models.producer, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return producer_type;
}