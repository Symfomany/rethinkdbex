let express = require('express')
let app = express()
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
logger('tiny')

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