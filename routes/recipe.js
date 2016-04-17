var express = require('express'),mongoose = require('mongoose'), router = express.Router();
var Schema = mongoose.Schema;
var CookBook = require(__dirname + '/../model/recipeModel.js');



router.route('/')

.get(function(req, res) {
    CookBook.find(function(err, recipes) {
    	if(err) 
    		res.send(err)
    	res.json(recipes);
    });
})

.post(function(req, res) {
    CookBook.create({ name : req.body.name,
    				author : req.body.author,
        			ingredients : req.body.ingredients,
        			instructions : req.body.instructions },
     function(err, cook) {
        if (err)
            res.send(err);
        CookBook.find(function(err, recipes) {
            if (err)
                res.send(err)
            res.json(recipes);
        });
    });
})

.delete(function(req, res) {
    CookBook.find('{*}').remove().exec(); 
});

module.exports = router;