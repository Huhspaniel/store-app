// server.js
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8080;
const db = require('./db');
const env = process.env.NODE_ENV || 'development';
const force = env === 'development';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/api-routes')(app);
require('./routes/html-routes')(app);
app.post('/order', (req, res) => {
    db.sku.findById(req.body.sku_id)
        .then(data => {
            if (req.body.quantity > data.stock)
                res.json({ error: 'Invalid quantity' })
            else
                return db.sku.decrement('stock', {
                    by: req.body.quantity,
                    where: {
                        id: req.body.sku_id
                    }
                })
        })
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

db.sequelize.sync({ force: force }).then(function () {
    app.listen(PORT, function () {
        var seeds = new Promise(res => res());
        if (force) seeds = console.log('\n~~Seeding database:~~\n') || require('./seeds.js')();
        seeds.then(() => console.log(`\n~~~ App listening on http://localhost:${PORT} ~~~\n`));
    });
});