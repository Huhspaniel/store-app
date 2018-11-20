const db = require('./models');

module.exports = async function () {
    await db.department.bulkCreate([{
        name: 'Cellphones'
    }, {
        name: 'Video Games'
    }, {
        name: 'Books'
    }, {
        name: 'Movies'
    }, {
        name: 'Furniture'
    }, {
        name: 'Musical Instruments'
    }])
    await db.producer_type.bulkCreate([{
        name: 'other'
    }, {
        name: 'corporation',
    }, {
        name: 'author'
    }, {
        name: 'director'
    }, {
        name: 'independent'
    }])
    await db.producer.bulkCreate([{
        name: 'Apple',
        type: 'corporation'
    }, {
        name: 'Nintendo',
        type: 'corporation'
    }, {
        name: 'Microsoft',
        type: 'corporation'
    }, {
        name: 'J.R.R. Tolkien',
        type: 'author'
    }, {
        name: 'Peter Jackson',
        type: 'director'
    }, {
        name: 'IKEA',
        type: 'corporation'
    }, {
        name: 'Andy Wachowski',
        type: 'director'
    }, {
        name: 'Larry Wachowski',
        type: 'director'
    }, {
        name: 'Activision',
        type: 'corporation'
    }])
    await db.product.bulkCreate([{
        name: 'iPhone X, Fully Unlocked, 64 GB',
        price: 1070,
        department_id: 1,
        img_url: 'https://images-na.ssl-images-amazon.com/images/I/51qibZNVexL._SL1050_.jpg'
    }, {
        name: 'iPhone 6, GSM Unlocked, 64 GB',
        price: 199.99,
        department_id: 1,
        img_url: 'https://images-na.ssl-images-amazon.com/images/I/51bvItLxhqL.jpg'
    }, {
        name: 'Xbox One X Console',
        price: 470,
        department_id: 2,
        img_url: 'https://images-na.ssl-images-amazon.com/images/I/61ux1cU49XL._AC_.jpg'
    }, {
        name: 'Call of Duty: Black Ops 4',
        price: 60,
        department_id: 2,
        img_url: 'https://images-na.ssl-images-amazon.com/images/I/812vQ9aeXML._AC_SL1500_.jpg'
    }, {
        name: '4 Film Favorites: The Matrix Collection',
        price: 12.99,
        department_id: 4,
        img_url: 'https://images-na.ssl-images-amazon.com/images/I/61jv6LrpiqL.jpg'
    }, {
        name: 'The Lord of the Rings',
        price: 55,
        department_id: 3
    }, {
        name: 'The Lord of the Rings',
        price: 10,
        department_id: 4
    }, {
        name: 'Nord Stage 3',
        price: 4500,
        department_id: 6
    }])
    await db.sku.create({
        product_id: 1,
        name: 'iPhone X, Fully Unlocked, 64 GB, Space Gray',
        stock: 100
    })
}