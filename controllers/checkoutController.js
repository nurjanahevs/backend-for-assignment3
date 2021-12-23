const Checkout = require('../models/checkout')
const Order = require('../models/order')

class checkoutController {
    static async userCheckout(req,res,next){
        try{
            const order = await Order.find({user:req._userId})
            .populate('product')
            if(order.length >= 1){
            let total = 0
            for(let i = 0; i < order.length; i++ ){
              total += (order[i].quantity * (order[i].product.price))
            }
            const checkout = new Checkout({
                user : req._userId,
                total : total
            })
            await Order.deleteMany({user : req._userId})
            checkout.save()
            res.status(200).json({success : true ,data : checkout})
            }
            else { next({ name: 'PRODUCTNOTFOUND' }) }
        }
        catch{ next({name : 'NOT_FOUND'})}
    }
    static async listCheckout(req,res,next){
        try{
            const checkout = await Checkout.find({user : req._userId})
            .populate('user')
            res.status(200).json({success : true, data : checkout})
        }
        catch{ next({name : 'NOT_FOUND'}) }
    }
    static async getCheckout(req,res,next){
        const { checkoutID }  =  req.params
        try{
            const checkout = await Checkout.findById(checkoutID)
            res.status(200).json({success : true, data : checkout})
        }
        catch { next({name : 'NOT_FOUND'}) }
    }
    static async deleteCheckout(req,res,next){
        const {checkoutID } =req.params
        try{
            await Checkout.findByIdAndDelete(checkoutID)
            res.status(200).json({success : true, message : 'Delete Checkout Success'})
        }
        catch {next({name : 'NOT_FOUND'})}
    }
}
module.exports = checkoutController