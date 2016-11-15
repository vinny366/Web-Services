var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/save', function(req, res, next){
    console.log("something");
    res.render('save', {name: "something"});
});


module.exports = router;