var express = require('express'),mongoose = require('mongoose'), router = express.Router();




    var Todo = mongoose.model('Todo', {
        text : String
    });
    
router.route('/')

	.get(function(req, res) {
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    })
    .post(function(req, res) {
        Todo.create({
            text : req.body.text,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });

    router.route('/:todo_id')
    
    .delete(function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });


    module.exports = router;

