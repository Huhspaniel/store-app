module.exports = function (connection, Sequelize) {
    const sku = connection.define('sku', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        stock: {
            type: Sequelize.INTEGER
        }
    })

    sku.associate = function (models) {
        sku.belongsTo(models.product, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return sku;
}