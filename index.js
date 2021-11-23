const express = require('express');
const exphbs = require('express-handlebars');
const avo = require('./avo-shopper')
const app = express();

const pg = require('pg');
const avoShopper = require('./avo-shopper');
const Pool = pg.Pool;


const connectionString = process.env.DATABASE_URL || 'postgresql://nkully:nkully@localhost:5432/avo_shopper';

const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }

});
// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const avocado = avo(pool);
// const route = routes(avocado)
console.log(pool)


app.use(express.static('views/vivos'));
// enable the static folder...
app.use(express.static('public'));

// add more middleware to allow for templating support

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

let counter = 0;

app.get('/', async function(req, res) {
    res.render('index', {
        counter,
        shop: await avocado.listShops(),



    });
});
app.get('/shops', async function(req, res) {
    res.render('shops', {
        shop: await avocado.listShops(),

    })
})
app.post('/Avocado', async function(req, res) {
    res.render('index', {

    })
})
app.get('/deals', async function(req, res) {
    res.render('shops', {
        deals: await avoShopper.createDeal()

    })
})
const PORT = process.env.PORT || 3019;
// start  the server and start listening for HTTP request on the PORT number specified...
app.listen(PORT, function() {
    console.log(`AvoApp started on port ${PORT}`)
});