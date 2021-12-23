const mongoose = require('mongoose');
const Schema = mongoose.Schema
const addressSchema = new Schema ({
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    street : {type : String},
    city: {type : String},
    state : {type : String},
    zipcode : {type : Number},    
})

module.exports = mongoose.model('AdressUser',addressSchema)