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
        name: 'Apple', // 1
        type: 'corporation'
    }, {
        name: 'Nintendo', // 2
        type: 'corporation'
    }, {
        name: 'Microsoft', // 3
        type: 'corporation'
    }, {
        name: 'J.R.R. Tolkien', // 4
        type: 'author'
    }, {
        name: 'Peter Jackson', // 5
        type: 'director'
    }, {
        name: 'IKEA', // 6
        type: 'corporation'
    }, {
        name: 'Andy Wachowski', // 7
        type: 'director'
    }, {
        name: 'Larry Wachowski', // 8
        type: 'director'
    }, {
        name: 'Activision', // 9
        type: 'corporation'
    }, {
        name: 'Nord', // 10
        type: 'Corporation'
    }, {
        name: 'Roland', // 11
        type: 'Corporation'
    }])).then(() => bulkCreateProducts([{
        product: {
            name: 'iPhone X, Fully Unlocked',
            price: 1050,
            department: 'Cellphones',
            producer_ids: [1],
            img_url: 'https://images-na.ssl-images-amazon.com/images/I/51qibZNVexL._SL1050_.jpg'
        }, skus: [{
            name: 'iPhone X, Fully Unlocked, 64 GB, Space Gray',
            price: 1050,
            stock: 100,
            img_url: 'https://images-na.ssl-images-amazon.com/images/I/81ReA1gb8sL._SL1500_.jpg',
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
            img_url: 'https://images-na.ssl-images-amazon.com/images/I/81ReA1gb8sL._SL1500_.jpg',
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
        skus: [{
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
    }, {
        product: {
            name: 'Nord Stage Piano',
            price: 2999,
            department: 'Musical Instruments',
            img_url: 'https://images-na.ssl-images-amazon.com/images/I/51b-ocpHC8L._SL1200_.jpg',
            producers: [10]
        },
        skus: [{
            name: 'Nord Piano 4 88-Key Stage Piano with 512MB of Sample Memory',
            stock: 0,
            attributes: {
                model: 'Piano 4',
            }
        }, {
            name: 'Nord Piano 3 88-Key Stage Piano with 1GB of Sample Memory',
            stock: 25,
            img_url: 'https://images-na.ssl-images-amazon.com/images/I/6131IWeOogL._SL1500_.jpg',
            attributes: {
                model: 'Piano 3'
            }
        }, {
            name: 'Nord Stage 3 88 88-Key Digital Stage Piano with Fully Weighted Hammer Action Keybed',
            price: 4499,
            stock: 12,
            img_url: 'https://images-na.ssl-images-amazon.com/images/I/611zFJPgriL._SL1200_.jpg',
            attributes: {
                model: 'Stage 3'
            }
        }]
    }, {
        product: {
            name: 'Roland JUNO-DS Synthesizer',
            price: 999.99,
            department: 'Musical Instruments',
            img_url: 'https://images-na.ssl-images-amazon.com/images/I/61YjVlrW7hL._SL1500_.jpg',
            producers: [9]
        },
        skus: [{
            name: 'Roland JUNO-DS88 Synthesizer (88-note Weighted-action Keyboard)',
            stock: 10,
            attributes: {
                model: 'DS88',
            }
        }, {
            name: 'Roland JUNO-DS76 Synthesizer (76-note Weighted-action Keyboard)',
            stock: 10,
            price: 899.99,
            img_url: 'https://images-na.ssl-images-amazon.com/images/I/61f9YlUb00L._SL1500_.jpg',
            attributes: {
                model: 'DS76',
            }
        }, {
            name: 'Roalnd JUNO-DS61 Synthesizer (61-note Weighted-action Keyboard)',
            stock: 10,
            price: 669.98,
            img_url: 'https://images-na.ssl-images-amazon.com/images/I/71YJfUnj3DL._SL1500_.jpg',
            attributes: {
                model: 'DS61'
            }
        }]
    }, {
        product: {
            name: '4 Film Favorites: The Matrix Collection',
            price: 12.99,
            department: 'Movies',
            img_url: 'https://images-na.ssl-images-amazon.com/images/I/61jv6LrpiqL.jpg'
        },
        skus: [{
            stock: 100
        }]
    }, {
        product: {
            name: 'The Lord of The Rings',
            price: 51.99,
            department: 'Movies',
            producers: [5]
        },
        skus: [{
            stock: 20,
            name: 'The Lord of the Rings: The Motion Picture Trilogy (Blu-ray)',
            img_url: 'https://images-na.ssl-images-amazon.com/images/I/51803W0MkvL.jpg',
            attributes: {
                edition: 'Extended Edition',
                _dvdOrBluray: 'Blu-ray'
            }
        }, {
            stock: 50,
            name: 'Lord of the Rings: Original Theatrical Trilogy',
            img_url: 'https://images-na.ssl-images-amazon.com/images/I/919wyzlfPPL._SL1500_.jpg',
            price: 14.99,
            attributes: {
                edition: 'Triple Feature',
                _dvdOrBluray: 'Blu-ray'
            }
        }, {
            stock: 50,
            name: 'The Lord of the Rings Collection',
            price: 9.99,
            img_url: 'https://images-na.ssl-images-amazon.com/images/I/51-vlplSVCL.jpg',
            attributes: {
                edition: 'Triple Feature',
                _dvdOrBluray: 'DVD'
            }
        }]
    }]))
}