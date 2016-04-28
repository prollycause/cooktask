var express = require('express'), router = express.Router(), api = require('dictionaryapi');



router.route('/')

	router.route('/:word')

	.get(function(req, res) {
		console.log(req.params.word);
		console.log(req.params);
    	var dict = new api.DictionaryAPI(api.LEARNERS, '61153be9-21cc-47d2-868e-13111b74a4fe');
    	
    	dict.query(req.params.word, function(err, result) {
        	res.end(result);
    	});
	})

	.post(function(req, res)  {
    	console.log(req.params.word);
    	var dict = new api.DictionaryAPI(api.LEARNERS, '61153be9-21cc-47d2-868e-13111b74a4fe');
    	
    	dict.query(req.params.word, function(err, result) {
        	res.end(result);
    	});

	});	


module.exports = router;