module.exports = function (connection, Sequelize) {
    const product = connection.define('product', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'department_product'
        },
        price: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING
        },
        in_stock: {
            type: Sequelize.BOOLEAN
        },
        img: {
            type: Sequelize.STRING.BINARY
        },
    })

    product.associate = function (models) {
        product.belongsToMany(models.producer, {
            through: 'product_producers'
        });
        product.belongsTo(models.department, {
            foreignKey: {
                allowNull: false,
                unique: 'department_product'
            }
        });

        product.hasMany(models.product_attribute, {
            foreignKey: {
                allowNull: false
            }
        });
        product.hasMany(models.sku, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return product;
}