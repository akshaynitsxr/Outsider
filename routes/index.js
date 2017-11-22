const express = require('express')
const router = express.Router()
const Promise = require('promise')
const formidable = require('formidable')
const fs = require('fs')

router.get('/', function(req, res, next) {
    res.render('index')
})

router.post('/', function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var oldpath = files.imagePath.path;
        var newpath = './public/uploads/' + files.imagePath.name
        var imgPath = '/uploads/' + files.imagePath.name
        fs.readFile(oldpath, function(err, data) {
            if (err) throw err;
            console.log('File read!');

            // Write the file
            fs.writeFile(newpath, data, function(err) {
                if (err) throw err;
                res.render('image', { imgPath: imgPath })
                console.log('File written!');
            });

            // Delete the file
            fs.unlink(oldpath, function(err) {
                if (err) throw err;
                console.log('File deleted!');
            });
        });
    })
})

module.exports = router