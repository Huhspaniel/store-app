module.exports = function(connection, Sequelize) {
    const product_attribute_value = connection.define('product_attribute_value', {
        value: {
            type: Sequelize.STRING
        }
    })

    product_attribute_value.associate = function (models) {
        product_attribute_value.belongsTo(models.product_attribute, {
            foreignKey: {
                name: 'attribute_id',
                allowNull: false
            }
        });
        // product_attribute_value.hasMany(models.product_variant, {
        //     foreignKey: {
        //         name: 'value_id',
        //         allowNull: false
        //     }
        // })
    }

    return product_attribute_value;
}