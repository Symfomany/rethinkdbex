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


io.sockets.on("load", () => {
    console.log('ij.....')
});


let connection = r.connect(dbConfig).then(function (connection) {

    r.table('series').run(connection, function (err, cursor) {
        if (err) throw err;
        cursor.toArray(function (err, result) {
            if (err) throw err;
            io.sockets.emit("resultat", result);
        });
    });

});


// app.get('/', function (req, res) {


// });


// app.listen(3000, function () {
//     console.log('Example app listening on port 3000!')
// })