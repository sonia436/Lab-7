var express = require('express');
var router = express.Router();

var New=require('../models/newmodel'); /*conect with model.js*/


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function(req, res, next) {

var nname = req.body.nname;
var id = req.body.id;
var batch = req.body.batch;
var dept = req.body.dept;

console.log(nname + " " + id + " " +dept + " " + batch);
console.log("Entered to the Next page");


var query={id:id};/*NEw pdate*/

New.findOneAndUpdate(query,{
  $set:{
    nname:nname,
    id:id,
    batch:batch,
    dept:dept
  }
},{
  new:true,
  upsert:true
},function(err, doc){
  if (err) {
    console.log("Error");
  }
});
  
  res.redirect('/table');
});



router.get('/table',function(req,res,next){
	New.find(function(err,results){
    	if (err) return console.error(err);
    	else{
    		res.render('table',{info:results});
    	}
  	});
});



router.post('/table', function(req, res, next) {

var id = req.body.id;
var nname = req.body.nname;
var batch= req.body.batch;
var dept = req.body.dept;


console.log(id + " " + nname  + " " + batch + " " + dept);
console.log("Submitted ");

var query={id:id};/*NEw pdate*/

New.findOneAndUpdate(query,{
  $set:{
    nname:nname,
    id:id,
    batch:batch,
    dept:dept
  }
},{
  new:true,
  upsert:true
},function(err, doc){
  if (err) {
    console.log("Error");
  }
});
  
  res.redirect('/');
});


router.get('/edit/:id',function(req,res,next){
  var id = req.params.id;
  var query={_id:id};

    New.find(query,
      function(err, results) {
        if (err) throw err;
        console.log(results);
        res.render('edit',{info:results});
    });


  });


router.get('/delete/:id',function(req,res,next){
	var id = req.params.id;
  	var query={_id:id};

  	New.remove({
    	_id: id
  		}, function(err) {
    	if (err) throw err;
    	res.redirect('/table');
  });

});





module.exports = router;
