let express = require('express')
let app = express()
let r = require('rethinkdb')
let dbConfig = require('./database');


let datas = require('./datas.json');
let fs = require('fs');
let cors = require('cors');
let bodyParser = require('body-parser');
let logger = require('morgan');
// let helmet = require('helmet');
// require('dotenv').load();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
morgan('tiny')


// app.use(helmet());


/**
 * Socket IO + Express
 */
let server = require('http').Server(app);
let io = require('socket.io')(server);

server.listen(8099);


let clients = io.sockets.clients()


// Socket IO
io.on('connection', (socket) => {

    let connectedUsers = Object.keys(io.sockets.connected).map(function (socketId) {
        return io.sockets.connected[socketId];
    });
    // emit nb connected
    io.emit('nb', { nb: connectedUsers.length });

    socket.on('disconnect', (socket) => {

        io.emit('nb', { nb: connectedUsers.length });

    });

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
            r.table('series').insert(data).run(connection, (err, res) => {
                socket.broadcast.emit('nouveau', data);
            });
        });


        socket.on('remove', function (data) {
            r.table('series').filter(data).delete().run(connection, (err, res) => {
                socket.broadcast.emit('remove', data);
            });
        });

    });






});


app.use(function (error, request, response, next) {
    response.status(error.status || 500);
    response.json({ error: error.message });
});


let connection = r.connect(dbConfig).then((connection) => {


    app.get('/', function (req, res) {

        // RethinkDB Connection
        r.table('series').run(connection, function (err, cursor) {
            if (err) throw err;
            cursor.toArray(function (err, result) {
                if (err) throw err;
                res.json(result)
            });
        });

    });


    app.get('/titles', function (req, res) {

        let tab = [];
        // RethinkDB Connection
        r.table("series").pluck("title").run(connection, function (err, cursor) {

            cursor.each(function (err, row) {
                tab.push(row.title)
            }, function () {
                res.json(tab)
            });

        });

    });


    app.get('/search/:id', function (req, res) {

        let id = req.params.id;
        // RethinkDB Connection
        r.table("series").get(id).run(connection, (result) => {
            console.log(result)
            res.json(result)
        });

        // r.table("series").filter({
        //     id: id
        // }).run(connection, function (err, cursor) {
        //     cursor.toArray().then(function (results) {
        //         res.json(results)
        //     }).error(console.log);
        // });

    });


});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})