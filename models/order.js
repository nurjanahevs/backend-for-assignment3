const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    product : {type: mongoose.Schema.Types.ObjectId, ref: 'Product',required: true},
    quantity : {type: Number, default : 1},
    totalprice : {type : Number}
})

module.exports = mongoose.model('order',orderSchema)