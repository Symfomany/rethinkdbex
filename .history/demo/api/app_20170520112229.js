let express = require('express')
let app = express()
let r = require('rethinkdb')
let dbConfig = require('./database');

let cors = require('cors');
let bodyParser = require('body-parser');
let logger = require('morgan');
let helmet = require('helmet');
require('dotenv').load();

let sockio = require("socket.io");

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

let io = sockio.listen(app.listen(8099), { log: false });



app.use(function (error, request, response, next) {
    response.status(error.status || 500);
    response.json({ error: error.message });
});



/**
 * Connection with NodeJS
 */

let connection = r.connect(dbConfig)
    .then(function (connection) {

        module.exports.find = function (tableName, id) {
            return r.table(tableName).get(id).run(connection)
                .then(function (result) {
                    return result;
                });
        };

    });


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
    /**
     * List
     */
    let connection = r.connect(dbConfig).then(function (connection) {

        r.table('series').run(connection, function (err, cursor) {
            if (err) throw err;
            cursor.toArray(function (err, result) {
                if (err) throw err;
                res.json(result)
            });
        });

    });

})


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})