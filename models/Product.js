module.exports = function(connection, Sequelize) {
    const Product = connection.define('Product', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        price: {
            type: Sequelize.DECIMAL,
            allowNull: false
        }
    })

    return Product;
}