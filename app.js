const express = require('express')
const router = express.Router()
const app = module.exports = express()
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const path = require('path')
const http = require('http').Server(app);
const port = process.env.PORT || 8001

app.locals.appTitle = "Assignment"

// middleware
app.use(express.static(path.join(__dirname, '/public')))

app.use('development', function() {
    app.use(express.errorHandler())
})

// view engine setup
app.set('views', path.join(__dirname, '/views'))
app.set('savedimage', path.join(__dirname, '/uploads'))
app.set('view engine', 'jade')

app.use(favicon((path.join(__dirname, '/public/favicon (1).ico'))))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

//Setting up Routes
const index = require('./routes/index')
const image = require('./routes/image')
app.use('/', index)
app.use('/image', image)

app.use(function(req, res, next) {
    var err = new Error('NOT FOUND')
    err.status = 404
    next(err);
})

app.listen(port, function() {
    console.log('server is started at ', port)
})

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500)
        res.render('error', {
            message: err.message,
            error: err
        })
    })
}

module.exports = app