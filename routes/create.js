var express = require('express');
var router = express.Router();

/* GET create page. */
router.get('/', function(req, res) {
    res.render('create');
});

module.exports = router;
