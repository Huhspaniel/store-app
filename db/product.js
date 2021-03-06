module.exports = function (connection, Sequelize) {
    const product = connection.define('product', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'department_product'
        },
        price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0
            }
        },
        description: {
            type: Sequelize.STRING
        },
        in_stock: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        img_url: {
            type: Sequelize.STRING,
            validate: {
                isUrl: true
            }
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
                allowNull: false,
                unique: 'product_attribute'
            }
        });
        product.hasMany(models.sku, {
            onDelete: 'cascade',
            foreignKey: {
                allowNull: false
            }
        });
    }

    return product;
}