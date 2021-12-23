const mongoose = require('mongoose')
const Schema = mongoose.Schema

const checkoutSchema = new Schema ({
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    total : {type : Number},
    history : {type : String, default : (new Date()).toISOString()},
})
module.exports = mongoose.model('Checkout',checkoutSchema)