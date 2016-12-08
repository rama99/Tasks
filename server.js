var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var ejs = require('ejs');

var index = require('./routes/index');
var tasks = require('./routes/tasks');

var app = express();

// View Engine
app.set('views' ,path.join(__dirname , 'views'));
app.set('view engine', 'ejs');
app.engine('html' , require('ejs').renderFile);

// Set Static folder
app.use(express.static(path.join(__dirname , 'client')));

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/' , index);
app.use('/api' , tasks);

app.listen(process.env.PORT || 5000, function() {
console.log('server started on port 3000');
});
