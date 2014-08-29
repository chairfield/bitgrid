var express = require('express');
var router = express.Router();

router.route('/poles')
    .all(function(req, res, next) {
        // This is fantastic; monk seems to cache the connection as every time this runs after the first
        // is an order of magnitude less than the first time (~200 ms to ~20 ms).
        req.poles = require('monk')('mongodb://@localhost:27017/test').get('poles');
        next();
    })
    .get(function(req, res, next) {
        // Find all documents in the poles collection.
        req.poles.find({},{}, function(e, docs) {
            res.json(docs);
        });
    })
    .post(function(req, res, next) {

        // This is more to be helpful to users of a REST client like Postman who forget to set Content-Type.
        if (req.headers["content-type"].toLowerCase() != "application/json") {
            res.send("Invalid Content-Type: must be application/json");
        }

        if (req.body.name == null ||
            req.body.lat == null ||
            req.body.lon == null) {
            res.send("Invalid post: object must contain name, lat, and lon properties.");
        }

        console.log("inserting feature", req.body.name, req.body.lat, req.body.lon);
        var pole = { name : req.body.name, lat: req.body.lat, lon: req.body.lon };
        req.poles.insert(pole, function (err, doc) {
            if (err) next(new Error(err));
            console.log('feature committed successfully.');
            res.json(doc);
        });
    });

module.exports = router;
