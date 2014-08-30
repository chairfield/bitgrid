var express = require('express');
var router = express.Router();
var browserify = require('browserify');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index');
});

/* Host the bundle.js file that the home page references. */
router.get('/javascripts/bundle.js', function(req, res) {
    var b = browserify();
    b.add('./client/src/client.js');
    b.bundle().pipe(res);
});

module.exports = router;
