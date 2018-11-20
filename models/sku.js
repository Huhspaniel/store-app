module.exports = function (connection, Sequelize) {
    const sku = connection.define('sku', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.DECIMAL
        },
        stock: {
            type: Sequelize.INTEGER,
            allowNull: false
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
        function setDefaultPrice(sku, opt) {
            if (!sku.price && sku.price != 0) {
                models.product.findOne({ where: { id: sku.product_id } })
                    .then(product => sku.update({ price: product.price }))
                    .catch(err => console.log(err));
            }
        }
        sku.hook('afterCreate', setDefaultPrice);
        sku.hook('afterSave', (sku, opt) => {
            if (sku.changed('stock')) {
                models.sku.findOne({ where: { stock: { [op.gt]: 0 } } })
                    .then(data => {
                        if (!data) {
                            models.product.update({ in_stock: false }, { where: { id: sku.product_id } })
                                .catch(err => console.log(err));
                        }
                    })
                    .catch(err => console.log(err));
            }
            if (sku.changed('price')) setDefaultPrice(sku, opt);
        });
        sku.hook('afterUpdate', (sku, opt) => {
            if (!!sku.dataValues.stock != !!sku._previousDataValues.stock) {
                models.product.update({ in_stock: !!sku.stock }, { where: { id: sku.product_id } })
                    .then(data => console.log(data))
                    .catch(err => console.log(err));
            }
        });
        // sku.hasMany(models.product_variant, {
        //     foreignKey: {
        //         allowNull: false,
        //         unique: 'sku_attribute'
        //     }
        // });
    }

    return sku;
}