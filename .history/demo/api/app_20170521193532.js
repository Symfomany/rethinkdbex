let express = require('express')
let app = express()
let datas = require('./datas.json');
let path = require('path')

let fs = require('fs'); //FileSystem
let cors = require('cors'); // CORS Security

let bodyParser = require('body-parser');
// POST Security + Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
let colors = require('colors'); // colors in console

let logger = require('morgan'); // Log GET/POST in console

let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })


// let helmet = require('helmet');
// require('dotenv').load();
app.use(logger('dev', { stream: accessLogStream }));
app.use(bodyParser.urlencoded({ extended: false })); //configure body-parser 
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
    console.log("caca".green); // clg + TAB
    res.json('ok')
});



app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})