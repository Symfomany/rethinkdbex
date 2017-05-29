let express = require('express')
let app = express()
let datas = require('./datas.json');

let fs = require('fs'); //FileSystem
let cors = require('cors'); // CORS Security

let bodyParser = require('body-parser'); // POST Security

let logger = require('morgan'); // Log GET/POST in console
// let helmet = require('helmet');
// require('dotenv').load();
app.use(logger('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/**
 * Send JSON for 500 errors
 */
app.use(function (error, request, response, next) {
    response.status(error.status || 500);
    response.json({ error: error.message });
});


app.get('/', function (req, res) {
    res.json('ok')
});



app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})