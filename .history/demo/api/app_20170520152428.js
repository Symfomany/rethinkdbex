let express = require('express')
let app = express()
let r = require('rethinkdb')
let dbConfig = require('./database');

let cors = require('cors');
let bodyParser = require('body-parser');
let logger = require('morgan');
let helmet = require('helmet');
require('dotenv').load();


app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());


/**
 * Socket IO + Express
 */
let server = require('http').Server(app);
let io = require('socket.io')(server);

server.listen(8099);

// Socket IO
io.on('connection', (socket) => {

    // RethinkDB Connection
    let connection = r.connect(dbConfig).then((connection) => {

        r.table('series').run(connection, function (err, cursor) {
            if (err) throw err;
            cursor.toArray(function (err, result) {
                if (err) throw err;
                socket.emit('resultat', result)
            });
        });

        socket.on('nouveau', function (data) {
            r.table('series').insert(data).run(connection, () => {
                socket.broadcast.emit('nouveau', data);
            });
        });


        socket.on('remove', function (data) {
            r.table('series').filter(data).delete().run(connection, () => {
                socket.broadcast.emit('remove', data);
            });
        });

    });






});




app.use(function (error, request, response, next) {
    response.status(error.status || 500);
    response.json({ error: error.message });
});



// app.get('/', function (req, res) {


// });


// app.listen(3000, function () {
//     console.log('Example app listening on port 3000!')
// })