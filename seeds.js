const db = require('./db');
const { bulkCreateProducts } = db._ƒ;

module.exports = function () {
    return db.department.bulkCreate([{
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
    }]).then(() => db.producer_type.bulkCreate([{
        name: 'other'
    }, {
        name: 'corporation',
    }, {
        name: 'author'
    }, {
        name: 'director'
    }, {
        name: 'independent'
    }])).then(() => db.producer.bulkCreate([{
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
    }])).then(() => bulkCreateProducts([{
        product: {
            name: 'iPhone X, Fully Unlocked',
            price: 1050,
            department: 'Cellphones',
            producer_ids: [1],
            img_url: 'https://images-na.ssl-images-amazon.com/images/I/51qibZNVexL._SL1050_.jpg'
        }, variants: [{
            name: 'iPhone X, Fully Unlocked, 64 GB, Space Gray',
            price: 1050,
            stock: 100,
            attributes: {
                color: 'Space Gray',
                storage: '64 GB'
            }
        }, {
            name: 'iPhone X, Fully Unlocked, 64 GB, Silver',
            price: 1021.99,
            stock: 100,
            attributes: {
                color: 'Silver',
                storage: '64 GB'
            }
        }, {
            name: 'iPhone X, Fully Unlocked, 256 GB, Space Gray',
            price: 1500,
            stock: 100,
            attributes: {
                color: 'Space Gray',
                storage: '256 GB'
            }
        }, {
            name: 'iPhone X, Fully Unlocked, 256 GB, Silver',
            price: 1500,
            stock: 100,
            attributes: {
                color: 'Silver',
                storage: '256 GB'
            }
        }]
    }, {
        product: {
            name: 'Xbox One Console',
            price: 399,
            img_url: 'https://static.gamespot.com/uploads/original/1179/11799911/2555159-newxbox.jpg',
            department: 2,
            producer_ids: [1, 3]
        },
        variants: [{
            name: 'Xbox One X 1TB',
            price: 399,
            stock: 100,
            img_url: 'https://images-na.ssl-images-amazon.com/images/I/51twrJq61UL._AC_.jpg',
            attributes: {
                model: 'X',
                storage: '1 TB'
            }
        }, {
            name: 'Xbox One X 2TB',
            price: 599,
            stock: 100,
            img_url: 'https://images-na.ssl-images-amazon.com/images/I/51twrJq61UL._AC_.jpg',
            attributes: {
                model: 'X',
                storage: '2 TB'
            }
        }, {
            name: 'Xbox One S 1TB',
            price: 299,
            stock: 100,
            img_url: 'https://images-na.ssl-images-amazon.com/images/I/51DvIl32U8L._AC_.jpg',
            attributes: {
                model: 'S',
                storage: '1 TB'
            }
        }, {
            name: 'Xbox One S 500GB',
            price: 199,
            stock: 100,
            img_url: 'https://images-na.ssl-images-amazon.com/images/I/51DvIl32U8L._AC_.jpg',
            attributes: {
                model: 'S',
                storage: '500 GB'
            }
        }, {
            name: 'Xbox One 500 GB',
            price: 120,
            stock: 100,
            attributes: {
                model: 'Original',
                storage: '500 GB'
            }
        }]
    }]))
}