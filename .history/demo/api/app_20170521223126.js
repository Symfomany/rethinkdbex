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


const fileUpload = require('express-fileupload');


// let helmet = require('helmet');
// require('dotenv').load();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false })); //configure body-parser 
app.use(bodyParser.json());
app.use(cors());

/**
 * A node.js module for parsing form data, especially file uploads.
 */
app.use(fileUpload());


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
    let sampleFile;
    if (req.files) {

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
        sampleFile = req.files.sampleFile;

        sampleFile.mv(`./uploads/${sampleFile.name}`, function (err) {
            if (err)
                return res.status(500).send(err);
        });
    }

    let post = req.body;
    post.dateCreated = new Date();
    if (sampleFile) {
        post.file = sampleFile.name;
    }
    post.id = datas.length + 1;
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