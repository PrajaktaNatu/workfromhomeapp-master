var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Item = new Schema({
  name: {
    type: String
  },
  reason: {
    type: String
  },
  example_date :  {
    type: Date
  },
  ApproverComments : {
      type: String
    },
    reqStatus:{
      type: String,
      default: 'Pending'
    }
  
},
{
	collection: 'items'
});

module.exports = mongoose.model('Item', Item);
