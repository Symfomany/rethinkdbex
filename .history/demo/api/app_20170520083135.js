let express = require('express')
let app = express()
let r = require('rethinkdb')

r.connect({ host: 'localhost', port: 28015 }, function (err, conn) {
    if (err) throw err;
    r.db('test').tableCreate('tv_shows').run(conn, function (err, res) {
        if (err) throw err;
        console.log(res);
        r.table('tv_shows').insert({ name: 'Star Trek TNG' }).run(conn, function (err, res) {
            if (err) throw err;
            console.log(res);
        });
    });
});


app.get('/', function (req, res) {
    res.send('Hello World!')
})



app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})