const Order = require('../models/order')
const Product = require('../models/product')
const dataUser = require('../routers/user.routes')

class orderController {
    static async newOrder(req, res, next) {
        const { product } = req.body
        const dataOrder = await Order.findOne({ user : req._userId,product : product })
        const productData = await Product.findById(product)

        try {
            if(productData.quantity >= 1){
                if(dataOrder == null ){
                    const order = await new Order({
                        user: req._userId,
                        product,
                        totalprice : productData.price
                    })
                    await Product.findByIdAndUpdate(product,{$set : {quantity : productData.quantity - 1}})
                    order.save()
                    res.status(200).json({ success: true, data: order })
                }
                else{
                    const quantity = dataOrder.quantity
                    const total = (quantity + 1) * productData.price    
                    const addorder =await Order.findOneAndUpdate({product : product},{$set : {quantity : quantity + 1, totalprice : total} }, {new : true})
                    await Product.findByIdAndUpdate(product,{$set : {quantity : productData.quantity - 1}})
                    res.status(200).json({ success: true, data :addorder})
                } 
            }else next({name : 'QUANTITYLESS'})
        }
        catch (e) { next({ name: 'PRODUCTNOTFOUND' }) }
    }
    static async listOrder(req, res, next) {
        try {
            const dataOrder = await Order.find({ user: req._userId })
                .populate('user')
                .populate('product')
                let total = 0
                for(let i = 0; i < dataOrder.length; i++ ){
                  total += (dataOrder[i].quantity * (dataOrder[i].product.price))
                }
            res.status(200).json({ success: true, data: dataOrder })
        }
        catch (e) { next({ name: 'PRODUCTNOTFOUND' }) }
    }
    static async getOrder(req, res, next) {
        const { orderID } = req.params
        try {
            const order = await Order.findById(orderID)
                .populate('user')
                .populate('product')
            res.status(200).json({ success: true, data: order })
        }
        catch (e) { next({ name: 'PRODUCTNOTFOUND' }) }
    }
    static async deleteOrder(req, res, next) {
        const { orderID } = req.params
        const order = await Order.findById(orderID)
        const product = await Product.findById(order.product)
        try {
            if (order.user != req._userId) next({ name: 'INVALID_TOKEN' })
            else {
                await Order.findByIdAndDelete(orderID)
                await Product.findByIdAndUpdate(order.product, {$set : {quantity : product.quantity + order.quantity } })
                res.status(200).json({ success: true, message: 'delete success' })
            }
        }
        catch (e) { next({ name: 'PRODUCTNOTFOUND' }) }
    }
    static async addOneQuantity(req,res,next){
        const {productID} = req.params
        try {
            const product = await Product.findById(productID)
            const order = await Order.findOne({product : productID , user : req._userId})
            const productQuantity = product.quantity
            const quantity = order.quantity
            const newOrder =await Order.findOneAndUpdate({product : productID}, {$set : {quantity : quantity + 1}} , {new : true})
            await Product.findByIdAndUpdate(productID, {$set : {quantity :  productQuantity - 1 }} , {new : true})
            res.status(200).json({success : true ,message : 'Success add quantity product', data : newOrder})
        }
        catch { next({ name: 'PRODUCTNOTFOUND' }) }
    }
    static async deleteOneQuantity(req,res,next){
        const {productID} = req.params
            const product = await Product.findById(productID)
            const order = await Order.findOne({product : productID, user : req._userId})
            const productQuantity = product.quantity
            const quantity = order.quantity
        try {
            if(quantity > 1){
            const newOrder = await Order.findOneAndUpdate({product : productID}, {$set : {quantity : quantity - 1}} , {new : true})
            await Product.findByIdAndUpdate(productID, {$set : {quantity :  productQuantity + 1 }} , {new : true})
            res.status(200).json({success : true ,message : 'Success delete quantity product', data : newOrder})
            }
            else{
                await Order.findOneAndDelete({product : productID})
                await Product.findByIdAndUpdate(productID, {$set : {quantity :  productQuantity + 1 }} , {new : true})
                res.status(200).json({success : true ,message : 'Success delete quantity product'})
            }
        }
        catch { next({ name: 'PRODUCTNOTFOUND' }) }
    }
}
module.exports = orderController