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
        			instructions : req.body.instructions,
                    done: false },
     function(err, cook) {
        if (err)
            res.send(err);
        CookBook.find(function(err, recipes) {
            if (err)
                res.send(err)
            res.json(recipes);
        });
    });
});

router.route('/:recipe_id')

    .delete(function(req, res) {
        CookBook.remove({
            _id : req.params.recipe_id
        }, function(err, cook) {
            if (err) 
                res.send(err);
            CookBook.find(function(err, recipes) {
                if (err) 
                    res.send(err)
                res.json(recipes);
            });
        });
    })
    .get(function(req, res) {
        CookBook.findById(req.params.recipe_id, function(err, recipes) {
            if(err) 
                res.send(err);
            res.json(recipes);
            console.log('got param');
        });
    })

    .put(function(req, res) {
        CookBook.findById(req.params.recipe_id, function(err, recipe) {
            if (err)
                res.send(err);
            console.log(req.body);
            recipe.name = req.body.name || recipe.name;
            recipe.author = req.body.author || recipe.author;
            recipe.ingredients = req.body.ingredients || recipe.ingredients;
            recipe.instructions = req.body.instructions || recipe.instructions;  
            
            recipe.save(function(err) {
                if (err)
                    res.send(err);
                res.json(recipe);
                console.log('success');
            }); 
        }); 
    });


module.exports = router;