module.exports = function(connection, Sequelize) {
    const product_attribute = connection.define('product_attribute', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                is: /^[a-z -()]+$/i
            }
        }
    })

    product_attribute.associate = function (models) {
        product_attribute.belongsTo(models.product, {
            foreignKey: {
                allowNull: false
            }
        })
        product_attribute.hasMany(models.product_attribute_value, {
            foreignKey: {
                allowNull: false
            }
        })
    }

    return product_attribute;
}