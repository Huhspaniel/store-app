module.exports = function (connection, Sequelize) {
    const product_variant = connection.define('product_variant', {

    }, { underscored: true })

    product_variant.associate = function (models) {
        product_variant.belongsTo(models.product, {
            foreignKey: {
                allowNull: false
            }
        });
        product_variant.belongsTo(models.sku, {
            foreignKey: {
                allowNull: false,
                primaryKey: true
            }
        });
        product_variant.belongsTo(models.product_attribute, {
            foreignKey: {
                name: 'attribute_id',
                allowNull: false,
                primaryKey: true
            }
        });
        product_variant.belongsTo(models.product_attribute_value, {
            foreignKey: {
                name: 'value_id',
                allowNull: false
            }
        });
    }

    return product_variant;
}