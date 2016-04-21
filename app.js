const express = require('express'), app = express(), port = process.env.PORT || 8000,
mongoose = require('mongoose'), morgan = require('morgan'),
bodyParser = require('body-parser'), methodOverride = require('method-override'),
router = express.Router(), parseUrlEncoded = bodyParser.urlencoded({'extended':'true'}),
recipe = require('./routes/recipe.js'),  todos = require('./routes/todos.js');


mongoose.connect('mongodb://localhost:27017/cooktask'); 


	app.use(express.static(__dirname + '/public/'));
	app.use(bodyParser.urlencoded({'extended':'true'}));
	app.use(bodyParser.json());
	app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
	app.use(methodOverride('X-HTTP-Method-Override'));
	app.use(morgan('dev'));
	app.use('/api/recipe', recipe);
	app.use('/api/todos', todos);

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/views/404.html'); 
});	

app.listen(port);
console.log('CookTask is listening on port # ' + port + '.');