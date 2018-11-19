module.exports = function(connection, Sequelize) {
    const producer = connection.define('producer', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    })

    producer.associate = function (models) {
        producer.belongsToMany(models.product, {
            through: 'product_producers'
        });
        producer.belongsTo(models.producer_type, {
            foreignKey: {
                allowNull: false
            }
        })
    }

    return producer;
}