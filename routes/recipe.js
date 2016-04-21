var express = require('express'), router = express.Router(), CookBook = require(__dirname + '/../model/recipeModel.js');

function findAll(res) {
    CookBook.find(function(err, recipes) {
                if (err) 
                    res.send(err);
                res.json(recipes);
            });
}

router.route('/')

.get(function(req, res) {
    findAll(res);
})

.post(function(req, res) {
    CookBook.create({ name : req.body.name, author : req.body.author,ingredients : req.body.ingredients,
        			  instructions : req.body.instructions, done: false },
     function(err, cook) {
        if (err)
            res.send(err);
        findAll(res);
    });
});

router.route('/:recipe_id')

    .delete(function(req, res) {
        CookBook.remove({
            _id : req.params.recipe_id
        }, function(err, cook) {
            if (err) 
                res.send(err);
            findAll(res);
        });
    })
    .get(function(req, res) {
        CookBook.findById(req.params.recipe_id, function(err, recipes) {
            if(err) 
                res.send(err);
            res.json(recipes);
        });
    })

    .put(function(req, res) {
        CookBook.findById(req.params.recipe_id, function(err, recipe) {
            if (err)
                res.send(err);
            recipe.name = req.body.name;
            recipe.author = req.body.author;
            recipe.ingredients = req.body.ingredients;
            recipe.instructions = req.body.instructions;
            
            recipe.save(function(err) {
                if (err)
                    res.send(err);
                res.json(recipe);
            }); 
        }); 
    });


module.exports = router;