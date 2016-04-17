var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var cookBookSchema = new Schema({
	name: String,
	author: String,
	ingredients: String,
	instructions: String,
	comments: [{ body: String, date: Date }],
	date: { type: Date, default: Date.now },
	hidden: Boolean,
	likes: Number
});

mongoose.model('CookBook', cookBookSchema);
module.exports = mongoose.model('CookBook');