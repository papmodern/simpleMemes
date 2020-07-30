require('dotenv').config()
const request = require('request');
const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/gallery/*', function (req, res) {
    let url = 'https://api.imgur.com/3' + req.url.replace('api/', '');

    let externalReq = request({
        qs: req.query, uri: url,
        headers: {
            'Authorization': 'Client-ID ' + process.env.CLIENT_ID
        }
    });
    req.pipe(externalReq).pipe(res);
});

app.listen(process.env.PORT || 8080);