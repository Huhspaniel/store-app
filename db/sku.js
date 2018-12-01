module.exports = function (connection, Sequelize) {
    const sku = connection.define('sku', {
        name: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.DECIMAL(10, 2),
            validate: {
                min: 0
            }
        },
        stock: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        img_url: {
            type: Sequelize.STRING
        }
    }, {})

    sku.associate = function (models) {
        sku.belongsTo(models.product, {
            onDelete: 'cascade',
            foreignKey: {
                allowNull: false
            }
        });

        const op = models.Sequelize.Op;
        sku.hook('afterSave', (sku, opt) => {
            if (sku.changed('stock')) {
                models.sku.findOne({ where: { stock: { [op.gt]: 0 } } })
                    .then(data => {
                        models.product.update({ in_stock: !!data }, { where: { id: sku.product_id } })
                            .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
            }
            // if (sku.changed('stock') && !!sku.dataValues.stock != !!sku._previousDataValues.stock) {
            //     models.product.update({ in_stock: !!sku.stock }, { where: { id: sku.product_id } })
            //         .then(data => console.log(data))
            //         .catch(err => console.log(err));
            // }
        });
        // sku.hook('afterUpdate', (sku, opt) => {
        //     if (sku.changed('stock') && !!sku.dataValues.stock != !!sku._previousDataValues.stock) {
        //         models.product.update({ in_stock: !!sku.stock }, { where: { id: sku.product_id } })
        //             .then(data => console.log(data))
        //             .catch(err => console.log(err));
        //     }
        // });
        sku.hasMany(models.product_variant, {
            foreignKey: {
                allowNull: false,
                unique: 'sku_attribute'
            }
        });
    }

    return sku;
}