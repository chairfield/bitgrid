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

module.exports = router;
