let express = require('express')
let app = express()
let r = require('rethinkdb')
let cors = require('cors');
let bodyParser = require('body-parser');
let logger = require('morgan');
var helmet = require('helmet');
require('dotenv').load();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

/**
 * Connection with NodeJS
 */


// r.table('series').insert(
//     [
//         { title: 'Laaaa...' },
//         { title: 'Cool...' },
//         { title: 'Nice!' }
//     ]

// ).run(conn, function (err, res) {
//     if (err) throw err;
//     console.log(res);
// });

/**
 * Create
r.db('test').tableCreate('series').run(conn, function (err, res) {
    if (err) throw err;
    console.log(res);
    r.table('series').insert(
        [
            { title: 'Blabla...' },
            { title: 'Cool...' },
            { title: 'Nice!' }
        ]

    ).run(conn, function (err, res) {
        if (err) throw err;
        console.log(res);
    });
});
 */





app.get('/', function (req, res) {
    r.connect({ host: 'localhost', port: 28015 }, function (err, conn) {
        if (err) throw err;

        /**
         * List
         */
        r.table('series').run(conn, function (err, cursor) {
            if (err) throw err;
            cursor.toArray(function (err, result) {
                if (err) throw err;
                res.json(result)
            });
        });

    })
})


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})