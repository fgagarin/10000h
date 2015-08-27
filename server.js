var express = require('express')
  , datastore = require('nedb')
  , bodyParser = require('body-parser')

var app = express()
  , ds = new datastore({filename: 'database', autoload: true})
  , timers = require('./timers')(ds)

app.use(bodyParser.json())
app.get('/timers', timers.findAll)
app.get('/timers/count', timers.count)
app.get('/timers/:id', timers.findById)
app.post('/timers', timers.create)
app.put('/timers/:id', timers.update)
app.delete('/timers/:id', timers.delete)

app.listen(3000)
console.log('Listening on port 3000...')
