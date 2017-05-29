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
    if (!req.files)
        return res.status(400).json('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
    let sampleFile = req.files.sampleFile;

    sampleFile.mv(`./uploads/${sampleFile.name}`, function (err) {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded!');
    });

    // Use the mv() method to place the file somewhere on your server 
    // sampleFile.mv('/uploads/filename.jpg', function (err) {
    //     if (err)
    //         return res.status(500).send(err);

    //     res.send('File uploaded!');
    // });
    // let post = req.body;
    // post.dateCreated = new Date();
    // datas.push(post)
    // let chaine = JSON.stringify(datas);
    // fs.writeFile('./datas.json', chaine, 'utf8', (err) => {
    //     if (err) {
    //         return res.json(err)
    //     }
    //     res.json("ok")
    // });


});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});