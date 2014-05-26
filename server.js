var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = 3000;
app.use(bodyParser());
app.listen(port);

var router = express.Router();
router.get('/', function(req, res) {
    res.json({message: 'heey! welcome to beer api! :)'});
});

router.route('/beer')
    .post(function(req, res) {
        var beer = new Beer();
        beer.name = req.body.name;
        
        beer.save(function(err) {
           if (err) res.send(err);
            
            res.json({message: 'Beer created!'});
        });
    })
    .get(function(req, res) {
        Beer.find(function(err, beers) {
            if (err) res.send(err);
            res.json(beers);
        });
    });

router.route('/beer/:beer_id').get(function(req, res) {
    Beer.findById(req.params.beer_id, function(err, beer) {
        if (err) res.send(err);
        res.json(beer);
    });
}).put(function(req, res) {
    Beer.findById(req.params.beer_id, function(err, beer) {
        if (err) res.send(err);
        
        beer.name = req.body.name;
        beer.save(function(err) {
            if (err) res.send(err);
            res.json({message: 'Beer updated'});
        });
    });
}).delete(function(req, res) {
    Beer.remove({_id: req.params.beer_id}, function(err, beer) {
        if (err) res.send(err);
        res.json({message: 'Successfully deleted'});
    });
});

app.use('/api', router);
console.log('Server up and running on port ' + port);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/viniteste');
console.log('Database ok.');

var Beer = require('./app/models/beer');