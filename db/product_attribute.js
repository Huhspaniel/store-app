module.exports = function(connection, Sequelize) {
    const product_attribute = connection.define('product_attribute', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                is: /^[a-z -()]+$/i
            },
            unique: 'product_attribute'
        }
    })

    product_attribute.associate = function (models) {
        product_attribute.belongsTo(models.product, {
            foreignKey: {
                allowNull: false,
                unique: 'product_attribute'
            }
        })
        // product_attribute.hasMany(models.product_attribute_value, {
        //     foreignKey: {
        //         name: 'attribute_id',
        //         allowNull: false
        //     }
        // })
        // product_attribute.hasMany(models.product_variant, {
        //     foreignKey: {
        //         name: 'attribute_id',
        //         allowNull: false,
        //         unique: 'sku_attribute'
        //     }
        // })
    }

    return product_attribute;
}