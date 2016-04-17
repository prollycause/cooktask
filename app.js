const express = require('express'), app = express(),
mongoose = require('mongoose'), morgan = require('morgan'),
bodyParser = require('body-parser'), methodOverride = require('method-override'),
router = express.Router(), parseUrlEncoded = bodyParser.urlencoded({'extended':'true'});


mongoose.connect('mongodb://localhost:27017/cooktask'); 

var recipe = require('./routes/recipe.js');
var todos = require('./routes/todos.js');
var port = process.env.PORT || 8000;

	app.use(express.static(__dirname + '/public'));
	app.use(bodyParser.urlencoded({'extended':'true'})); // encode urls
	app.use(bodyParser.json());  // use json
	app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse vnd.api as json
	app.use(methodOverride());
	app.use(morgan('dev'));
	app.use('/api/recipe', recipe);
	app.use('/api/todos', todos);

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/404.html'); 
});	

app.listen(port);
console.log('Listening on: ' + port);