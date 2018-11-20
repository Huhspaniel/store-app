const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8080;
const db = require('./models');
const env = process.env.NODE_ENV || 'development';
const force = env === 'development';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/api-routes')(app);
require('./routes/html-routes')(app);

db.sequelize.sync({ force: force }).then(function () {
    app.listen(PORT, async function () {
        if (force) await require('./seeds.js')();
        console.log(`App listening on http://localhost:${PORT}`);
    });
});