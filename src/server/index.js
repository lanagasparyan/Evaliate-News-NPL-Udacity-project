const dotenv = require('dotenv');

var path = require('path')
const bodyParser = require("body-parser")
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var aylien = require("aylien_textapi");
console.log(process.env.API_ID)
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function(req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('dist/index.html'))
})

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/testing', async(req, res, next) => {
    //console.log(req.body);
    try {
        var data = textapi.sentiment({
            //'text': 'John is a very good football player!'
            'text': req.body.theText
        }, function(error, response) {
            if (error === null) {
                console.log(response);
                res.send(response);
            }
        });
        //res.send(mockAPIResponse)
    } catch (error) {
        // Passes errors into the handler
        return next(error)
    }
    //res.send(returnVal);
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function() {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function(req, res) {
    res.send(mockAPIResponse)
})
module.exports = app;