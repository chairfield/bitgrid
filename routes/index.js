var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/featurelist', function(req, res) {
    var db = req.db;
    var collection = db.get('featurecollection');
    collection.find({},{}, function(e, docs) {
        res.json(docs);
    });
});

router.route('/features')
    .post(function(req, res) {

        if (req.headers["content-type"].toLowerCase() != "application/json") {
            res.send("Invalid Content-Type: must be application/json");
        }

        if (req.body.name == null ||
            req.body.lat == null ||
            req.body.lon == null) {
            res.send("Invalid post: object must contain name, lat, and lon properties.");
        }

        var db = req.db;
        var features = db.get('featurecollection');
        
        console.log("inserting feature", req.body.name, req.body.lat, req.body.lon);
        features.insert({ name : req.body.name, lat: req.body.lat, lon: req.body.lon }, function (err, doc) {
            if (err) {
                console.log(err);
            }

            var message = "Successfully created feature: " + JSON.stringify(doc);
            console.log(message);
            res.send(message);
        });
    });


module.exports = router;
