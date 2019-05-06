var mongoose = require('mongoose');

var batchSchema = mongoose.Schema({

	nname: {
    type: String,
     },   
     
  id: {
    type: String,
    unique: true
     },
  

   batch: {
    type: String,
  },

  dept: {
    type: String,
  }
    
});



module.exports = mongoose.model('index', batchSchema);
