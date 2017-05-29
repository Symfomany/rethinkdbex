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

// let helmet = require('helmet');
// require('dotenv').load();
app.use(logger('dev'));
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
    res.json(datas)
});


app.post('/send', function (req, res) {
    let post = req.body;
    post.dateCreated = new Date();
    datas.push(post)
    let chaine = JSON.stringify(datas);
    fs.writeFile('./datas.json', chaine, 'utf8', (err) => {
        if (err) {
            return res.json(err)
        }
        res.json("ok")
    });

});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});